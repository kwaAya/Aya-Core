import { useEffect, useRef, useState } from "react";

/**
 * Cursor, themed: a trailing ambient glow + a precise dot locked to the
 * real pointer position + a ring that continuously orbits that point
 * (not just spins in place) — like a tiny satellite around the core.
 * Blooms pink over anything clickable.
 *
 * UX guards: only activates for a fine pointer with no reduced-motion
 * preference (never hides the native cursor blind); fades out the moment
 * the pointer leaves the window instead of freezing in place; restores
 * a text cursor over inputs/textareas/contenteditable; sits above the
 * nav's z-index so it never disappears behind fixed UI.
 */
const ORBIT_RADIUS = 16;
const ORBIT_SPEED = 0.05; // radians per frame, ~independent of framerate at 60fps

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: -9999, y: -9999 });
  const cursorPoint = useRef({ x: -9999, y: -9999 });
  const angle = useRef(0);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReduced || !isFinePointer) return;

    setReady(true);
    document.documentElement.classList.add("has-core-cursor");

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      cursorPoint.current.x = e.clientX;
      cursorPoint.current.y = e.clientY;
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", onMove);

    // Fade out the moment the pointer leaves the viewport, instead of
    // freezing at its last known position (the "ghost cursor" bug).
    const onLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) setVisible(false);
    };
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", () => setVisible(false));

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        "a, button, [role='button'], input, textarea, select, [contenteditable='true']"
      );
      setActive(!!el);
    };
    window.addEventListener("mouseover", onOver);

    let raf: number;
    const tick = () => {
      // Ambient glow — slow trailing lag, unchanged.
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }

      // Ring — continuously orbits the real cursor point, always, even
      // when the pointer is still, so it reads as "alive" rather than
      // just decorating a static position.
      angle.current += ORBIT_SPEED;
      const ox = cursorPoint.current.x + Math.cos(angle.current) * ORBIT_RADIUS;
      const oy = cursorPoint.current.y + Math.sin(angle.current) * ORBIT_RADIUS * 0.6;
      if (ringRef.current) {
        ringRef.current.style.left = `${ox}px`;
        ringRef.current.style.top = `${oy}px`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-core-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className={`cursor-glow hidden md:block ${visible ? "" : "is-hidden"}`}
        aria-hidden="true"
      />
      {ready && (
        <>
          <div
            ref={ringRef}
            className={`cursor-core-ring hidden md:block ${active ? "is-active" : ""} ${
              visible ? "" : "is-hidden"
            }`}
            aria-hidden="true"
          />
          <div
            ref={dotRef}
            className={`cursor-core-dot hidden md:block ${visible ? "" : "is-hidden"}`}
            aria-hidden="true"
          />
        </>
      )}
    </>
  );
}
