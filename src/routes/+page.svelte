<script>
  import * as THREE from "three";

  $: innerWidth = 0;
  $: innerHeight = 0;

  // Create the scene
  const scene = new THREE.Scene();

  // Create Camera and position
  const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
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
  const flash = new THREE.SpotLight(0xffdd67, 30, 500, 1.7);
  flash.position.set(200, 300, 100);
  scene.add(flash);

  // Add the renderer with fog
  const renderer = new THREE.WebGLRenderer();
  scene.fog = new THREE.FogExp2(0x193549, 0.002);
  renderer.setClearColor(scene.fog.color);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Add the renderer to the dom
  document.body.appendChild(renderer.domElement);

  // Load the clouds
  const cloudParticles = [];

  const loader = new THREE.TextureLoader();

  loader.load("./smoke-1.png", function (texture) {
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

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    cloudParticles.forEach((p) => {
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
</script>

<svelte:window on:resize={onWindowResize} bind:innerHeight bind:innerWidth />

<div id="rain-demo"></div>
<article>
  <h1>Justin time to blow your mind</h1>
  <div class="intro">
    <img src="/profile.png" alt="Me wearing a blue baseball cap sipping an espresso" />
    <p>My name’s Justin Smith.</p>
    <p>
      I’m a Digital Communication Officer at the International Labour Organization, a
      specialised agency of the United Nations.
    </p>
  </div>
  <h2>This is my website</h2>
  <ul>
    <li>✍️<a href="/writing">You can read my writing</a></li>
    <li>🛠️<a href="/work">Check out my projects</a></li>
    <li><a href="/contact">Get in touch</a></li>
    <li><a href="/about">Or read this shameless plug</a></li>
  </ul>
  <p>And that's it</p>
  <p>That's all there is to do here</p>
</article>

<style lang="scss">
  article {
    width: 100%;
    display: flex;
    flex-flow: column;
    gap: rem(84px);
  }

  h1,
  h2 {
    filter: drop-shadow(14px 13px 11px rgba(0, 0, 0, 0.5));
    font-weight: bold;
  }

  h1 {
    font-size: rem(136px);
    line-height: rem(148px);
    max-width: calc(var(--size--content--max) - 200px);
  }

  h2 {
    font-size: rem(80px);
    text-align: center;
  }

  p,
  li {
    font-size: rem(40px);
    line-height: rem(52px);
    text-align: center;
    padding: rem(20px) 0;
  }

  .intro {
    margin-top: rem(116px);
    display: flex;
    flex-flow: column;
    position: relative;
    justify-content: center;
    align-items: center;
    border: rem(4px) solid var(--color--brand);
    border-top: none;
    padding: rem(166px) 13% rem(76px);

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

  img {
    position: absolute;
    top: -34%;
  }

  li {
    list-style: none;
  }
</style>
