import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RevealText from "../components/RevealText";
import SectionTag from "../components/SectionTag";
import TerminalCard from "../components/TerminalCard";
import WatermarkText from "../components/WatermarkText";
import WatermarkHint from "../components/WatermarkHint";

const SERVICES = [
  {
    title: "Platform build",
    tag: "$ build --full-stack",
    timeline: "scope-led",
    body: "End-to-end design and development of the core product — from the first low-connectivity prototype to something a community runs on daily.",
    items: ["Product discovery in-context", "Full-stack build", "Deployment & handover"],
  },
  {
    title: "Rescue & rebuild",
    tag: "$ migrate --legacy",
    timeline: "scope-led",
    body: "A spreadsheet, a WhatsApp group, or an abandoned app that's outgrown itself. I rebuild it without losing what already works.",
    items: ["Audit of existing workaround", "Incremental migration plan", "Careful handover"],
  },
  {
    title: "Advisory & audit",
    tag: "$ review --architecture",
    timeline: "scope-led",
    body: "A second set of eyes on an in-progress build — architecture, UX, and whether the software is solving the right problem at all.",
    items: ["Technical + UX audit", "Prioritised fix list", "Practical next steps"],
  },
];

const PROCESS = [
  { step: "listen", body: "Time in the actual room, not just a call with a stakeholder." },
  { step: "sketch", body: "A small, disprovable prototype before any real code." },
  { step: "build", body: "Ship in slices small enough to course-correct weekly." },
  { step: "hand off", body: "Documentation and training so the platform outlives the contract." },
];

export default function Services() {
  return (
    <div className="relative overflow-hidden pt-40 pb-28 px-6 md:px-10">
      <WatermarkText
        text="BUILD"
        playful
        className="select-none absolute -top-6 left-[-4%] md:left-0 -z-10 whitespace-nowrap font-display text-[20vw] font-semibold leading-none text-ink/[0.03] md:text-[10rem]"
      />
      <WatermarkHint
        id="services"
        anchorClassName="left-6 top-28 md:left-16"
        messages={["there's a blueprint hiding top-left", "psst — BUILD's tucked up there"]}
      />
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
        <div>
          <SectionTag>services</SectionTag>
          <RevealText
            as="h1"
            text="Three ways to work together."
            className="font-display text-4xl md:text-6xl font-semibold mt-6"
          />
        </div>
        <div className="flex justify-center md:justify-end">
          <TerminalCard />
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mt-16">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="border border-blush-100 rounded-2xl p-7 bg-charcoal flex flex-col hover:border-hotpink/40 hover:shadow-lg transition-[box-shadow,border-color]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-hotpink">{s.tag}</span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-gray-400 border border-white/10 rounded-full px-2 py-1">
                {s.timeline}
              </span>
            </div>
            <h3 className="font-display text-2xl font-semibold mt-4">{s.title}</h3>
            <p className="text-sm text-gray-700/70 mt-3 flex-1">{s.body}</p>
            <ul className="mt-6 space-y-2">
              {s.items.map((it, j) => (
                <motion.li
                  key={it}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 + 0.2 + j * 0.05 }}
                  className="text-sm text-gray-700/80 flex items-start gap-2"
                >
                  <span className="text-hotpink mt-1">·</span> {it}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Process */}
      <div className="max-w-5xl mx-auto mt-28">
        <SectionTag>process</SectionTag>
        <div className="relative mt-14">
          <div aria-hidden="true" className="absolute left-0 right-0 top-5 hidden md:block h-px bg-white/10" />
          <motion.div
            aria-hidden="true"
            className="absolute left-0 right-0 top-5 hidden md:block h-px bg-hotpink origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.12 + 0.3, type: "spring", stiffness: 300, damping: 20 }}
                  className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-hotpink/40 bg-charcoal font-mono text-xs text-hotpink"
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
                <h3 className="font-display text-xl font-semibold mt-4 capitalize">{p.step}</h3>
                <p className="text-sm text-gray-700/70 mt-2">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto mt-24 text-center"
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-charcoal text-white font-heading text-sm font-medium rounded-full px-7 py-4 hover:bg-hotpink transition-colors"
        >
          Start a conversation
        </Link>
      </motion.div>
    </div>
  );
}
