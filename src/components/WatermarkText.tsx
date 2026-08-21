import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  className: string;
  revealColor?: string;
  /** Adds a little sparkle + letter-wiggle while the reveal is actively
   * engaged (hover on desktop, touch-drag on mobile). Leave off for the
   * Home page's CORE watermark — that one stays as-is. */
  playful?: boolean;
};

export default function WatermarkText({ text, className, revealColor, playful = false }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef<number | null>(null);
  const [isActive, setIsActive] = useState(false);

  const track = (clientX: number, clientY: number) => {
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--rx", `${clientX - rect.left}px`);
      el.style.setProperty("--ry", `${clientY - rect.top}px`);
    });
  };

  const reset = () => {
    const el = ref.current;
    if (el) {
      el.style.setProperty("--rx", "-9999px");
      el.style.setProperty("--ry", "-9999px");
    }
    setIsActive(false);
  };

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (inside) {
        setIsActive(true);
        track(event.clientX, event.clientY);
      } else if (isActive) {
        reset();
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [isActive]);

  const handleTouchMove = (e: React.TouchEvent<HTMLSpanElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    track(touch.clientX, touch.clientY);
  };

  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-text={text}
      onMouseMove={(e) => track(e.clientX, e.clientY)}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={reset}
      onTouchStart={(e) => {
        setIsActive(true);
        handleTouchMove(e);
      }}
      onTouchMove={handleTouchMove}
      onTouchEnd={reset}
      onTouchCancel={reset}
      className={`watermark-reveal ${playful ? "watermark-reveal--playful" : ""} ${
        isActive ? "is-active" : ""
      } ${className}`}
      style={revealColor ? ({ ["--watermark-reveal-color" as string]: revealColor }) : undefined}
    >
      {text}
    </span>
  );
}