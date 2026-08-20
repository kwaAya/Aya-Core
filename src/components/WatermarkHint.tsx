import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "aya-core-watermark-hint-seen";

/**
 * A one-time, playful nudge for desktop visitors, pointing them toward the
 * cursor-reveal hidden in the big faint watermark word at the top of
 * nearly every page. Shows once, ever, for a few seconds, then remembers
 * via localStorage so returning visitors never see it again.
 */
export default function WatermarkHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = localStorage.getItem(STORAGE_KEY);
    if (!isFinePointer || prefersReduced || alreadySeen) return;

    const showTimer = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const dismiss = () => {
      setVisible(false);
      localStorage.setItem(STORAGE_KEY, "1");
    };
    const hideTimer = setTimeout(dismiss, 5500);
    window.addEventListener("scroll", dismiss, { once: true, passive: true });
    return () => {
      clearTimeout(hideTimer);
      window.removeEventListener("scroll", dismiss);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none fixed left-1/2 top-24 z-40 hidden -translate-x-1/2 md:block"
        >
          <div className="flex items-center gap-2 rounded-full border border-hotpink/30 bg-charcoal/90 px-4 py-2 font-mono text-[11px] text-white/70 shadow-[0_0_30px_rgba(248,18,149,0.15)] backdrop-blur-sm">
            <motion.span
              aria-hidden="true"
              className="text-hotpink"
              animate={{ x: [0, 6, 0], y: [0, -3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              ✦
            </motion.span>
            psst — move your cursor up here
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}