import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect, Suspense } from "react";
import { animate } from "animejs";
import * as THREE from "three";

const HOTPINK = "#F81295";
const SILVER = "#c9c9c9";
const SILVER_WARM = "#dcdcdc";
const PEARL = "#f2f2f2";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Ring({
  radius,
  tilt,
  rotation,
  speed,
  color,
  entranceDelay = 0,
  thickness = 0.008,
}: {
  radius: number;
  tilt: [number, number, number];
  rotation: [number, number, number];
  speed: number;
  color: string;
  entranceDelay?: number;
  thickness?: number;
}) {
  const spinRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const geom = useMemo(
    () => new THREE.TorusGeometry(radius, thickness, 32, 256),
    [radius, thickness]
  );

  // Resting orientation — identical math to the original static rotation prop.
  const rest: [number, number, number] = [
    tilt[0] + rotation[0],
    tilt[1] + rotation[1],
    tilt[2] + rotation[2],
  ];

  // Continuous orbital spin — untouched, owns the INNER mesh, runs forever.
  useFrame((_, delta) => {
    if (!spinRef.current) return;
    spinRef.current.rotation.x += delta * speed * 0.35;
    spinRef.current.rotation.y += delta * speed * 0.5;
    spinRef.current.rotation.z += delta * speed * 0.15;
  });

  // Entrance sweep — owns the OUTER group, once, on mount. Rings start
  // near edge-on (thin) and sweep open into their resting tilt.
  useEffect(() => {
    const group = orbitRef.current;
    if (!group) return;

    if (prefersReducedMotion()) {
      group.rotation.set(rest[0], rest[1], rest[2]);
      return;
    }

    const start = { x: Math.PI / 2, y: rest[1] * 3.2, z: rest[2] * 3.2 };
    group.rotation.set(start.x, start.y, start.z);

    const progress = { ...start };
    const anim = animate(progress, {
      x: rest[0],
      y: rest[1],
      z: rest[2],
      duration: 1700,
      delay: 250 + entranceDelay,
      ease: "outExpo",
      onUpdate: () => group.rotation.set(progress.x, progress.y, progress.z),
    });

    return () => {
      anim.cancel();
    };
  }, [rest[0], rest[1], rest[2], entranceDelay]);

  return (
    <group ref={orbitRef}>
      <mesh ref={spinRef} geometry={geom}>
        <meshStandardMaterial
          color={color}
          metalness={0.95}
          roughness={0.18}
          emissive={color}
          emissiveIntensity={0.08}
        />
      </mesh>
    </group>
  );
}

function Core() {
  const pulseRef = useRef<THREE.Mesh>(null);
  const entranceRef = useRef<THREE.Group>(null);

  // Continuous breathing pulse — untouched, owns the INNER mesh.
  useFrame(({ clock }) => {
    if (!pulseRef.current) return;
    const t = clock.getElapsedTime();
    const s = 1 + Math.sin(t * 1.2) * 0.03;
    pulseRef.current.scale.setScalar(s);
  });

  // Entrance — the core grows in first, the "single point" the rings
  // then sweep in around (echoes the homepage's three-movements beat:
  // nucleus, then systems form around it).
  useEffect(() => {
    const group = entranceRef.current;
    if (!group) return;

    if (prefersReducedMotion()) {
      group.scale.setScalar(1);
      return;
    }

    group.scale.setScalar(0);
    const progress = { s: 0 };
    const anim = animate(progress, {
      s: 1,
      duration: 700,
      ease: "outExpo",
      onUpdate: () => group.scale.setScalar(progress.s),
    });
    return () => {
      anim.cancel();
    };
  }, []);

  return (
    <group ref={entranceRef}>
      <mesh ref={pulseRef}>
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
    </group>
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
      <Ring radius={1.35} tilt={[0.4, 0, 0.2]} rotation={[0, 0, 0]} speed={0.4} color={SILVER} entranceDelay={0} />
      <Ring radius={1.55} tilt={[-0.3, 0.5, -0.1]} rotation={[0, 1, 0]} speed={0.3} color={SILVER_WARM} entranceDelay={90} />
      <Ring radius={1.75} tilt={[0.6, -0.4, 0.3]} rotation={[0.5, 0, 0]} speed={0.25} color={SILVER} entranceDelay={180} />
      <Ring
        radius={1.95}
        tilt={[-0.2, 0.8, 0.4]}
        rotation={[0, 0.5, 0.2]}
        speed={0.2}
        color={SILVER_WARM}
        thickness={0.006}
        entranceDelay={270}
      />
    </group>
  );
}

/**
 * The site's real signature 3D visual — a luminous glass core with four
 * metallic rings genuinely orbiting it (React Three Fiber / WebGL, not a
 * CSS approximation). `interactive` controls whether it tilts toward the
 * cursor (hero use) or sits self-contained (scroll-driven / decorative use).
 * On mount: the core grows in, then the rings sweep from edge-on into
 * their resting orbits, staggered ~90ms apart — then the continuous
 * spin/pulse/tilt logic (unchanged) takes over.
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
