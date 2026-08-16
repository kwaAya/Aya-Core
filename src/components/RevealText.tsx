import { useEffect, useRef, useState } from "react";
import { animate, stagger, splitText } from "animejs";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
};

/**
 * Fires `inView` exactly once, the first time the returned ref's element
 * crosses into the viewport — replaces framer-motion's `useInView` so this
 * component doesn't need framer-motion at all anymore.
 */
function useRevealTrigger(margin = "-10% 0px") {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, inView };
}

/**
 * Splits text into words and reveals them in a staggered rise-in, masked
 * by a clip wrapper, as the element scrolls into view. splitText handles
 * both the word-wrapping and accessibility: screen readers get the intact
 * original string (`accessible: true`), the animated spans are hidden from
 * the a11y tree.
 */
export default function RevealText({ text, className = "", as = "p", delay = 0 }: Props) {
  const { ref, inView } = useRevealTrigger();
  const Tag = as;

    useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const split = splitText(el, {
      words: { wrap: "clip", class: "mr-[0.28em] align-bottom" },
      accessible: true,
    });

    animate(split.words, {
      y: ["110%", "0%"],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(45, { start: delay * 1000 }),
      ease: "outExpo",
    });

    // FIX: Wrap the statement in curly braces so it evaluates to void
    return () => {
      split.revert();
    };
  }, [inView, delay]);


  return (
    // `as` is a union of tag names, but TS can't carry that through to a
    // precise ref type on a dynamically-chosen tag — safe cast, we only
    // ever call generic HTMLElement methods on it.
    <Tag ref={ref as any} className={className}>
      {text}
    </Tag>
  );
}