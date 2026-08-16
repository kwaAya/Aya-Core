import { motion } from "framer-motion";
import RevealText from "../components/RevealText";
import SectionTag from "../components/SectionTag";
import OrbitalScene from "../components/LazyOrbitalScene";

const DISCIPLINES = [
  { title: "Full-stack engineering", body: "Backend, frontend, database and integrations — end-to-end delivery." },
  { title: "UI / UX design", body: "Interfaces designed with intent — hierarchy, motion, and craft." },
  { title: "Business strategy", body: "Products that serve real outcomes, not vanity metrics." },
  { title: "Community focus", body: "Grounded in South African context, culture and real users." },
];

const CORE_VALUES = [
  "Intentionality",
  "Craftsmanship",
  "Systems thinking",
  "Community impact",
  "Cultural authenticity",
];

const PHILOSOPHY = [
  { n: "01", title: "Intentionality", body: "Every decision is deliberate. Nothing shipped by default." },
  { n: "02", title: "Craftsmanship", body: "Built with precision and care — from schema to spacing." },
  { n: "03", title: "Systems thinking", body: "Zoom out. Every screen is a node in a larger graph." },
  { n: "04", title: "Cultural authenticity", body: "Grounded in South African context, not generic templates." },
];

export default function About() {
  return (
    <div className="pt-40 pb-28 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <SectionTag>about</SectionTag>
        <RevealText
          as="h1"
          text="Systems thinking meets creative vision."
          className="font-display text-4xl md:text-6xl font-semibold mt-6 leading-tight max-w-3xl"
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 grid md:grid-cols-[1.3fr_1fr] gap-10 items-center"
        >
          <div className="space-y-5 text-gray-700/80 leading-relaxed text-lg">
            <p>
              I've been thinking in systems since primary school. That's not
              just how I code — it's how I approach every problem. I design
              full-stack digital platforms that are technically robust,
              visually intentional, and culturally grounded.
            </p>
            <p className="font-heading font-medium text-ink">
              I don't build for corporations. I build for communities.
            </p>
            <p className="text-sm text-gray-700/60">
              Unako "Aya" Mtumtum — 19, second-year Computer Networking
              student at CUT, South Africa.
            </p>
          </div>
          <div className="flex justify-center">
            <OrbitalScene interactive={false} className="w-[260px] h-[260px]" />
          </div>
        </motion.div>
      </div>

      {/* Disciplines */}
      <div className="max-w-5xl mx-auto mt-24">
        <SectionTag>what i bring</SectionTag>
        <div className="grid sm:grid-cols-2 gap-6 mt-10">
          {DISCIPLINES.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="border border-blush-100 rounded-2xl p-6 bg-charcoal"
            >
              <h3 className="font-display text-xl font-semibold">{d.title}</h3>
              <p className="mt-2 text-sm text-gray-700/70">{d.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          {CORE_VALUES.map((v) => (
            <span
              key={v}
              className="font-mono text-xs bg-blush/30 text-gray-700 rounded-full px-3 py-1.5"
            >
              {v}
            </span>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div className="max-w-3xl mx-auto mt-28 text-center">
        <SectionTag>philosophy</SectionTag>
        <RevealText
          as="h2"
          text="The core is what everything else orbits."
          className="font-display text-3xl md:text-5xl font-medium leading-tight mt-6"
        />
        <p className="mt-6 text-gray-700/80 leading-relaxed">
          "Aya Core" is a triple meaning — career is core to who I am, systems
          thinking is core to how I work, and the core is the foundational,
          essential nature of the product. The rest is orbit.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8 mt-16">
        {PHILOSOPHY.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <span className="font-mono text-xs text-gray-400">{p.n}</span>
            <h3 className="font-display text-xl font-semibold mt-2">{p.title}</h3>
            <p className="text-sm text-gray-700/70 mt-2">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
