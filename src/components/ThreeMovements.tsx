import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import OrbitalScene from "./LazyOrbitalScene";
import SectionTag from "./SectionTag";
import RevealText from "./RevealText";

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

/**
 * Scroll-driven retelling of the "core, in three movements" philosophy.
 * On md+ screens, GSAP ScrollTrigger pins the orbital scene while the
 * reader scrubs past three text beats; the ambient glow shifts color per
 * beat. On small screens: a simple stacked layout, no pinning.
 */
export default function ThreeMovements() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  useGSAP(
    () => {
      if (window.matchMedia("(max-width: 767px)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top 96px",
        end: "+=2200",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const v = self.progress;
          setStage(v < 0.34 ? 0 : v < 0.7 ? 1 : 2);
        },
      });
    },
    { scope: pinRef }
  );

  return (
    <section className="px-6 md:px-10">
      <div className="max-w-3xl mx-auto text-center pt-28 pb-8">
        <SectionTag>the core, in three movements</SectionTag>
        <RevealText
          as="h2"
          text="A studio told the way its work is built."
          className="font-display text-3xl md:text-5xl font-medium leading-tight mt-6"
        />
        <p className="mt-4 font-mono text-xs text-gray-400 hidden md:block">
          scroll to move the system · beat{" "}
          <span className="text-hotpink">{stage + 1} / 3</span>
        </p>
      </div>

      {/* Desktop: GSAP ScrollTrigger pinned scrollytelling */}
      <div
        ref={pinRef}
        className="hidden md:grid relative max-w-6xl mx-auto grid-cols-2 gap-12 items-center h-[calc(100vh-6rem)]"
      >
        <div className="relative">
          {MOVEMENTS.map((m, i) => (
            <motion.div
              key={m.n}
              className="absolute inset-0 flex flex-col justify-center"
              animate={{ opacity: stage === i ? 1 : 0, y: stage === i ? 0 : 16 }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-display text-4xl text-blush-600">{m.n}.</span>
              <h3 className="font-display text-2xl md:text-3xl font-semibold mt-3">{m.title}</h3>
              <p className="text-gray-700/70 mt-4 max-w-md leading-relaxed">{m.body}</p>
            </motion.div>
          ))}
        </div>
        <div className="relative flex justify-center">
          <div
            className="absolute inset-0 rounded-full blur-3xl transition-all duration-1000"
            style={{ background: GLOW_BY_STAGE[stage] }}
            aria-hidden="true"
          />
          <OrbitalScene interactive={false} className="relative w-[420px] h-[420px]" />
        </div>
      </div>

      {/* Mobile: simple stacked fallback, no pinning */}
      <div className="md:hidden max-w-md mx-auto py-8">
        <div className="relative flex justify-center mb-10">
          <div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{ background: GLOW_BY_STAGE[2] }}
            aria-hidden="true"
          />
          <OrbitalScene interactive={false} className="relative w-[260px] h-[260px]" />
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
              <h3 className="font-display text-xl font-semibold mt-2">{m.title}</h3>
              <p className="text-sm text-gray-700/70 mt-2 leading-relaxed">{m.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}