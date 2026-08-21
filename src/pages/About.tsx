import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RevealText from "../components/RevealText";
import SectionTag from "../components/SectionTag";
import { Code2, Palette, TrendingUp, Users } from "lucide-react";

const DISCIPLINES = [
  { title: "Full-stack engineering", body: "Backend, frontend, database and integrations — end-to-end delivery.", icon: Code2 },
  { title: "UI / UX design", body: "Interfaces designed with intent — hierarchy, motion, and craft.", icon: Palette },
  { title: "Business strategy", body: "Products that serve real outcomes, not vanity metrics.", icon: TrendingUp },
  { title: "Community focus", body: "Grounded in South African context, culture and real users.", icon: Users },
];

const PHILOSOPHY = [
  { n: "01", title: "Feeling in, structure out", body: "The things I care about get the architecture. That's the whole method." },
  { n: "02", title: "Balanced maximalism", body: "More going on, never more going wrong. Rich, not cluttered." },
];

const TECH_STACK = [
  { title: "Ship with daily", items: ["PHP", "MySQL", "JavaScript", "CSS", "HTML5", "React"] },
  { title: "Shipped in production", items: ["Yoco payments", "OTP auth", "POPIA-shaped data modelling", "SEO architecture", "Canvas rendering & game loops"] },
  { title: "Currently learning", items: ["Three.js", "Node", "TypeScript", "C#"] },
];

// Kept tight on purpose — low-effort to scan beats a Spotify Wrapped dump.
const SOUND = [
  "Steve Lacy", "DJ Kent", "Frank Ocean", "Black Coffee", "AKA", "KAYTRANADA", "Kelvin Momo!", "Gqom (very important)",
];
const FANDOM = ["Iron Man / MCU", "Shuri / T'Challa", "Peter Parker", "Sci-Fi", "Black Panther", "Trevor Noah!!", "PC Gaming", "Marvel Lore"];
const CULTURE = ["Liverpool FC", "Chrome & Metallic Everything", "A Patriot", "House Music", "South African Twitter / Lore", "Being a Hater Professionally", "Podcasts", "Moodboard Curation"];
const CURRENT_INTERESTS = ["Anime", "Manga", "Claude 🫦", "Graphic Designing", "Messing around with AI", "Hot Pink", "Literally Anything Cool 🌟", "Chrome"];
const PAST_INTERESTS = ["Trading (Crypto & Forex)", "SketchUp", "Dropshipping (it failed *sigh)"];
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
                  <dd className="text-right whitespace-nowrap">4 platforms shipped to production</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 shrink-0">stack</dt>
                  <dd className="text-right whitespace-nowrap">php · mysql · javascript · react</dd>
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
                    <img src="/About/about-photo-baby.jpg" alt="Aya as a baby" className="aspect-[4/3] w-full object-cover" loading="lazy" decoding="async" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SectionTag>how this started</SectionTag>
          <p className="mt-4 text-gray-700/80 leading-relaxed">
            My uncle handed me <Link to="/work/kokstad-tourism" className="text-hotpink hover:underline">Kokstad Tourism</Link> half-finished as a test — see
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
        </motion.div>
      </div>

      <div className="mx-auto mt-24 max-w-5xl">
        <SectionTag>the stack</SectionTag>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {TECH_STACK.map((group) => (
            <div key={group.title} className="border border-white/10 bg-charcoal p-6">
              <h3 className="font-display text-xl font-semibold">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-xs text-gray-300">{item}</span>
                ))}
              </div>
              {group.title === "Currently learning" && <Link to="/lab" className="mt-5 inline-block font-mono text-xs uppercase tracking-wide text-hotpink hover:underline">see the lab →</Link>}
            </div>
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

      <div className="max-w-5xl mx-auto mt-16 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative">
          {PHILOSOPHY.map((p) => (
            <div key={p.n} className="group">
              <div className="relative w-9 h-9">
                <span aria-hidden="true" className="absolute inset-0 rounded-full border border-hotpink/30" />
                <span className="relative z-10 flex h-full w-full items-center justify-center font-mono text-xs text-gray-400">{p.n}</span>
              </div>
              <h3 className="font-display text-xl font-semibold mt-4">{p.title}</h3>
              <p className="text-sm text-gray-700/70 mt-2">{p.body}</p>
            </div>
          ))}
        </div>
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
              <figure>
                <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-hotpink shadow-2xl">
                <img src="/About/about-photo-texture.jpg" alt="Portrait of Aya" className="aspect-square w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
                <figcaption className="text-center md:text-left text-xs font-mono text-gray-400 mt-3">
                  this one's giving Steve Lacy's album cover, on some, oh yeah? lmaoo
                </figcaption>
              </figure>
            </div>

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
              <div key={group.label} className="mt-6">
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

    </div>
  );
}
