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

export default function ThreeMovements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  useGSAP(
    () => {
      if (window.matchMedia("(max-width: 767px)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const trigger = sectionRef.current;
      if (!trigger) return;

      ScrollTrigger.create({
        trigger,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.3,
        onUpdate: (self) => {
          const p = self.progress;
          setStage(p < 0.33 ? 0 : p < 0.66 ? 1 : 2);
        },
      });
    },
    { scope: sectionRef }
  );

  const orbMotion = {
    0: { x: 220, y: -180, rotate: 18, scale: 0.82, opacity: 0.8 },
    1: { x: 40, y: -18, rotate: 6, scale: 1, opacity: 1 },
    2: { x: -22, y: 20, rotate: -8, scale: 1.08, opacity: 1 },
  }[stage];

  return (
    <section ref={sectionRef} className="px-6 md:px-10">
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

      <div className="relative mx-auto hidden h-[260vh] max-w-6xl md:block">
        <div className="sticky top-24 h-[calc(100vh-6rem)]">
          <div className="grid h-full grid-cols-[1.1fr_0.9fr] items-center gap-12">
            <div className="relative h-[420px] overflow-hidden">
              {MOVEMENTS.map((m, i) => (
                <motion.div
                  key={m.n}
                  className="absolute inset-0 flex flex-col justify-center"
                  animate={{
                    opacity: stage === i ? 1 : 0,
                    y: stage === i ? 0 : 24,
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
              <motion.div
                ref={orbRef}
                className="relative"
                animate={orbMotion}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <OrbitalScene interactive={false} className="relative h-[420px] w-[420px]" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-md py-8 md:hidden">
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
    </section>
  );
}