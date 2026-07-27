import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

const HOTPINK = "#AB094F";
const SILVER = "#c9c9d1";
const SILVER_WARM = "#d8cfd2";
const PEARL = "#f4dfe5";

function Ring({
  radius,
  tilt,
  rotation,
  speed,
  color,
  thickness = 0.008,
}: {
  radius: number;
  tilt: [number, number, number];
  rotation: [number, number, number];
  speed: number;
  color: string;
  thickness?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const geom = useMemo(
    () => new THREE.TorusGeometry(radius, thickness, 32, 256),
    [radius, thickness]
  );
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * speed * 0.35;
    ref.current.rotation.y += delta * speed * 0.5;
    ref.current.rotation.z += delta * speed * 0.15;
  });
  return (
    <mesh
      ref={ref}
      geometry={geom}
      rotation={[tilt[0] + rotation[0], tilt[1] + rotation[1], tilt[2] + rotation[2]]}
    >
      <meshStandardMaterial
        color={color}
        metalness={0.95}
        roughness={0.18}
        emissive={color}
        emissiveIntensity={0.08}
      />
    </mesh>
  );
}

function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const s = 1 + Math.sin(t * 1.2) * 0.03;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.55, 64, 64]} />
      <meshPhysicalMaterial
        color="#ffffff"
        roughness={0.15}
        metalness={0.1}
        transmission={0.6}
        thickness={1.2}
        clearcoat={1}
        clearcoatRoughness={0.05}
        emissive={PEARL}
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

function Sparks() {
  const group = useRef<THREE.Group>(null);
  const positions = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      arr.push([Math.cos(a) * 1.6, Math.sin(a) * 0.4, Math.sin(a * 2) * 0.6]);
    }
    return arr;
  }, []);
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.15;
  });
  return (
    <group ref={group}>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ interactive }: { interactive: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ pointer }) => {
    if (!group.current) return;
    const targetY = interactive ? pointer.x * 0.35 : 0;
    const targetX = interactive ? -pointer.y * 0.25 : 0;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
  });

  return (
    <group ref={group}>
      <Core />
      <Sparks />
      <Ring radius={1.35} tilt={[0.4, 0, 0.2]} rotation={[0, 0, 0]} speed={0.4} color={SILVER} />
      <Ring radius={1.55} tilt={[-0.3, 0.5, -0.1]} rotation={[0, 1, 0]} speed={0.3} color={SILVER_WARM} />
      <Ring radius={1.75} tilt={[0.6, -0.4, 0.3]} rotation={[0.5, 0, 0]} speed={0.25} color={SILVER} />
      <Ring
        radius={1.95}
        tilt={[-0.2, 0.8, 0.4]}
        rotation={[0, 0.5, 0.2]}
        speed={0.2}
        color={SILVER_WARM}
        thickness={0.006}
      />
    </group>
  );
}

/**
 * The site's real signature 3D visual — a luminous glass core with four
 * metallic rings genuinely orbiting it (React Three Fiber / WebGL, not a
 * CSS approximation). `interactive` controls whether it tilts toward the
 * cursor (hero use) or sits self-contained (scroll-driven / decorative use).
 */
export function OrbitalScene({
  interactive = true,
  className = "",
}: {
  interactive?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 4, 5]} intensity={1.1} color="#ffffff" />
          <directionalLight position={[-4, -2, -3]} intensity={0.5} color={PEARL} />
          <pointLight position={[0, 0, 2]} intensity={0.8} color="#ffffff" />
          <Scene interactive={interactive} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export { HOTPINK };
