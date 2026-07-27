import { lazy, Suspense } from "react";

// three.js + @react-three/fiber add real weight to the bundle — load them
// only when a page actually renders the orbital scene, instead of on every
// page (Work, Services, etc. never pay this cost at all).
const OrbitalSceneImpl = lazy(() =>
  import("./OrbitalScene").then((m) => ({ default: m.OrbitalScene }))
);

export default function LazyOrbitalScene({
  interactive = true,
  className = "",
}: {
  interactive?: boolean;
  className?: string;
}) {
  return (
    <Suspense
      fallback={
        <div
          className={className}
          style={{
            background:
              "radial-gradient(circle, rgba(232,196,196,0.35), transparent 70%)",
          }}
          aria-hidden="true"
        />
      }
    >
      <OrbitalSceneImpl interactive={interactive} className={className} />
    </Suspense>
  );
}
