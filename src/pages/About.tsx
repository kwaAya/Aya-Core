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

const CORE_VALUES = ["Intentionality", "Craftsmanship", "Systems thinking", "Community impact", "Cultural authenticity", "Balanced maximalism"];

const PHILOSOPHY = [
  { n: "01", title: "Feeling in, structure out", body: "The things I care about get the architecture. That's the whole method." },
  { n: "02", title: "Balanced maximalism", body: "More going on, never more going wrong. Rich, not cluttered." },
  { n: "03", title: "Systems thinking", body: "Zoom out. Every screen is a node in a larger graph." },
  { n: "04", title: "Cultural authenticity", body: "Grounded in South African context, not generic templates." },
];

// Kept tight on purpose — low-effort to scan beats a Spotify Wrapped dump.
const INTERESTS = [
  "Steve Lacy", "DJ Kent", "Frank Ocean", "Tyler, The Creator", "Black Coffee", "AKA", "Kendrick Lamar", "SAILORR", "Drake", "Dominic Fike", "KAYTRANADA",
  "Deep House", "Amapiano", "Afro House", "Alt-R&B", "Neo-Soul", "Indie",
  "Iron Man / MCU", "Liverpool FC", "Moodboard Curation", "Shuri / T'Challa", "Peter Parker", "PC Gaming (Steam / Roblox)", "Sci-Fi", "Chrome & Metallic Everything", "A Patriot",
  "Recent Interests / Obsessions: Anime, Manga, a bit of Graphic Designing", 
  "Past Interests: Trading (Crypto and Forex), SketchUp (3D Modeling / Interior Design)"
];
const ANCHOR_TAGS = ["DJ Kent", "Iron Man / MCU", "Liverpool FC", "AKA", "Sci-Fi"];

const PHOTOS = [
  { src: "about-photo-1.jpg", rotate: "-rotate-2" },
  { src: "about-photo-4.jpg", rotate: "rotate-2" },
  { src: "about-photo-2.jpg", rotate: "rotate-3" },
  { src: "about-photo-3.jpg", rotate: "-rotate-3" },
  { src: "about-photo-5.jpg", rotate: "rotate-6" },
  { src: "about-photo-7.jpg", rotate: "-rotate-2" },
  { src: "about-photo-6.jpg", rotate: "rotate-3" },
];

export default function About() {
  return (
    <div className="pt-40 pb-28 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <SectionTag>about</SectionTag>
        <RevealText
          as="h1"
          text="Self-taught. Systems-minded. Building on purpose."
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
              No bootcamp, no computer science degree behind this — just a
              habit of thinking in systems since forever, and a
              refusal to ship something I don't understand end to end. I
              design full-stack digital platforms that are technically
              robust, visually intentional, and culturally grounded.
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

      {/* Origin */}
      <div className="max-w-5xl mx-auto mt-24 grid md:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-1 max-w-[280px] mx-auto md:mx-0"
        >
          <img src="/about/about-photo-baby.jpg" alt="" className="w-full object-cover" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SectionTag>how this started</SectionTag>
          <p className="mt-4 text-gray-700/80 leading-relaxed">
            My uncle handed me a half-finished tourism site as a test — see
            if you can finish it. I didn't just finish it. I gave it a
            visual identity and a brand system it didn't have before. That's
            been the pattern since: hand me the thing that's broken or
            unfinished, get back more structure than you asked for.
          </p>
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

        <div className="mt-14 grid md:grid-cols-[1.2fr_1fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6 }}
            className="columns-2 sm:columns-3 gap-4 [&>*]:mb-4 [&>*]:break-inside-avoid"
          >
            {PHOTOS.map((p) => (
              <div
                key={p.src}
                className={`rounded-2xl overflow-hidden border border-white/10 shadow-2xl ${p.rotate}`}
              >
                <img src={`/about/${p.src}`} alt="" className="w-full object-cover" loading="lazy" />
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative w-40 h-40 mx-auto md:mx-0">
              <div
                className="absolute -inset-6 rounded-full blur-2xl -z-10"
                style={{ background: "radial-gradient(circle, rgba(200,90,255,0.35), rgba(248,18,149,0.25), transparent 70%)" }}
                aria-hidden="true"
              />
              <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-hotpink shadow-2xl">
                <img src="/about/about-photo-texture.jpg" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
            <p className="text-center md:text-left text-xs font-mono text-gray-400 mt-3">
              this one's giving Steve Lacy album cover, on some real shit, lol
            </p>

            <p className="text-gray-700/70 leading-relaxed mt-8">
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
                      : tag === "Steve Lacy"
                      ? "bg-gradient-to-r from-[#c85aff]/20 to-hotpink/20 border-hotpink/40 text-white"
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
