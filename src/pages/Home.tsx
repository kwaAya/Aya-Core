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
      <section className="relative overflow-hidden px-6 pb-24 pt-40 md:px-10">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(248,18,149,0.10)_0%,_rgba(248,18,149,0.04)_18%,_transparent_45%),_radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.07)_0%,_rgba(139,92,246,0.03)_16%,_transparent_42%)] blur-3xl" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-4 left-1/2 -z-10 -translate-x-1/2 whitespace-nowrap font-display text-[26vw] font-semibold leading-none text-ink/[0.035] md:top-4 md:text-[16rem]"
        >
          CORE
        </span>

        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-3"
          >
            <SectionTag>creative technologist · south africa</SectionTag>
          </motion.div>

          <div className="hero-stage">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <RevealText
                as="h1"
                text="Built for communities. Engineered for scale."
                className="font-display text-5xl font-semibold leading-[0.96] tracking-[-0.01em] text-ink md:text-7xl lg:text-8xl"
              />

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-4 max-w-lg text-lg text-gray-700/80"
              >
                Aya Core Studios is the practice of Unako "Aya" Mtumtum — designing and shipping immersive digital products where systems thinking, cultural intention, and full-stack craft meet at a single luminous core.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3.5 font-heading text-sm font-medium text-white shadow-[0_0_40px_rgba(248,18,149,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-hotpink"
                >
                  Explore the work <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 font-heading text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-hotpink hover:text-hotpink"
                >
                  Let's collaborate
                </Link>
              </motion.div>
              <div className="mt-8 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-gray-400">
                <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5">strategy</span>
                <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5">ux systems</span>
                <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5">product design</span>
              </div>
              <p className="mt-6 font-mono text-xs text-gray-400 md:hidden">
                core.system // online — tilt or move your cursor above
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
              className="hero-orbital"
            >
              <div className="hero-orbital-shell">
                <div className="hero-orbital-glow" aria-hidden="true" />
                <OrbitalScene className="hero-orbital-scene" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCounter value="5" label="live platforms" />
          <StatCounter value="many" label="hours, we don't talk about it" />
          <StatCounter value="self-taught" label="no bootcamp, no CS degree" />
        </div>
      </section>

      {/* ---------- THE CORE, IN THREE MOVEMENTS (scroll-driven) ---------- */}
      <ThreeMovements />

      {/* ---------- FEATURED WORK ---------- */}
      <section className="relative px-6 md:px-10 py-24 bg-charcoal overflow-hidden">
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
      <section className="dark-section relative bg-charcoal text-white px-6 md:px-10 py-28 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-30 -z-0"
          style={{ background: "radial-gradient(circle, #F81295, transparent 70%)" }}
          aria-hidden="true"
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 400 400"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-[0.15]"
          style={{ animation: "core-orbit-spin 40s linear infinite" }}
        >
          <ellipse cx="200" cy="200" rx="190" ry="70" stroke="#F81295" strokeWidth="1" fill="none" transform="rotate(-18 200 200)" />
          <ellipse cx="200" cy="200" rx="150" ry="150" stroke="#c9c9c9" strokeWidth="0.75" fill="none" />
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <SectionTag tone="dark">let's build something great</SectionTag>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mt-6 leading-tight">
            Tourism platform, healthcare system, gaming experience, or a custom web system?
          </h2>
          <p className="mt-6 text-white/60 max-w-xl mx-auto">
            Let's collaborate on your next project.
          </p>
          <Link
            to="/contact"
            className="group mt-10 inline-flex items-center gap-2 bg-hotpink text-white font-mono text-sm rounded-full px-7 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-hotpink-glow shadow-[0_0_40px_-8px_rgba(248,18,149,0.55)]"
          >
            $ initiate_contact
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
