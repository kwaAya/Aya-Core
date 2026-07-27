import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import RevealText from "../components/RevealText";
import OrbitalScene from "../components/LazyOrbitalScene";
import ThreeMovements from "../components/ThreeMovements";
import StatCounter from "../components/StatCounter";
import SectionTag from "../components/SectionTag";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Home() {
  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="relative pt-40 pb-24 px-6 md:px-10 overflow-hidden">
        {/* oversized ghost wordmark, breaks the tidy grid on purpose */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-4 md:top-4 left-1/2 -translate-x-1/2 font-display font-semibold text-[26vw] md:text-[16rem] leading-none text-ink/[0.035] whitespace-nowrap -z-10"
        >
          CORE
        </span>

        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-mono text-sm text-hotpink mb-6"
          >
            // creative technologist · south africa
          </motion.p>

          <div className="relative">
            <RevealText
              as="h1"
              text="Built for communities. Engineered for scale."
              className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-ink max-w-3xl"
            />

            {/* core bleeds past the text column instead of sitting in a tidy grid cell */}
            <div className="md:absolute md:-top-10 md:right-0 flex justify-center mt-10 md:mt-0">
              <div className="relative w-[340px] h-[340px]">
                <div
                  className="absolute inset-0 rounded-full blur-3xl -z-10"
                  style={{ background: "radial-gradient(circle, rgba(232,196,196,0.4), transparent 65%)" }}
                  aria-hidden="true"
                />
                <OrbitalScene className="w-full h-full" />
              </div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-8 text-lg text-gray-700/80 max-w-lg"
          >
            Aya Core Studios is the practice of Unako "Aya" Mtumtum —
            designing and shipping immersive digital products where systems
            thinking, cultural intention, and full-stack craft meet at a
            single luminous core.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/work"
              className="inline-flex items-center gap-2 bg-ink text-white font-heading text-sm font-medium rounded-full px-6 py-3.5 hover:bg-hotpink transition-colors"
            >
              Explore the work <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-ink/15 font-heading text-sm font-medium rounded-full px-6 py-3.5 hover:border-hotpink hover:text-hotpink transition-colors"
            >
              Let's collaborate
            </Link>
          </motion.div>
          <p className="mt-6 font-mono text-xs text-gray-400 md:hidden">
            core.system // online — tilt or move your cursor above
          </p>
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="px-6 md:px-10 py-20 border-y border-blush-100">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-10">
          <StatCounter value="5" label="live platforms" />
          <StatCounter value="540h" label="production time" />
          <StatCounter value="16" label="towns, one corridor" />
        </div>
      </section>

      {/* ---------- THE CORE, IN THREE MOVEMENTS (scroll-driven) ---------- */}
      <ThreeMovements />

      {/* ---------- FEATURED WORK ---------- */}
      <section className="relative px-6 md:px-10 py-24 bg-white overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-6 right-6 md:right-16 font-display font-semibold text-[9rem] md:text-[13rem] leading-none text-blush/25 -z-0"
        >
          05
        </span>
        <div className="relative max-w-6xl mx-auto">
          <div className="mb-12">
            <SectionTag>featured projects</SectionTag>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-4 max-w-lg">
              Production-grade platforms. Real communities.
            </h2>
            <Link
              to="/work"
              className="inline-block mt-4 font-mono text-xs uppercase tracking-wide text-hotpink hover:underline"
            >
              view all projects →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.slice(0, 4).map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- DARK CTA ---------- */}
      <section className="dark-section relative bg-ink text-white px-6 md:px-10 py-28 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-30 -z-0"
          style={{ background: "radial-gradient(circle, #AB094F, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <SectionTag tone="dark">let's build something great</SectionTag>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mt-6 leading-tight">
            Tourism platform, healthcare system, gaming experience, or a custom web system?
          </h2>
          <p className="mt-6 text-white/60 max-w-xl mx-auto">
            Let's collaborate on your next project.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 bg-hotpink text-white font-mono text-sm rounded-full px-7 py-4 hover:bg-hotpink-glow transition-colors shadow-[0_0_40px_-8px_rgba(171,9,79,0.7)]"
          >
            $ initiate_contact
          </Link>
        </div>
      </section>
    </div>
  );
}
