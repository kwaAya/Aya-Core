import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import OrbitalScene from "./LazyOrbitalScene";
import SectionTag from "./SectionTag";
import RevealText from "./RevealText";
import WatermarkText from "./WatermarkText";
import WatermarkHint from "./WatermarkHint";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MOVEMENTS = [
  {
    n: "I",
    title: "A single point",
    body: "Every product begins as a nucleus — a small, dense idea about who it serves and why it matters. We name that core before we name a component.",
  },
  {
    n: "II",
    title: "Systems form around it",
    body: "Rings of architecture emerge — data, interface, ritual, culture. Each orbit is deliberate, tuned to reinforce the core rather than orbit itself.",
  },
  {
    n: "III",
    title: "The community sets it in motion",
    body: "Real people ship the momentum. Tourism boards, clinics, players. The system only comes alive when a community reaches out and gives it a spin.",
  },
];

const GLOW_BY_STAGE = [
  "radial-gradient(circle, rgba(248,18,149,0.22), transparent 65%)",
  "radial-gradient(circle, rgba(201,201,201,0.3), transparent 65%)",
  "radial-gradient(circle, rgba(255,255,255,0.28), transparent 65%)",
];

// Continuous orb pose across the scroll, interpolated frame-by-frame instead
// of snapping between 3 fixed poses — this is what actually reads as smooth
// under a scrubbed ScrollTrigger.
const ORB_FRAMES = [
  { x: 160, y: -120, rotate: 14, scale: 0.85, opacity: 0.85 },
  { x: 10, y: -6, rotate: 4, scale: 1, opacity: 1 },
  { x: -20, y: 14, rotate: -6, scale: 1.05, opacity: 1 },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function orbAtProgress(p: number) {
  const seg = p * (ORB_FRAMES.length - 1);
  const i = Math.min(Math.floor(seg), ORB_FRAMES.length - 2);
  const t = seg - i;
  const a = ORB_FRAMES[i];
  const b = ORB_FRAMES[i + 1];
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    rotate: lerp(a.rotate, b.rotate, t),
    scale: lerp(a.scale, b.scale, t),
    opacity: lerp(a.opacity, b.opacity, t),
  };
}

export default function ThreeMovements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  // The desktop and mobile layouts below were only ever meant to show one
  // at a time, but `hidden md:block` / `md:hidden` still mount BOTH — so
  // both OrbitalScene instances were rendering a live WebGL canvas at once,
  // permanently, on top of the hero's own canvas. That's the real source
  // of the scroll jank: 2-3 continuous WebGL render loops competing for
  // the same frame budget. Only mount whichever one is actually visible.
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(max-width: 767px)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const trigger = sectionRef.current;
      if (!trigger) return;

      const applyOrb = (p: number) => {
        if (!orbRef.current) return;
        const f = orbAtProgress(p);
        gsap.set(orbRef.current, {
          x: f.x,
          y: f.y,
          rotate: f.rotate,
          scale: f.scale,
          opacity: f.opacity,
        });
      };

      const st = ScrollTrigger.create({
        trigger,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1.35,
        onUpdate: (self) => {
          setStage(self.progress < 0.33 ? 0 : self.progress < 0.67 ? 1 : 2);
          applyOrb(self.progress);
        },
      });

      applyOrb(st.progress);

      // Anything that changes this section's real height after GSAP has
      // already measured it — fonts swapping in, the WebGL orb finishing
      // its first render, isDesktop flipping across the breakpoint — leaves
      // the scrub desynced from what's actually on screen. Refresh once
      // fonts settle, and keep refreshing any time the section itself
      // resizes (covers the orb's canvas mounting in late).
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      window.addEventListener("load", () => ScrollTrigger.refresh());

      let resizeTimeout: ReturnType<typeof setTimeout>;
      const ro = new ResizeObserver(() => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);
      });
      // Watch the whole page, not just this section. This section's height
      // is a fixed vh value so it never resizes on its own — the real
      // culprit is the hero's lazy-loaded OrbitalScene above it finishing
      // its WebGL mount late and shifting this section down the page after
      // ScrollTrigger already measured it.
      ro.observe(document.body);

      // One more late refresh to catch any straggler layout settling.
      const lateRefresh = setTimeout(() => ScrollTrigger.refresh(), 1200);

      return () => {
        ro.disconnect();
        clearTimeout(resizeTimeout);
        clearTimeout(lateRefresh);
      };
    },
    { scope: sectionRef, dependencies: [isDesktop] }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-6 md:px-10">
      <WatermarkText
        text="SYSTEM"
        className="select-none absolute -top-4 left-1/2 -z-10 -translate-x-1/2 whitespace-nowrap font-display text-[20vw] font-semibold leading-none text-ink/[0.03] md:text-[10rem]"
      />
      <WatermarkHint
        id="system"
        anchorClassName="left-1/2 top-8 -translate-x-1/2"
        messages={["there's a system running behind the text", "hover the big word up there"]}
      />
      <div className="mx-auto max-w-3xl pb-8 pt-28 text-center">
        <SectionTag>the core, in three movements</SectionTag>
        <RevealText
          as="h2"
          text="A studio told the way its work is built."
          className="mt-6 font-display text-3xl font-medium leading-tight md:text-5xl"
        />
        <p className="mt-4 hidden font-mono text-xs text-gray-400 md:block">
          scroll to move the system · beat <span className="text-hotpink">{stage + 1} / 3</span>
        </p>
      </div>

      {isDesktop && (
      <div className="relative mx-auto h-[260vh] max-w-6xl">
        <div className="sticky top-20 h-[calc(100vh-5rem)]">
          <div className="grid h-full grid-cols-[1.1fr_0.9fr] items-center gap-12">
            <div className="relative h-[420px] overflow-hidden">
              {MOVEMENTS.map((m, i) => (
                <motion.div
                  key={m.n}
                  className="absolute inset-0 flex flex-col justify-center"
                  animate={{
                    opacity: stage === i ? 1 : 0,
                    y: stage === i ? 0 : 28,
                    x: stage === i ? 0 : 20,
                  }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-display text-4xl text-blush-600">{m.n}.</span>
                  <h3 className="mt-3 font-display text-2xl font-semibold md:text-3xl">{m.title}</h3>
                  <p className="mt-4 max-w-md leading-relaxed text-gray-700/70">{m.body}</p>
                </motion.div>
              ))}
            </div>

            <div className="relative flex justify-center">
              <div
                className="absolute inset-0 rounded-full blur-3xl transition-all duration-1000"
                style={{ background: GLOW_BY_STAGE[stage] }}
                aria-hidden="true"
              />
              <div ref={orbRef} className="relative">
                <OrbitalScene interactive={false} className="relative h-[480px] w-[480px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {!isDesktop && (
      <div className="mx-auto max-w-md py-8">
        <div className="relative mb-10 flex justify-center">
          <div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{ background: GLOW_BY_STAGE[2] }}
            aria-hidden="true"
          />
          <OrbitalScene interactive={false} className="relative h-[260px] w-[260px]" />
        </div>
        <div className="space-y-10">
          {MOVEMENTS.map((m) => (
            <motion.div
              key={m.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-display text-3xl text-blush-600">{m.n}.</span>
              <h3 className="mt-2 font-display text-xl font-semibold">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700/70">{m.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
      )}
    </section>
  );
}