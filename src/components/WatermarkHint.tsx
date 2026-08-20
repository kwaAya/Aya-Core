import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  /** Unique per page/section — used as its own "seen it" memory key, so
   * each page gets to show its hint once rather than sharing one sitewide
   * flag. e.g. "about", "work", "services". */
  id: string;
  /** Optional pool of copy specific to this page. One is picked at random
   * each visit so it doesn't feel identical every time. Falls back to a
   * generic playful pool if omitted. */
  messages?: string[];
  /** Positions the hint bubble near wherever this page's watermark
   * actually sits. Defaults to top-center. e.g. "left-6 top-28",
   * "right-6 bottom-28 md:right-16". */
  anchorClassName?: string;
};

const DEFAULT_DESKTOP_MESSAGES = [
  "psst — move your cursor up here",
  "there's a little light hiding in that text",
  "hover here, i dare you",
];

const DEFAULT_TOUCH_MESSAGES = [
  "psst — drag your finger over that text",
  "there's a little light hiding up there, go find it",
  "touch and drag through the big letters",
];

export default function WatermarkHint({ id, messages, anchorClassName }: Props) {
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storageKey = `aya-watermark-hint-seen-${id}`;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = localStorage.getItem(storageKey);
    if (prefersReduced || alreadySeen || (!finePointer && !coarsePointer)) return;

    const touchDevice = coarsePointer && !finePointer;
    setIsTouch(touchDevice);
    const pool = messages ?? (touchDevice ? DEFAULT_TOUCH_MESSAGES : DEFAULT_DESKTOP_MESSAGES);
    setMessage(pool[Math.floor(Math.random() * pool.length)]);

    // Randomized delay so it doesn't land on the exact same beat every
    // time you hit a new page.
    const delay = 1400 + Math.random() * 1600;
    const showTimer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(showTimer);
  }, [id, messages]);

  useEffect(() => {
    if (!visible) return;
    const storageKey = `aya-watermark-hint-seen-${id}`;
    const dismiss = () => {
      setVisible(false);
      localStorage.setItem(storageKey, "1");
    };
    const hideTimer = setTimeout(dismiss, 5000 + Math.random() * 1500);
    window.addEventListener("scroll", dismiss, { once: true, passive: true });
    window.addEventListener("touchstart", dismiss, { once: true, passive: true });
    return () => {
      clearTimeout(hideTimer);
      window.removeEventListener("scroll", dismiss);
      window.removeEventListener("touchstart", dismiss);
    };
  }, [visible, id]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className={`pointer-events-none fixed z-40 ${anchorClassName ?? "left-1/2 top-24 -translate-x-1/2"}`}
        >
          <div className="flex items-center gap-2 rounded-full border border-hotpink/30 bg-charcoal/90 px-4 py-2 font-mono text-[11px] text-white/70 shadow-[0_0_30px_rgba(248,18,149,0.15)] backdrop-blur-sm">
            <motion.span
              aria-hidden="true"
              className="text-hotpink"
              animate={isTouch ? { scale: [1, 1.3, 1] } : { x: [0, 6, 0], y: [0, -3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              ✦
            </motion.span>
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}