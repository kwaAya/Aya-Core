import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RevealText from "../components/RevealText";
import SectionTag from "../components/SectionTag";
import TerminalCard from "../components/TerminalCard";

const SERVICES = [
  {
    title: "Platform build",
    tag: "$ build --full-stack",
    body: "End-to-end design and development of the core product — from the first low-connectivity prototype to something a community runs on daily.",
    items: ["Product discovery in-context", "Full-stack build", "Deployment & handover"],
  },
  {
    title: "Rescue & rebuild",
    tag: "$ migrate --legacy",
    body: "A spreadsheet, a WhatsApp group, or an abandoned app that's outgrown itself. Aya rebuilds it without losing what already works.",
    items: ["Audit of existing workaround", "Incremental migration plan", "Zero-downtime cutover"],
  },
  {
    title: "Advisory & audit",
    tag: "$ review --architecture",
    body: "A second set of eyes on an in-progress build — architecture, UX, and whether the software is solving the right problem at all.",
    items: ["Technical + UX audit", "Prioritised fix list", "Ongoing advisory retainer"],
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
    <div className="pt-40 pb-28 px-6 md:px-10">
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
            className="border border-blush-100 rounded-2xl p-7 bg-charcoal flex flex-col hover:border-hotpink/40 hover:shadow-lg transition-all"
          >
            <span className="font-mono text-xs text-hotpink">{s.tag}</span>
            <h3 className="font-display text-2xl font-semibold mt-4">{s.title}</h3>
            <p className="text-sm text-gray-700/70 mt-3 flex-1">{s.body}</p>
            <ul className="mt-6 space-y-2">
              {s.items.map((it) => (
                <li key={it} className="text-sm text-gray-700/80 flex items-start gap-2">
                  <span className="text-hotpink mt-1">·</span> {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Process */}
      <div className="max-w-5xl mx-auto mt-28">
        <SectionTag>process</SectionTag>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {PROCESS.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="font-mono text-xs text-gray-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-semibold mt-2 capitalize">{p.step}</h3>
              <p className="text-sm text-gray-700/70 mt-2">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-24 text-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-charcoal text-white font-heading text-sm font-medium rounded-full px-7 py-4 hover:bg-hotpink transition-colors"
        >
          Start a conversation
        </Link>
      </div>
    </div>
  );
}
