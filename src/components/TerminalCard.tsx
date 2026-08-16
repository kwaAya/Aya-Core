import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { animate, utils } from "animejs";

const LINES = [
  { prompt: "$", text: "deploy --project matatiele-online" },
  { prompt: ">", text: "live at matatiele.co.za", dim: true },
  { prompt: "$", text: "status --all-platforms" },
  { prompt: ">", text: "5 platforms, 16 towns covered", dim: true },
  { prompt: "$", text: "core.system --online" },
  { prompt: ">", text: "540h production time", dim: true },
  { prompt: "$", text: "▊", cursor: true },
];

/**
 * Signature element: a soft, glassy "build log" terminal that types out
 * real shipped-work stats. Bridges the soft/premium half of the brand
 * with the technologist half, instead of a generic stat-counter block.
 */
export default function TerminalCard() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const activeAnim = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleLines(LINES.length);
      return;
    }

    let cancelled = false;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

    async function run() {
      await wait(500);
      for (let i = 0; i < LINES.length; i++) {
        if (cancelled) return;
        const line = LINES[i];
        setVisibleLines(i);
        setCharCount(0);
        if (line.cursor) return; // static pulse — nothing to type

        const progress = { n: 0 };
        const anim = animate(progress, {
          n: line.text.length,
          duration: line.text.length * 22,
          ease: "linear",
          modifier: utils.round(0),
          onUpdate: () => setCharCount(progress.n),
        });
        activeAnim.current = anim;
        await anim;
        if (cancelled) return;
        await wait(260);
      }
    }

    run();
    return () => {
      cancelled = true;
      activeAnim.current?.cancel();
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
      {/* magenta glow behind the card */}
      <div
        className="absolute -inset-6 rounded-[2rem] blur-2xl -z-10"
        style={{ background: "radial-gradient(circle, rgba(248,18,149,0.25), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-sm shadow-[0_20px_60px_-15px_rgba(248,18,149,0.25)] overflow-hidden">
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