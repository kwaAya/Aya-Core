import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  value: string; // e.g. "540", "R243K", "5"
  label: string;
  tone?: "light" | "dark";
};

/** Parses a leading numeric portion out of a stat string so it can be counted up,
 *  keeping any prefix/suffix (like "R" or "K") static. */
function parseValue(value: string) {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: value };
  const [, prefix, number, suffix] = match;
  return { prefix, number: parseFloat(number), suffix };
}

export default function StatCounter({ value, label, tone = "light" }: Props) {
  const { prefix, number, suffix } = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setDisplay(number);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(number * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, number]);

  const isDecimal = value.includes(".");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group relative rounded-2xl border bg-charcoal px-7 py-8 flex flex-col gap-2 overflow-hidden transition-colors ${
        tone === "dark" ? "border-white/10 hover:border-hotpink/40" : "border-blush-100 hover:border-hotpink/40"
      }`}
    >
      {/* thin top edge catches the light, like a chrome bevel */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
      {/* soft magenta glow that blooms in on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-4 -top-10 h-24 rounded-full bg-hotpink/0 blur-2xl transition-colors duration-500 group-hover:bg-hotpink/20"
      />
      <span
        ref={ref}
        className={`relative font-display text-4xl md:text-5xl font-semibold ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {prefix}
        {isDecimal ? display.toFixed(1) : Math.round(display).toLocaleString()}
        {suffix}
      </span>
      <span
        className={`relative font-mono text-xs uppercase tracking-wide ${
          tone === "dark" ? "text-white/50" : "text-gray-700/60"
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
}