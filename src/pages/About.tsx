import { motion } from "framer-motion";
import RevealText from "../components/RevealText";
import SectionTag from "../components/SectionTag";
import { Code2, Palette, TrendingUp, Users } from "lucide-react";

const DISCIPLINES = [
  { title: "Full-stack engineering", body: "Backend, frontend, database and integrations — end-to-end delivery.", icon: Code2 },
  { title: "UI / UX design", body: "Interfaces designed with intent — hierarchy, motion, and craft.", icon: Palette },
  { title: "Business strategy", body: "Products that serve real outcomes, not vanity metrics.", icon: TrendingUp },
  { title: "Community focus", body: "Grounded in South African context, culture and real users.", icon: Users },
];

const CORE_VALUES = ["Intentionality", "Craftsmanship", "Systems thinking", "Community impact", "Cultural authenticity", "Balanced maximalism"];

const PHILOSOPHY = [
  { n: "01", title: "Feeling in, structure out", body: "The things I care about get the architecture. That's the whole method." },
  { n: "02", title: "Balanced maximalism", body: "More going on, never more going wrong. Rich, not cluttered." },
  { n: "03", title: "Systems thinking", body: "Zoom out. Every screen is a node in a larger graph." },
  { n: "04", title: "Cultural authenticity", body: "Grounded in South African context, not generic templates." },
];

// Kept tight on purpose — low-effort to scan beats a Spotify Wrapped dump.
const SOUND = [
  "Steve Lacy", "DJ Kent", "Frank Ocean", "Tyler, The Creator", "Black Coffee", "AKA", "Lil Nas X", "Bucie", "Daniel Caesar",
  "Kendrick Lamar", "SAILORR", "Drake", "Dominic Fike", "KAYTRANADA", "Heavy-K", "Ye", "The Weekend", "Sykes", "Kelvin Momo!", "Gqom (very important)",
  "Deep House", "Amapiano", "Afro House", "Alt-R&B", "Neo-Soul", "Indie", "Amapiano", "3-Step Groove"
];
const FANDOM = ["Iron Man / MCU", "Falling in luhh :)", "Shuri / T'Challa", "Peter Parker", "Sci-Fi", "Black Panther", "Trevor Noah!!", "PC Gaming (Steam / Roblox)", "Marvel Lore", "What Now? & BWSS (Podcasts)", "Superhero Edits"];
const CULTURE = ["Liverpool FC", "Moodboard Curation", "Chrome & Metallic Everything", "A Patriot", "House Music", "South African Twitter / Lore", "Being a Hater Professionally", "Podcasts "];
const CURRENT_INTERESTS = ["Anime", "Manga", "Claude 🫦", "Graphic Designing", "Messing around with AI", "Hot Pink", "Literally Anything Cool 🌟"];
const PAST_INTERESTS = ["Trading (Crypto & Forex)", "SketchUp (3D Modeling / Interior Design)", "Dropshipping (it failed *sigh)"];
const ANCHOR_TAGS = ["DJ Kent", "Iron Man / MCU", "Liverpool FC", "AKA", "Sci-Fi", "Alt-R&B", "Kelvin Momo!", "3-Step Groove", "Deep House"];

const PHOTOS: { src: string; area: string; position?: string }[] = [
  { src: "about-photo-3.jpg", area: "p1" }, // large anchor tile — elevator shot
  { src: "about-photo-2.jpg", area: "p2" }, // b&w closeup, now the smaller tile
  { src: "about-photo-8.jpg", area: "p3" },
  { src: "about-photo-7.jpg", area: "p4" },
  { src: "about-photo-6.jpg", area: "p5", position: "50% 15%" }, // wide bottom tile — crop pushed up off the chin/shirt
];

export default function About() {
  return (
    <div className="relative overflow-hidden pt-40 pb-28 px-6 md:px-10">
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
              Unako "Aya" Mtumtum — second-year Computer Networking student at CUT, South Africa.
            </p>
          </div>
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-2xl border border-white/10 bg-charcoal/60 p-6 sm:p-7 font-mono text-xs backdrop-blur-sm overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 opacity-40"
                style={{ background: "radial-gradient(circle at 30% 20%, rgba(248,18,149,0.18), transparent 60%)" }}
              />
              <span aria-hidden="true" className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/20" />
              <span aria-hidden="true" className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/20" />
              <span aria-hidden="true" className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/20" />
              <span aria-hidden="true" className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/20" />

              <div className="flex items-center gap-2 text-gray-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hotpink opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-hotpink" />
                </span>
                aya.core // status: online
              </div>

              <dl className="mt-5 space-y-3.5 text-gray-300/80">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 shrink-0">role</dt>
                  <dd className="text-right whitespace-nowrap">developer · full-stack</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 shrink-0">based</dt>
                  <dd className="text-right whitespace-nowrap">bfn, south africa</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 shrink-0">shipped</dt>
                  <dd className="text-right whitespace-nowrap">5 platforms shipped to production</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 shrink-0">stack</dt>
                  <dd className="text-right whitespace-nowrap">react · node · sql</dd>
                </div>
              </dl>

              <div className="mt-5 pt-4 border-t border-white/10 text-gray-500">
                $ whoami<br />
                <span className="text-gray-300/80">→ builds systems, not just screens</span>
              </div>
            </motion.div>
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
                    <img src="/About/about-photo-baby.jpg" alt="Aya as a baby" className="w-full object-cover" loading="lazy" decoding="async" />
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
          <p className="mt-4 text-sm leading-relaxed text-gray-700/60">
            Most of this work was built with Route 56 Adventures, a South African tourism venture founded by my uncle in 2026. I'm the developer on it.
          </p>
        </motion.div>
      </div>

      {/* Disciplines */}
      <div className="max-w-5xl mx-auto mt-24">
        <SectionTag>what i bring</SectionTag>
        <div className="grid sm:grid-cols-2 gap-6 mt-10">
          {DISCIPLINES.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="group relative border border-blush-100 rounded-2xl p-6 bg-charcoal overflow-hidden hover:border-hotpink/40 hover:shadow-lg transition-[box-shadow,border-color]"
              >
                <div
                  aria-hidden="true"
                  className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(circle, rgba(248,18,149,0.35), transparent 70%)" }}
                />
                <div className="relative flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-hotpink/30 text-hotpink group-hover:border-hotpink group-hover:bg-hotpink/10 transition-colors">
                    <Icon size={18} />
                  </span>
                  <span className="font-mono text-xs text-gray-400">0{i + 1}</span>
                </div>
                <h3 className="relative font-display text-xl font-semibold mt-5">{d.title}</h3>
                <p className="relative mt-2 text-sm text-gray-700/70">{d.body}</p>
              </motion.div>
            );
          })}
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

        <div           className="mt-14 grid md:grid-cols-[1fr_1.3fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6 }}
            className="grid gap-4 h-[460px] sm:h-[560px]"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(3, 1fr)",
              gridTemplateAreas: `"p1 p1 p2" "p1 p1 p3" "p4 p5 p5"`,
            }}
          >
            {PHOTOS.map((p) => (
              <div key={p.src} className="photo-blend overflow-hidden" style={{ gridArea: p.area }}>
                <img
                  src={`/About/${p.src}`}
                  alt="Candid photo of Aya"
                  className="w-full h-full object-cover"
                  style={p.position ? { objectPosition: p.position } : undefined}
                  loading="lazy"
                  decoding="async"
                />
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
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-full border border-hotpink/25"
                style={{ animation: "core-orbit-spin 10s linear infinite" }}
              >
                <span className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-hotpink shadow-[0_0_8px_rgba(248,18,149,0.9)]" />
              </div>
              <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-hotpink shadow-2xl">
                <img src="/About/about-photo-texture.jpg" alt="Portrait of Aya" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
            </div>
            <p className="text-center md:text-left text-xs font-mono text-gray-400 mt-3">
              this one's giving Steve Lacy's album cover, on some, oh yeah? lmaoo
            </p>

            <p className="text-gray-700/70 leading-relaxed mt-8">
              Outside the build queue: deep house on loop, whatever Marvel's
              dropped most recently, and a permanent soft spot for anything
              chrome.
            </p>
            {[
              { label: "sound", tags: SOUND },
              { label: "fandom", tags: FANDOM },
              { label: "culture", tags: CULTURE },
            ].map((group, gi) => (
              <div key={group.label} className="mt-6 first:mt-0">
                <p className="text-[11px] font-body font-normal tracking-wide text-gray-400/60 italic">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {group.tags.map((tag, i) => (
                    <motion.span
                      key={`${tag}-${i}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: gi * 0.1 + i * 0.03 }}
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
              </div>
            ))}

            <div className="mt-6">
              <p className="text-[11px] font-body font-normal tracking-wide text-gray-400/60 italic">
                currently into
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {CURRENT_INTERESTS.map((tag) => (
                  <span key={tag} className="font-mono text-xs rounded-full px-3.5 py-1.5 border border-white/15 text-gray-700/80">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="text-[11px] font-body font-normal tracking-wide text-gray-400/60 italic">
                used to be into
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {PAST_INTERESTS.map((tag) => (
                  <span key={tag} className="font-mono text-xs rounded-full px-3.5 py-1.5 border border-white/15 text-gray-700/80">
                    {tag}
                  </span>
                ))}
              </div>
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

      <div className="max-w-5xl mx-auto mt-16 relative">
        <motion.div
          aria-hidden="true"
          className="absolute left-0 right-0 top-[18px] hidden md:block h-px bg-gradient-to-r from-transparent via-hotpink/40 to-transparent origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
          {PHILOSOPHY.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="relative w-9 h-9">
                {/* Node pulse — marks where this card meets the connecting
                    line above, echoing "the rest is orbit" a little more
                    literally. */}
                <motion.span
                  aria-hidden="true"
                  className="absolute -top-[26px] left-1/2 -translate-x-1/2 hidden md:block w-1.5 h-1.5 rounded-full bg-hotpink"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 + 0.3 }}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-hotpink/30 group-hover:border-hotpink/70 transition-colors duration-300"
                  style={{ animation: "core-orbit-spin 12s linear infinite" }}
                />
                <span className="relative z-10 flex h-full w-full items-center justify-center font-mono text-xs text-gray-400 group-hover:text-hotpink transition-colors">
                  {p.n}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold mt-4">{p.title}</h3>
              <p className="text-sm text-gray-700/70 mt-2">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
