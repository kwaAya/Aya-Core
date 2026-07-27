import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  { prompt: "$", text: "deploy --project matatiele-online", delay: 0 },
  { prompt: ">", text: "live at matatiele.co.za", delay: 0, dim: true },
  { prompt: "$", text: "status --all-platforms", delay: 0 },
  { prompt: ">", text: "5 platforms, 16 towns covered", delay: 0, dim: true },
  { prompt: "$", text: "core.system --online", delay: 0 },
  { prompt: ">", text: "540h production time", delay: 0, dim: true },
  { prompt: "$", text: "▊", delay: 0, cursor: true },
];

/**
 * Signature element: a soft, glassy "build log" terminal that types out
 * real shipped-work stats. Bridges the soft/premium half of the brand
 * with the technologist half, instead of a generic stat-counter block.
 */
export default function TerminalCard() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setVisibleLines(LINES.length);
      return;
    }

    let line = 0;
    let char = 0;
    let cancelled = false;

    const step = () => {
      if (cancelled) return;
      const current = LINES[line];
      if (!current) return;
      char++;
      setCharCount(char);
      if (char >= current.text.length) {
        line++;
        char = 0;
        setVisibleLines(line);
        if (line < LINES.length) {
          setTimeout(step, 260);
        }
        return;
      }
      setTimeout(step, 22);
    };
    const start = setTimeout(step, 500);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      whileHover={{ rotate: 0, y: -4 }}
      className="relative w-full max-w-md"
    >
      {/* soft blush glow behind the card */}
      <div
        className="absolute -inset-6 rounded-[2rem] blur-2xl -z-10"
        style={{ background: "radial-gradient(circle, rgba(232,196,196,0.55), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="rounded-2xl border border-blush bg-white/80 backdrop-blur-sm shadow-[0_20px_60px_-15px_rgba(171,9,79,0.25)] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-blush-100 bg-blush/20">
          <span className="w-2.5 h-2.5 rounded-full bg-hotpink/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-blush-600" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-100" />
          <span className="ml-2 font-mono text-xs text-gray-700/70">
            aya-core — build log
          </span>
        </div>
        <div className="term-scroll px-5 py-5 font-mono text-[13px] leading-7 h-[220px] overflow-hidden">
          {LINES.slice(0, visibleLines + 1).map((l, i) => {
            const isCurrent = i === visibleLines;
            const text = isCurrent && !l.cursor ? l.text.slice(0, charCount) : l.text;
            return (
              <div key={i} className={l.dim ? "text-gray-700/60" : "text-ink"}>
                <span className="text-hotpink mr-2">{l.prompt}</span>
                {l.cursor ? (
                  <span className="inline-block w-2 h-4 bg-hotpink align-middle animate-pulse" />
                ) : (
                  <span>{text}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
