import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Same category → color family as ProjectDetail's CATEGORY_THEME.
const CATEGORY_GLOW: Record<string, string> = {
  Tourism: "rgba(248,18,149,0.28)",
  Aggregator: "rgba(200,200,205,0.28)",
  Healthcare: "rgba(45,170,180,0.28)",
  Gaming: "rgba(220,60,140,0.3)",
};

function ChapterPanel({ project, active }: { project: (typeof projects)[number]; active: boolean }) {
  return (
    <motion.div
      className={`absolute inset-x-6 bottom-6 md:inset-x-14 md:bottom-14 md:max-w-2xl ${active ? "" : "pointer-events-none"}`}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 28 }}
      transition={{ duration: 0.6 }}
      aria-hidden={!active}
    >
      <span className="font-mono text-xs text-white/60 uppercase tracking-wide">{project.category}</span>
      <h3 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-white mt-2 leading-[0.95]">
        {project.name}
      </h3>
      <p className="text-white/70 mt-4 max-w-md leading-relaxed">{project.tagline}</p>
      <div className="flex flex-wrap gap-2 mt-5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="font-mono text-[11px] bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full px-3 py-1.5"
          >
            {s}
          </span>
        ))}
      </div>
      <Link
        to={`/work/${project.slug}`}
        className="inline-flex items-center gap-2 mt-6 font-mono text-sm text-white bg-hotpink/90 hover:bg-hotpink rounded-full px-5 py-2.5 transition-colors w-fit"
      >
        full case study <ArrowUpRight size={15} />
      </Link>
    </motion.div>
  );
}

function ChapterImage({ project, active }: { project: (typeof projects)[number]; active: boolean }) {
  return (
    <motion.div
      className={`absolute inset-0 ${active ? "" : "pointer-events-none"}`}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 1.06 }}
      transition={{ duration: 0.7 }}
      aria-hidden={!active}
    >
      <img
        src={`/projects/${project.slug}.jpg`}
        alt={`${project.name} — live site`}
        className="w-full h-full object-cover object-top"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
      <div
        className="absolute inset-0 opacity-25 mix-blend-overlay"
        style={{ background: `radial-gradient(circle at 15% 85%, ${CATEGORY_GLOW[project.category] ?? CATEGORY_GLOW.Tourism}, transparent 60%)` }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

/**
 * Full-bleed, pinned scroll-scrubbed sequence. Each project takes over the
 * entire frame — no browser-chrome box this time, the screenshot IS the
 * background, text floats over it. Desktop only; mobile gets a simpler
 * stacked version of the same full-bleed-card idea, no pinning.
 */
export default function ProjectReel() {
  const pinRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [stage, setStage] = useState(0);
  const reelProjects = projects.filter((project) => project.slug !== "digital-break");
  const count = reelProjects.length;

  useGSAP(
    () => {
      if (window.matchMedia("(max-width: 767px)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const st = ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top 96px",
        end: "+=3800",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const i = Math.min(count - 1, Math.floor(self.progress * count));
          setStage(i);
        },
      });
      stRef.current = st;
    },
    { scope: pinRef }
  );

  function goToProject(i: number) {
    const st = stRef.current;
    if (!st) return;
    const mid = (i + 0.5) / count;
    window.scrollTo({ top: st.start + (st.end - st.start) * mid, behavior: "smooth" });
  }

  return (
    <>
      {/* Desktop: full-bleed pinned reel */}
      <div
        ref={pinRef}
        className="hidden md:block relative h-[calc(100vh-6rem)] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
      >
        {reelProjects.map((p, i) => (
          <ChapterImage key={p.slug} project={p} active={stage === i} />
        ))}
        {reelProjects.map((p, i) => (
          <ChapterPanel key={p.slug} project={p} active={stage === i} />
        ))}

        <div className="absolute top-6 left-8 z-10 flex items-center gap-3 font-mono text-xs text-white/80 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
          <span className="text-hotpink">{String(stage + 1).padStart(2, "0")}</span>
          <span>/ {String(count).padStart(2, "0")}</span>
          <div className="flex gap-1.5 ml-1">
            {reelProjects.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => goToProject(i)}
                aria-label={`Jump to ${p.name}`}
                aria-current={i === stage ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === stage ? "w-6 bg-hotpink" : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: stacked full-bleed cards, no pinning */}
      <div className="md:hidden space-y-8">
        {reelProjects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5 }}
            className="relative h-[70vh] rounded-2xl overflow-hidden border border-white/10 shadow-xl"
          >
            <img
              src={`/projects/${p.slug}.jpg`}
              alt={`${p.name} — live site`}
              className="w-full h-full object-cover object-top"
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
            <div className="absolute inset-x-5 bottom-5">
              <span className="font-mono text-[11px] text-white/60">
                {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")} · {p.category}
              </span>
              <h3 className="font-display text-3xl font-semibold text-white mt-1">{p.name}</h3>
              <p className="text-sm text-white/70 mt-2">{p.tagline}</p>
              <Link
                to={`/work/${p.slug}`}
                className="inline-flex items-center gap-2 mt-4 font-mono text-sm text-white bg-hotpink/90 rounded-full px-4 py-2"
              >
                full case study <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}