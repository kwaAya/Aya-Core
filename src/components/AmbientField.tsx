import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const COUNT = 50;

function Field() {
  const pointsRef = useRef<THREE.Points>(null);
  const scrollRef = useRef(0);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const silver = new THREE.Color("#c9c9c9");
    const pink = new THREE.Color("#F81295");
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 44;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      const c = Math.random() < 0.08 ? pink : silver; // rare magenta speck, mostly chrome
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  const velocityRef = useRef(0);

  useEffect(() => {
    let lastY = window.scrollY;
    let lastT = performance.now();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;

      const now = performance.now();
      const dt = Math.max(now - lastT, 1);
      velocityRef.current = Math.min(Math.abs((window.scrollY - lastY) / dt), 3);
      lastY = window.scrollY;
      lastT = now;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((_, delta) => {
    const points = pointsRef.current;
    if (!points) return;
    const boost = 1 + velocityRef.current * 4; // a fast scroll briefly quickens the drift
    points.rotation.y += delta * 0.015 * boost;
    const targetTilt = scrollRef.current * 0.6 - 0.3;
    points.rotation.x += (targetTilt - points.rotation.x) * 0.02;
    points.position.y = scrollRef.current * 6;
    velocityRef.current *= 0.94; // decays back to the calm baseline between scroll events
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/**
 * Site-wide atmospheric layer — texture, never a focal point. Fixed,
 * non-interactive, sits behind all page content.
 */
export default function AmbientField() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ alpha: true, antialias: false }} dpr={[1, 1.5]}>
        <Field />
      </Canvas>
    </div>
  );
}