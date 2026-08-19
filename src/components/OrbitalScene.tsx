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

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function Ring({
  radius,
  tilt,
  rotation,
  speed,
  color,
  from,
  entranceDelay = 0,
  thickness = 0.008,
}: {
  radius: number;
  tilt: [number, number, number];
  rotation: [number, number, number];
  speed: number;
  color: string;
  from: [number, number, number];
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

  // Entrance — owns the OUTER group (position AND rotation; different
  // properties, no conflict with each other or with the spin above).
  // Two phases, in sequence: float in from outside its place to its
  // position at the core, then sweep from edge-on into its resting tilt.
  useEffect(() => {
    const group = orbitRef.current;
    if (!group) return;

    if (prefersReducedMotion()) {
      group.position.set(0, 0, 0);
      group.rotation.set(rest[0], rest[1], rest[2]);
      return;
    }

    let cancelled = false;
    const anims: ReturnType<typeof animate>[] = [];

    group.position.set(from[0], from[1], from[2]);
    group.rotation.set(Math.PI / 2, rest[1] * 3.2, rest[2] * 3.2);

    async function run() {
      await wait(entranceDelay);
      if (cancelled || !group) return;

      // Phase 1 — float from outside their place to their position.
      const pos = { x: from[0], y: from[1], z: from[2] };
      const posAnim = animate(pos, {
        x: 0,
        y: 0,
        z: 0,
        duration: 950,
        ease: "outExpo",
        onUpdate: () => group.position.set(pos.x, pos.y, pos.z),
      });
      anims.push(posAnim);
      await posAnim;
      if (cancelled) return;

      // Phase 2 — still have that animation: sweep from edge-on into
      // the ring's resting orbital tilt.
      const rot = { x: Math.PI / 2, y: rest[1] * 3.2, z: rest[2] * 3.2 };
      const rotAnim = animate(rot, {
        x: rest[0],
        y: rest[1],
        z: rest[2],
        duration: 1400,
        ease: "outExpo",
        onUpdate: () => group.rotation.set(rot.x, rot.y, rot.z),
      });
      anims.push(rotAnim);
      await rotAnim;
    }

    run();
    return () => {
      cancelled = true;
      anims.forEach((a) => a.cancel());
    };
  }, [rest[0], rest[1], rest[2], entranceDelay, from[0], from[1], from[2]]);

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

  useFrame(({ clock }) => {
    if (!pulseRef.current) return;
    const t = clock.getElapsedTime();
    const s = 1 + Math.sin(t * 1.2) * 0.03;
    pulseRef.current.scale.setScalar(s);
  });

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

  useEffect(() => {
    const root = group.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      root.position.set(0.7, 0, 0);
      root.rotation.set(-0.12, 0.15, 0);
      return;
    }

    const motion = { x: -11.5, y: 0.35, z: -3.8, ry: -1.1, rx: 0.5 };
    const target = { x: 1.5, y: 0, z: 0.6, ry: 0.18, rx: -0.12 };

    root.position.set(motion.x, motion.y, motion.z);
    root.rotation.set(motion.rx, motion.ry, 0);

    const anim = animate(motion, {
      x: target.x,
      y: target.y,
      z: target.z,
      ry: target.ry,
      rx: target.rx,
      duration: 2400,
      ease: "outExpo",
      onUpdate: () => {
        root.position.set(motion.x, motion.y, motion.z);
        root.rotation.set(motion.rx, motion.ry, 0);
      },
    });

    return () => {
      anim.cancel();
    };
  }, []);

  useFrame(({ pointer }) => {
    if (!group.current) return;
    const targetY = interactive ? pointer.x * 0.18 : 0;
    const targetX = interactive ? -pointer.y * 0.12 : 0;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
  });

  return (
    <group ref={group}>
      <Core />
      <Sparks />
      <Ring radius={1.35} tilt={[0.4, 0, 0.2]} rotation={[0, 0, 0]} speed={0.4} color={SILVER} from={[-3.2, 0.8, 1.8]} entranceDelay={0} />
      <Ring radius={1.55} tilt={[-0.3, 0.5, -0.1]} rotation={[0, 1, 0]} speed={0.3} color={SILVER_WARM} from={[3.4, -1.0, -1.6]} entranceDelay={90} />
      <Ring radius={1.75} tilt={[0.6, -0.4, 0.3]} rotation={[0.5, 0, 0]} speed={0.25} color={SILVER} from={[0.6, 3.6, -1.2]} entranceDelay={180} />
      <Ring
        radius={1.95}
        tilt={[-0.2, 0.8, 0.4]}
        rotation={[0, 0.5, 0.2]}
        speed={0.2}
        color={SILVER_WARM}
        thickness={0.006}
        from={[-0.9, -3.8, 1.4]}
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
 * On mount: the core grows in, each ring floats in from outside the frame
 * to its position at the core, then sweeps from edge-on into its resting
 * tilt — staggered ~90ms apart — then the continuous spin/pulse/tilt
 * logic (unchanged) takes over.
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
