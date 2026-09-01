<script lang="ts">
  import * as THREE from "three";
  import { onMount } from "svelte";

  $: innerWidth = 0;
  $: innerHeight = 0;

  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let cloudParticles: THREE.Mesh<
    THREE.PlaneGeometry,
    THREE.MeshLambertMaterial
  >[] = [];
  let flash: THREE.PointLight;
  let scene: THREE.Scene;
  let cloudsElement: HTMLDivElement;
  let frameId = 0;
  // Honors the OS/browser "reduce motion" accessibility setting. When set,
  // we render one still frame of the clouds and skip the lightning entirely.
  let reduceMotion = false;

  // --- Look & feel -------------------------------------------------------
  // three >= r155 uses physically-based lighting (no implicit PI scaling,
  // hex colours decoded from sRGB, point lights fall off with distance), so
  // these numbers are much larger than the r140 originals. Tweak to taste.
  const AMBIENT_INTENSITY = 16;
  const SUN_INTENSITY = 7;
  const FOG_DENSITY = 0.002;
  const SKY_COLOR = 0x193549; // matches --color--bg--main
  const CLOUD_COLOR = 0xd8dde4; // cool grey tint keeps the clouds broody
  const CLOUD_OPACITY = 0.6;
  // Each cloud is a square plane; fade its alpha in from the edges over this
  // fraction of the width so the rectangle outlines never show.
  const CLOUD_EDGE_FADE = 0.3;
  const CLOUD_ROTATION_SPEED = 0.06; // rad/s

  // Lightning. The point light uses 1/distance falloff with no cutoff, so
  // its intensity is roughly irradiance x distance, and the clouds sit
  // 400-800 units away.
  const FLASH_COLOR = 0xffc600; // matches --color--brand (the heading yellow)
  const FLASH_IDLE = 4000; // faint warm glow between strikes
  const FLASH_PEAK_MIN = 20000; // each strike's peak is randomised in this range
  const FLASH_PEAK_MAX = 50000;
  const FLASH_DECAY_SECONDS = 0.15; // how quickly a pulse fades
  const PULSES_PER_STRIKE: [number, number] = [2, 4]; // main flash + re-strikes
  const PULSE_GAP_MS: [number, number] = [60, 200];
  const STRIKE_INTERVAL_MS: [number, number] = [1000, 3000];

  // --- Strike state ------------------------------------------------------
  let peakIntensity = FLASH_PEAK_MAX;
  let level = 0; // 0..1 envelope of the current strike
  let pulses: { at: number; strength: number }[] = [];
  let nextStrikeAt = 0;
  let lastFrame = 0;

  const rand = (min: number, max: number) => min + Math.random() * (max - min);
  const randBetween = ([min, max]: [number, number]) => rand(min, max);

  onMount(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotion = motionQuery.matches;
    const handleMotionChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      if (cloudParticles.length === 0) return; // textures not loaded yet
      if (reduceMotion) {
        renderStill();
      } else if (frameId === 0) {
        start();
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // Create the scene
    scene = new THREE.Scene();

    // Create Camera and position
    camera = new THREE.PerspectiveCamera(
      60,
      innerWidth / innerHeight,
      1,
      1000
    );
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;

    // Add ambient light
    const ambient = new THREE.AmbientLight(0x555555, AMBIENT_INTENSITY);
    scene.add(ambient);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(
      0xffeedd,
      SUN_INTENSITY
    );
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    // Add lightning: a point light sitting among the clouds. distance=0
    // (no cutoff) and decay=1 give a broad 1/d glow rather than the default
    // inverse-square hot spot.
    flash = new THREE.PointLight(FLASH_COLOR, FLASH_IDLE, 0, 1);
    flash.position.set(200, 300, 100);
    scene.add(flash);

    // Add the renderer with fog
    renderer = new THREE.WebGLRenderer();
    scene.fog = new THREE.FogExp2(SKY_COLOR, FOG_DENSITY);
    renderer.setClearColor(scene.fog.color);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add the renderer to the dom
    cloudsElement.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();

    loader.load("./images/smoke-1.png", function (texture: THREE.Texture) {
      // The smoke PNG is a greyscale mask rather than a photo. Sampling it
      // as linear data (as r140 did) keeps the clouds bright; decoding it as
      // sRGB roughly halves their brightness.
      texture.colorSpace = THREE.LinearSRGBColorSpace;
      const cloudGeo = new THREE.PlaneGeometry(500, 500);
      const cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        alphaMap: makeEdgeMask(),
        color: CLOUD_COLOR,
        opacity: CLOUD_OPACITY,
        transparent: true,
        // Overlapping translucent planes must not occlude each other.
        depthWrite: false
      });
      for (let p = 0; p < 35; p++) {
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.set(
          Math.random() * 800 - 400,
          500,
          Math.random() * 500 - 450
        );
        cloud.rotation.x = 1.18;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random() * 360;
        cloudParticles.push(cloud);
        scene.add(cloud);
      }

      if (reduceMotion) {
        renderStill();
      } else {
        start();
      }
    });

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      cancelAnimationFrame(frameId);
      frameId = 0;
      renderer.dispose();
    };
  });

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (reduceMotion) renderStill();
  }

  function start() {
    lastFrame = 0;
    frameId = requestAnimationFrame(animate);
  }

  function renderStill() {
    cancelAnimationFrame(frameId);
    frameId = 0;
    level = 0;
    pulses = [];
    setFlashLevel(0);
    renderer.render(scene, camera);
  }

  // Greyscale mask that is 0 at the plane's edges and eases up to 1 over
  // CLOUD_EDGE_FADE of the width. Multiplied into the cloud texture's alpha.
  function makeEdgeMask() {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const image = ctx.createImageData(size, size);
    const ease = (x: number) => {
      const t = Math.min(Math.max(x / CLOUD_EDGE_FADE, 0), 1);
      return t * t * (3 - 2 * t);
    };
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const u = (x + 0.5) / size;
        const v = (y + 0.5) / size;
        const m = ease(Math.min(u, 1 - u)) * ease(Math.min(v, 1 - v));
        const i = (y * size + x) * 4;
        image.data[i] = image.data[i + 1] = image.data[i + 2] = m * 255;
        image.data[i + 3] = 255;
      }
    }
    ctx.putImageData(image, 0, 0);
    return new THREE.CanvasTexture(canvas);
  }

  // Sets the lightning for a strike level between 0 (idle) and 1 (peak).
  function setFlashLevel(t: number) {
    flash.intensity = FLASH_IDLE + t * (peakIntensity - FLASH_IDLE);
  }

  // A strike is a burst of pulses (the main flash plus a few re-strikes)
  // from a fresh position, each of which fades out exponentially.
  function startStrike(now: number) {
    flash.position.set(Math.random() * 400, 300 + Math.random() * 200, 100);
    peakIntensity = rand(FLASH_PEAK_MIN, FLASH_PEAK_MAX);
    const count = Math.floor(randBetween(PULSES_PER_STRIKE) + 1);
    let at = now;
    pulses = [];
    for (let i = 0; i < count; i++) {
      pulses.push({ at, strength: i === 0 ? 1 : rand(0.5, 1) });
      at += randBetween(PULSE_GAP_MS);
    }
    nextStrikeAt = at + randBetween(STRIKE_INTERVAL_MS);
  }

  function animate(now: number) {
    const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.1) : 0;
    if (!lastFrame) nextStrikeAt = now + rand(500, 1500);
    lastFrame = now;

    cloudParticles.forEach((p) => {
      p.rotation.z -= CLOUD_ROTATION_SPEED * dt;
    });

    if (now >= nextStrikeAt) startStrike(now);
    while (pulses.length && now >= pulses[0].at) {
      level = Math.max(level, pulses.shift()!.strength);
    }
    level *= Math.exp(-dt / FLASH_DECAY_SECONDS);
    if (level < 0.005) level = 0;
    // A little flicker while the strike is live.
    setFlashLevel(level > 0 ? level * rand(0.7, 1) : 0);

    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  }
</script>

<svelte:window onresize={handleResize} bind:innerHeight bind:innerWidth />

<div class="clouds" bind:this={cloudsElement}></div>

<style lang="scss">
  .clouds {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }
</style>
