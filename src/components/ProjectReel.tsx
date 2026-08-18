import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Same category → color family as ProjectDetail's CATEGORY_THEME, just as a
// luminous glow here instead of a flat panel background.
const CATEGORY_GLOW: Record<string, string> = {
  Tourism: "rgba(248,18,149,0.22)",
  Aggregator: "rgba(200,200,205,0.22)",
  Healthcare: "rgba(45,170,180,0.22)",
  Gaming: "rgba(220,60,140,0.24)",
};

function BrowserFrame({
  project,
  className = "",
}: {
  project: (typeof projects)[number];
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-white/10 bg-charcoal overflow-hidden shadow-2xl ${className}`}>
      <div className="flex items-center gap-3 px-3 py-2.5 bg-black/40 border-b border-white/10">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
        </div>
        <span className="font-mono text-[10px] text-white/40 truncate">
          {project.liveUrl.replace(/^https?:\/\//, "")}
        </span>
      </div>
      {/* images live at /projects/{slug}.jpg — see note below */}
      <img
        src={`/projects/${project.slug}.jpg`}
        alt={`${project.name} — live site`}
        className="w-full aspect-video object-cover object-top"
        loading="lazy"
      />
    </div>
  );
}

function ProjectMeta({ project }: { project: (typeof projects)[number] }) {
  return (
    <>
      <span className="font-mono text-xs text-gray-400 uppercase tracking-wide">
        {project.category}
      </span>
      <h3 className="font-display text-3xl lg:text-4xl font-semibold mt-3">{project.name}</h3>
      <p className="text-gray-700/70 mt-3 max-w-md leading-relaxed">{project.tagline}</p>
      <div className="flex flex-wrap gap-2 mt-6">
        {project.stack.map((s) => (
          <span
            key={s}
            className="font-mono text-[11px] bg-blush/20 border border-blush-100 text-gray-700 rounded-full px-3 py-1.5"
          >
            {s}
          </span>
        ))}
      </div>
      <Link
        to={`/work/${project.slug}`}
        className="inline-flex items-center gap-2 mt-8 font-mono text-sm text-hotpink hover:text-hotpink-glow transition-colors w-fit"
      >
        full case study <ArrowUpRight size={15} />
      </Link>
    </>
  );
}

/**
 * Replaces the old flip-card grid: a pinned, scroll-scrubbed sequence
 * that gives each project its own full moment instead of competing for
 * space in a grid. Desktop only — mobile gets a simple stacked list,
 * since scroll-jacking on touch scroll tends to fight the user rather
 * than help them.
 */
export default function ProjectReel() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const count = projects.length;

  useGSAP(
    () => {
      if (window.matchMedia("(max-width: 767px)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top 96px",
        end: "+=3600",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const i = Math.min(count - 1, Math.floor(self.progress * count));
          setStage(i);
        },
      });
    },
    { scope: pinRef }
  );

  return (
    <>
      {/* Desktop: pinned scroll reel */}
      <div
        ref={pinRef}
        className="hidden md:grid relative grid-cols-2 gap-14 items-center h-[calc(100vh-6rem)]"
      >
        <div className="absolute -top-4 left-0 flex items-center gap-3 font-mono text-xs text-gray-400">
          <span className="text-hotpink">{String(stage + 1).padStart(2, "0")}</span>
          <span>/ {String(count).padStart(2, "0")}</span>
          <div className="flex gap-1.5 ml-2" aria-hidden="true">
            {projects.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === stage ? "w-6 bg-hotpink" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative h-full">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              className={`absolute inset-0 flex flex-col justify-center ${stage === i ? "" : "pointer-events-none"}`}
              animate={{ opacity: stage === i ? 1 : 0, y: stage === i ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              aria-hidden={stage !== i}
            >
              <ProjectMeta project={p} />
            </motion.div>
          ))}
        </div>

        <div className="relative aspect-video">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              className={`absolute inset-0 ${stage === i ? "" : "pointer-events-none"}`}
              animate={{ opacity: stage === i ? 1 : 0, scale: stage === i ? 1 : 0.96 }}
              transition={{ duration: 0.5 }}
              aria-hidden={stage !== i}
            >
              <div
                className="absolute -inset-8 rounded-full blur-3xl -z-10 opacity-70"
                style={{ background: `radial-gradient(circle, ${CATEGORY_GLOW[p.category] ?? CATEGORY_GLOW.Tourism}, transparent 70%)` }}
                aria-hidden="true"
              />
              <BrowserFrame project={p} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: simple stacked list, no pinning */}
      <div className="md:hidden space-y-16">
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-xs text-hotpink">
              {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <BrowserFrame project={p} className="mt-3" />
            <ProjectMeta project={p} />
          </motion.div>
        ))}
      </div>
    </>
  );
}