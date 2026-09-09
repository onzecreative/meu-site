"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check WebGL support
    try {
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) return;
    } catch {
      return;
    }

    // Scene setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Groups for hierarchical rotation
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Core Geometric Wireframe: Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(4.2, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x6366F1,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // 2. Inner Pulsing Core
    const innerGeo = new THREE.OctahedronGeometry(2.2, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x06B6D4,
      emissive: 0x06B6D4,
      emissiveIntensity: 0.6,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    masterGroup.add(innerMesh);

    // 3. Gyroscopic Orbital Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x818CF8,
      transparent: true,
      opacity: 0.45,
      wireframe: true,
    });
    const ringGeo1 = new THREE.TorusGeometry(6.2, 0.04, 16, 100);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    masterGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x06B6D4,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    });
    const ringGeo2 = new THREE.TorusGeometry(7.0, 0.03, 16, 100);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    masterGroup.add(ring2);

    // 4. Particle Constellation
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x6366F1); // Indigo
    const color2 = new THREE.Color(0x06B6D4); // Cyan
    const color3 = new THREE.Color(0x8B5CF6); // Purple

    for (let i = 0; i < particleCount; i++) {
      // Fibonacci sphere distribution with radius variance
      const radius = 5.2 + Math.random() * 4.5;
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.sqrt(particleCount * Math.PI) * theta;

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color variation
      const mixRatio = Math.random();
      const pColor = mixRatio < 0.45 ? color1 : mixRatio < 0.8 ? color2 : color3;
      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLightIndigo = new THREE.PointLight(0x6366F1, 2.5, 30);
    pointLightIndigo.position.set(10, 8, 10);
    scene.add(pointLightIndigo);

    const pointLightCyan = new THREE.PointLight(0x06B6D4, 2.0, 30);
    pointLightCyan.position.set(-10, -8, 8);
    scene.add(pointLightCyan);

    // Dynamic mouse light
    const mouseLight = new THREE.PointLight(0x818CF8, 1.5, 25);
    scene.add(mouseLight);

    // Interaction state
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let isVisible = true;

    // Mouse movement listener
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetX = normX * 0.45;
      targetY = normY * 0.35;

      mouseLight.position.x = normX * 12;
      mouseLight.position.y = normY * 10;
      mouseLight.position.z = 8;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        masterGroup.rotation.y += deltaX * 0.006;
        masterGroup.rotation.x += deltaY * 0.006;
      }
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousedown", onMouseDown);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || 700;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    // IntersectionObserver to pause rendering when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    setIsLoaded(true);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth damping toward mouse target
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (!isDragging) {
        masterGroup.rotation.y = elapsedTime * 0.15 + currentX;
        masterGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1 + currentY;
      }

      // Self rotation on components
      coreMesh.rotation.y = -elapsedTime * 0.1;
      innerMesh.rotation.x = elapsedTime * 0.25;
      innerMesh.rotation.z = elapsedTime * 0.15;

      ring1.rotation.z = elapsedTime * 0.2;
      ring2.rotation.z = -elapsedTime * 0.25;

      particles.rotation.y = elapsedTime * 0.04;

      // Pulsing effect
      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.04;
      innerMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
