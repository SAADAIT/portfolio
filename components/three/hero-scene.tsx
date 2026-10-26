"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";

const RADIUS = 5.6;
const SPACING = 0.17;

type Pointer = { x: number; y: number };

/**
 * A disc of points whose height is animated like a depth map.
 * It reacts to the mouse with a tilt and a local "bump".
 */
function PointSurface({ pointer }: { pointer: RefObject<Pointer> }) {
  const group = useRef<THREE.Group>(null);
  const width = useThree((state) => state.size.width);
  const offsetX = width > 1024 ? 2.4 : 0;

  const surface = useMemo(() => {
    const coords: number[] = [];
    const steps = Math.ceil(RADIUS / SPACING);
    for (let ix = -steps; ix <= steps; ix++) {
      for (let iz = -steps; iz <= steps; iz++) {
        const x = ix * SPACING;
        const z = iz * SPACING;
        if (Math.hypot(x, z) <= RADIUS) coords.push(x, z);
      }
    }

    const count = coords.length / 2;
    const base = new Float32Array(coords);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const from = new THREE.Color("#22d3ee");
    const to = new THREE.Color("#8b5cf6");
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const x = base[i * 2] ?? 0;
      const z = base[i * 2 + 1] ?? 0;
      positions[i * 3] = x;
      positions[i * 3 + 2] = z;
      color.lerpColors(from, to, (x + RADIUS) / (2 * RADIUS));
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const positionAttr = new THREE.BufferAttribute(positions, 3);
    positionAttr.setUsage(THREE.DynamicDrawUsage);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", positionAttr);
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    return { geometry, positionAttr, positions, base, count };
  }, []);

  useEffect(() => () => surface.geometry.dispose(), [surface]);

  const smoothed = useRef<Pointer>({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const { positions, base, count, positionAttr } = surface;
    const t = state.clock.elapsedTime;

    // Frame-rate independent smoothing of the mouse position
    const k = 1 - Math.exp(-delta * 4);
    smoothed.current.x += (pointer.current.x - smoothed.current.x) * k;
    smoothed.current.y += (pointer.current.y - smoothed.current.y) * k;

    // Approximate mouse position in the surface's local space
    const aspect = state.size.width / state.size.height;
    const mx = smoothed.current.x * 4.1 * aspect - offsetX;
    const mz = -smoothed.current.y * 4;

    for (let i = 0; i < count; i++) {
      const x = base[i * 2] ?? 0;
      const z = base[i * 2 + 1] ?? 0;
      const dx = x - mx;
      const dz = z - mz;
      const bump = Math.exp(-(dx * dx + dz * dz) * 0.6) * 0.8;

      positions[i * 3 + 1] =
        Math.sin(x * 0.9 + t * 0.8) * 0.22 +
        Math.cos(z * 0.8 - t * 0.6) * 0.22 +
        Math.sin((x + z) * 0.5 + t * 0.4) * 0.15 +
        bump;
    }
    positionAttr.needsUpdate = true;

    if (group.current) {
      group.current.rotation.y = smoothed.current.x * 0.2;
      group.current.rotation.x = smoothed.current.y * -0.06;
    }
  });

  return (
    <group ref={group} position={[offsetX, -0.8, 0]}>
      <points geometry={surface.geometry} frustumCulled={false}>
        <pointsMaterial
          size={0.05}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [dpr, setDpr] = useState(1.5);

  // Track the mouse on the whole window (the canvas itself ignores events)
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Pause rendering when the hero is scrolled out of view
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? true),
      { threshold: 0 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0"
    >
      <Canvas
        dpr={dpr}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 3.4, 9], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(1.5)}
        />
        <PointSurface pointer={pointer} />
      </Canvas>
    </div>
  );
}