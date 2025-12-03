// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";

// /**
//  * Lightweight Three.js background used on the home hero section.
//  * - Creates a small scene with a few floating shapes and particles
//  * - Reacts subtly to mouse movement and scroll for depth / parallax
//  * - Renders into a fixed-position canvas behind the main content
//  */
// function ThreeBackground() {
//   const canvasRef = useRef(null);
//   const cleanupRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x080312);

//     const camera = new THREE.PerspectiveCamera(
//       55,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       100
//     );
//     camera.position.set(0, 0, 8);

//     const renderer = new THREE.WebGLRenderer({
//       canvas,
//       antialias: true,
//       alpha: true,
//     });
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     // Lights
//     const primaryLight = new THREE.PointLight(0x38bdf8, 2.3, 40);
//     primaryLight.position.set(6, 6, 10);
//     scene.add(primaryLight);

//     const secondaryLight = new THREE.PointLight(0x6366f1, 1.6, 30);
//     secondaryLight.position.set(-6, -4, -8);
//     scene.add(secondaryLight);

//     const ambient = new THREE.AmbientLight(0x94a3b8, 0.35);
//     scene.add(ambient);

//     // Floating shapes
//     const objects = [];
//     const geometries = [
//       new THREE.IcosahedronGeometry(1.1, 0),
//       new THREE.TorusKnotGeometry(0.8, 0.22, 120, 16),
//       new THREE.DodecahedronGeometry(0.9),
//     ];
//     const colors = [0x38bdf8, 0x6366f1, 0x22c55e];

//     geometries.forEach((geom, idx) => {
//       const material = new THREE.MeshStandardMaterial({
//         color: colors[idx],
//         emissive: colors[idx],
//         metalness: 0.6,
//         roughness: 0.2,
//         emissiveIntensity: 0.35,
//         transparent: true,
//         opacity: 0.9,
//       });
//       const mesh = new THREE.Mesh(geom, material);
//       mesh.position.set((idx - 1) * 3, idx === 0 ? 1.2 : -0.6 + idx * 0.5, -2 - idx);
//       scene.add(mesh);
//       objects.push(mesh);
//     });

//     // Particles
//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 180;
//     const positions = new Float32Array(particlesCount * 3);

//     for (let i = 0; i < particlesCount * 3; i += 3) {
//       positions[i] = (Math.random() - 0.5) * 18;
//       positions[i + 1] = (Math.random() - 0.5) * 10;
//       positions[i + 2] = (Math.random() - 0.5) * 14;
//     }

//     particlesGeometry.setAttribute(
//       "position",
//       new THREE.BufferAttribute(positions, 3)
//     );

//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.04,
//       color: 0x93c5fd,
//       transparent: true,
//       opacity: 0.8,
//     });

//     const particles = new THREE.Points(particlesGeometry, particlesMaterial);
//     scene.add(particles);

//     // Mouse + scroll interaction
//     const mouse = new THREE.Vector2(0, 0);
//     let targetX = 0;
//     let targetY = 0;

//     const handleMouseMove = (event) => {
//       const x = event.clientX / window.innerWidth - 0.5;
//       const y = event.clientY / window.innerHeight - 0.5;
//       mouse.set(x, y);
//     };

//     const handleScroll = () => {
//       const scrollY = window.scrollY || window.pageYOffset;
//       camera.position.y = scrollY * -0.0009;
//     };

//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("scroll", handleScroll);
//     window.addEventListener("resize", handleResize);

//     const clock = new THREE.Clock();
//     let frameId;

//     const animate = () => {
//       const elapsed = clock.getElapsedTime();

//       targetX += (mouse.x * 2 - targetX) * 0.05;
//       targetY += (mouse.y * 1.5 - targetY) * 0.05;

//       objects.forEach((obj, index) => {
//         const speed = 0.2 + index * 0.08;
//         obj.rotation.x = elapsed * speed * 0.8;
//         obj.rotation.y = elapsed * speed * 1.2;
//         obj.position.y += Math.sin(elapsed * speed + index) * 0.0025;
//         obj.position.x += Math.cos(elapsed * speed * 0.6 + index) * 0.002;
//       });

//       particles.rotation.y = elapsed * 0.02;

//       camera.position.x = targetX * 0.7;
//       camera.position.y += (targetY * 0.4 - camera.position.y) * 0.05;
//       camera.lookAt(0, 0, 0);

//       renderer.render(scene, camera);
//       frameId = requestAnimationFrame(animate);
//     };

//     animate();

//     cleanupRef.current = () => {
//       cancelAnimationFrame(frameId);
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("resize", handleResize);
//       renderer.dispose();
//       particlesGeometry.dispose();
//       particlesMaterial.dispose();
//       geometries.forEach((g) => g.dispose());
//       objects.forEach((obj) => obj.geometry.dispose());
//     };

//     return () => {
//       if (cleanupRef.current) cleanupRef.current();
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="three-bg-canvas"
//       aria-hidden="true"
//     />
//   );
// }

// export default ThreeBackground;


