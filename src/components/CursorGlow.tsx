import { useEffect, useRef, useState } from "react";

/**
 * Cursor, themed: a soft trailing glow (unchanged) plus a tight, snappy
 * "core" ring + pearl that tracks the pointer 1:1 and blooms pink over
 * anything clickable. Native cursor is only hidden once we've confirmed
 * a fine pointer + no reduced-motion preference — never blind.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
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
      if (ringRef.current) {
        ringRef.current.style.left = `${e.clientX}px`;
        ringRef.current.style.top = `${e.clientY}px`;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", onMove);

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        "a, button, [role='button'], input, textarea"
      );
      setActive(!!el);
    };
    window.addEventListener("mouseover", onOver);

    let raf: number;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-core-cursor");
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow hidden md:block" aria-hidden="true" />
      {ready && (
        <>
          <div
            ref={ringRef}
            className={`cursor-core-ring hidden md:block ${active ? "is-active" : ""}`}
            aria-hidden="true"
          />
          <div ref={dotRef} className="cursor-core-dot hidden md:block" aria-hidden="true" />
        </>
      )}
    </>
  );
}
