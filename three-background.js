// Three.js interactive background for Hailegebrel Yalember portfolio
// Responsible only for 3D scene setup and animation.

const canvas = document.getElementById("bg-canvas");

if (canvas && window.THREE) {
  const { Scene, PerspectiveCamera, WebGLRenderer, Color, FogExp2, Vector2 } =
    THREE;

  const scene = new Scene();
  scene.background = new Color(0x020617);
  scene.fog = new FogExp2(0x020617, 0.08);

  const camera = new PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 8);

  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Lights
  const primaryLight = new THREE.PointLight(0x38bdf8, 2.4, 40);
  primaryLight.position.set(6, 6, 10);
  scene.add(primaryLight);

  const secondaryLight = new THREE.PointLight(0x6366f1, 1.7, 30);
  secondaryLight.position.set(-6, -4, -8);
  scene.add(secondaryLight);

  const ambient = new THREE.AmbientLight(0x94a3b8, 0.35);
  scene.add(ambient);

  // Geometric floating objects
  const objects = [];
  const objectParams = [
    { geom: new THREE.IcosahedronGeometry(1.1, 0), color: 0x38bdf8 },
    { geom: new THREE.TorusKnotGeometry(0.7, 0.22, 120, 16), color: 0x6366f1 },
    { geom: new THREE.DodecahedronGeometry(0.9), color: 0x22c55e },
  ];

  const sharedMaterialOpts = {
    metalness: 0.6,
    roughness: 0.2,
    emissiveIntensity: 0.4,
  };

  objectParams.forEach((cfg, idx) => {
    const material = new THREE.MeshStandardMaterial({
      color: cfg.color,
      emissive: cfg.color,
      transparent: true,
      opacity: 0.9,
      ...sharedMaterialOpts,
    });
    const mesh = new THREE.Mesh(cfg.geom, material);
    mesh.position.set(
      (idx - 1) * 3.0,
      idx === 0 ? 1.2 : -0.8 + idx * 0.6,
      -2 - idx
    );
    scene.add(mesh);
    objects.push(mesh);
  });

  // Subtle particle field
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 200;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 12;
    positions[i + 2] = (Math.random() - 0.5) * 14;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.04,
    color: 0x93c5fd,
    transparent: true,
    opacity: 0.8,
  });

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  // Mouse / scroll interaction
  const mouse = new Vector2(0, 0);
  let targetX = 0;
  let targetY = 0;

  window.addEventListener("mousemove", (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    mouse.set(x, y);
  });

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;
    camera.position.y = scrollY * -0.0009;
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // Animation loop
  const clock = new THREE.Clock();

  function animate() {
    const elapsed = clock.getElapsedTime();

    targetX += (mouse.x * 2.0 - targetX) * 0.05;
    targetY += (mouse.y * 1.5 - targetY) * 0.05;

    objects.forEach((obj, index) => {
      const speed = 0.2 + index * 0.08;
      obj.rotation.x = elapsed * speed * 0.8;
      obj.rotation.y = elapsed * speed * 1.2;
      obj.position.y += Math.sin(elapsed * speed + index) * 0.0025;
      obj.position.x += Math.cos(elapsed * speed * 0.6 + index) * 0.002;
    });

    particles.rotation.y = elapsed * 0.02;

    camera.position.x = targetX * 0.7;
    camera.position.y += (targetY * 0.4 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}



