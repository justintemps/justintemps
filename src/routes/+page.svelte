<script lang="ts">
  import * as THREE from "three";
  import content, { metadata } from "$lib/content/pages/home.md";
  import { onMount } from "svelte";

  $: innerWidth = 0;
  $: innerHeight = 0;

  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let cloudParticles: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshLambertMaterial>[] = [];
  let flash: THREE.SpotLight;
  let scene: THREE.Scene;
  let cloudsElement: HTMLDivElement;

  onMount(() => {
    // Create the scene
    scene = new THREE.Scene();

    // Create Camera and position
    camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
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

    loader.load("./smoke-1.png", function (texture: any) {
      const cloudGeo = new THREE.PlaneGeometry(500, 500);
      const cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true
      });
      for (let p = 0; p < 35; p++) {
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.castShadow = true;
        cloud.position.set(Math.random() * 800 - 400, 500, Math.random() * 500 - 450);
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
        flash.position.set(Math.random() * 400, 300 + Math.random() * 200, 100);
      }
      flash.power = 50 + Math.random() * 500;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  console.log(metadata);
</script>

<svelte:window onresize={handleResize} bind:innerHeight bind:innerWidth />

<article>
  <div class="clouds" bind:this={cloudsElement}></div>
  <h1>{metadata.title}</h1>
  <svelte:component this={content} />
</article>

<style lang="scss">
  .clouds {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }

  h1 {
    filter: drop-shadow(14px 13px 11px rgba(0, 0, 0, 0.5));
    font-weight: bold;
    font-size: rem(136px);
    line-height: rem(148px);
    max-width: calc(var(--size--content--max) - 200px);
  }

  article {
    width: 100%;
    display: flex;
    flex-flow: column;
    gap: rem(84px);

    :global(h2) {
      filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
      font-weight: bold;
      font-size: rem(80px);
      line-height: rem(80px);
      text-align: center;
    }

    :global(p),
    :global(li) {
      font-size: rem(40px);
      line-height: rem(52px);
      text-align: center;
      padding: rem(20px);
      font-family: var(--font--type);
    }

    :global(.hp--intro) {
      display: flex;
      flex-flow: column;
      position: relative;
      justify-content: center;
      align-items: center;
      border: rem(4px) solid var(--color--brand);
      border-top: none;
      padding: rem(166px) 13% rem(76px);
      margin-top: rem(130px);

      &:before,
      &:after {
        content: "";
        position: absolute;
        top: 0;
        height: 4px;
        background-color: var(--color--brand);
      }

      &:before {
        left: 0;
        width: 34%;
      }

      &:after {
        right: 0;
        width: 34%;
      }
    }

    :global(.hp--intro--img) {
      position: absolute;
      top: -28%;
    }

    :global(ul) {
      margin: rem(56px) 0;
    }

    :global(li) {
      list-style: none;
    }

    :global(.hp--list) {
      :global(p) {
        font-size: rem(28px);
        line-height: rem(40px);
        padding: 0;
        letter-spacing: var(--font--type--letter-spacing);
      }
    }
  }
</style>
