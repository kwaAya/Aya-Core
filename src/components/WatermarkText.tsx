import { useRef } from "react";

type Props = {
  text: string;
  className: string;
  revealColor?: string;
};

/**
 * The site's oversized background watermark words (CORE, SYSTEM, 404, and
 * so on) are normally just faint texture. This makes them light up like a
 * flashlight passing over the letters wherever the cursor happens to be —
 * a small reward for moving your mouse near the top of a page. Purely
 * decorative and purely CSS-driven (a masked ::after layer positioned via
 * two custom properties), so it costs nothing beyond an occasional
 * rAF-throttled style write on mousemove.
 */
export default function WatermarkText({ text, className, revealColor }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef<number | null>(null);

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
  };

  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-text={text}
      onMouseMove={(e) => track(e.clientX, e.clientY)}
      onMouseLeave={reset}
      className={`watermark-reveal ${className}`}
      style={revealColor ? ({ ["--watermark-reveal-color" as string]: revealColor }) : undefined}
    >
      {text}
    </span>
  );
}