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

const CORE_VALUES = ["Intentionality", "Craftsmanship", "Systems thinking", "Community impact", "Cultural authenticity"];

const PHILOSOPHY = [
  { n: "01", title: "Intentionality", body: "Every decision is deliberate. Nothing shipped by default." },
  { n: "02", title: "Craftsmanship", body: "Built with precision and care — from schema to spacing." },
  { n: "03", title: "Systems thinking", body: "Zoom out. Every screen is a node in a larger graph." },
  { n: "04", title: "Cultural authenticity", body: "Grounded in South African context, not generic templates." },
];

// Kept tight on purpose — low-effort to scan beats a Spotify Wrapped dump.
const INTERESTS = [
  "DJ Kent", "Steve Lacy", "Frank Ocean", "Tyler, The Creator", "Black Coffee", "Kendrick Lamar", "Shekhinah",
  "Deep House", "Amapiano", "Afro House", "Alt-R&B",
  "Iron Man / MCU", "Liverpool FC", "Moodboard Curation", "Chrome & Metallic Everything", "Matatiele Roots",
];
const ANCHOR_TAGS = ["DJ Kent", "Iron Man / MCU", "Liverpool FC"];

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
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="border border-blush-100 rounded-2xl p-6 bg-charcoal hover:border-hotpink/40 hover:shadow-lg transition-[box-shadow,border-color]"
            >
              <h3 className="font-display text-xl font-semibold">{d.title}</h3>
              <p className="mt-2 text-sm text-gray-700/70">{d.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 mt-8"
        >
          {CORE_VALUES.map((v) => (
            <span key={v} className="font-mono text-xs bg-blush/30 text-gray-700 rounded-full px-3 py-1.5">
              {v}
            </span>
          ))}
        </motion.div>
      </div>

      {/* The person behind the studio */}
      <div className="max-w-5xl mx-auto mt-28">
        <SectionTag>off duty</SectionTag>
        <RevealText
          as="h2"
          text="There's a person behind the studio."
          className="font-display text-3xl md:text-5xl font-medium leading-tight mt-6 max-w-2xl"
        />

        <div className="mt-14 grid md:grid-cols-[1fr_1.2fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6 }}
            className="relative h-[420px] sm:h-[480px]"
          >
            <div className="absolute left-0 top-4 w-[62%] rounded-2xl overflow-hidden border border-white/10 shadow-2xl -rotate-3">
              <img src="/about/about-photo-1.jpg" alt="" className="w-full aspect-[4/5] object-cover" />
            </div>
            <div className="absolute right-0 top-0 w-[48%] rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-2">
              <img src="/about/about-photo-2.jpg" alt="" className="w-full aspect-[4/5] object-cover" />
            </div>
            <div className="absolute left-[8%] bottom-0 w-[44%] rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-6">
              <img src="/about/about-photo-3.jpg" alt="" className="w-full aspect-[4/5] object-cover" />
            </div>
            <div className="absolute right-[6%] bottom-6 w-16 h-16 rounded-full overflow-hidden border-2 border-hotpink shadow-xl -rotate-6">
              <img src="/about/about-photo-texture.jpg" alt="" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-gray-700/70 leading-relaxed">
              Outside the build queue: deep house on loop, whatever Marvel's
              dropped most recently, and a permanent soft spot for anything
              chrome.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {INTERESTS.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.03 }}
                  className={`font-mono text-xs rounded-full px-3.5 py-1.5 border ${
                    ANCHOR_TAGS.includes(tag)
                      ? "bg-hotpink/20 border-hotpink/40 text-white"
                      : "border-white/15 text-gray-700/80"
                  }`}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
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
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-gray-700/80 leading-relaxed"
        >
          "Aya Core" is a triple meaning — career is core to who I am, systems
          thinking is core to how I work, and the core is the foundational,
          essential nature of the product. The rest is orbit.
        </motion.p>
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
