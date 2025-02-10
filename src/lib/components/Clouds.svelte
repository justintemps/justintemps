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
  let flash: THREE.SpotLight;
  let scene: THREE.Scene;
  let cloudsElement: HTMLDivElement;

  onMount(() => {
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
    const ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    // Add lightning
    flash = new THREE.SpotLight(0xffdd67, 30, 500, 1.7);
    flash.position.set(200, 300, 100);
    scene.add(flash);

    // Add the renderer with fog
    renderer = new THREE.WebGLRenderer();
    scene.fog = new THREE.FogExp2(0x193549, 0.002);
    renderer.setClearColor(scene.fog.color);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add the renderer to the dom
    cloudsElement.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();

    loader.load("./images/smoke-1.png", function (texture: any) {
      const cloudGeo = new THREE.PlaneGeometry(500, 500);
      const cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true
      });
      for (let p = 0; p < 35; p++) {
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.castShadow = true;
        cloud.position.set(
          Math.random() * 800 - 400,
          500,
          Math.random() * 500 - 450
        );
        cloud.rotation.x = 1.18;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random() * 360;
        cloud.material.opacity = 0.6;
        cloudParticles.push(cloud);
        scene.add(cloud);
      }

      animate();
    });
  });

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    cloudParticles.forEach((p: any) => {
      p.rotation.z -= 0.001;
    });

    if (Math.random() > 0.95 || flash.power > 100) {
      if (flash.power < 100) {
        flash.position.set(
          Math.random() * 400,
          300 + Math.random() * 200,
          100
        );
      }
      flash.power = 50 + Math.random() * 500;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
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
