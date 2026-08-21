import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";

// ⚠️ Replace these with your real slugs from data/projects.ts —
// picked for contrast: one visual/tourism site, one technical system.
const FEATURED_SLUGS = ["kokstad-tourism", "ngejane-dental"];

export default function FeaturedDuo() {
  const [active, setActive] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  // Real hover capability, not just screen width — a touch laptop with a
  // trackpad still gets hover; a wide phone in landscape still doesn't.
  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const featured = FEATURED_SLUGS
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean) as typeof projects;

  if (featured.length < 2) return null;

  return (
    <div className="flex h-[640px] flex-col gap-4 md:h-[560px] md:flex-row">
      {featured.map((project, i) => {
        const isActive = active === i;
        const isOther = active !== null && active !== i;

        return (
          <motion.div
            key={project.slug}
            onMouseEnter={() => !isTouch && setActive(i)}
            onMouseLeave={() => !isTouch && setActive(null)}
            onClick={() => isTouch && setActive(i)}
            animate={{ flex: isActive ? 2.4 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10"
          >
            {/* Background screenshot — always mounted, fades/scales in on hover */}
            <motion.img
              src={`/projects/${project.slug}.jpg`}
              alt=""
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.08,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover object-top"
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
            <div className="absolute inset-0 bg-charcoal" style={{ opacity: isActive ? 0 : 1, transition: "opacity 0.5s" }} />

            {/* Resting state — logo + name, centered */}
            <motion.div
              animate={{ opacity: isActive ? 0 : isOther ? 0.35 : 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
            >
              <div className="logo-chip h-16 w-16 rounded-2xl">
                <img src={`/brand/logos/${project.slug}.png`} alt={`${project.name} logo`} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">
                {project.category}
              </span>
              <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">
                {project.name}
              </h3>
              {isTouch && (
                <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-hotpink/70">
                  tap to view
                </span>
              )}
            </motion.div>

            {/* Active state — full detail, bottom-aligned */}
            <motion.div
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
              transition={{ duration: 0.4, delay: isActive ? 0.15 : 0 }}
              className="absolute inset-x-6 bottom-6 md:inset-x-10 md:bottom-10"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="logo-chip h-10 w-10 rounded-xl">
                  <img src={`/brand/logos/${project.slug}.png`} alt="" aria-hidden="true" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/60">
                  {project.category}
                </span>
              </div>
              <h3 className="font-display text-3xl font-semibold text-white md:text-4xl">
                {project.name}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                {project.tagline}
              </p>
              <Link
                to={`/work/${project.slug}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-hotpink px-5 py-2.5 font-mono text-sm text-white transition-colors hover:bg-hotpink-glow"
              >
                full case study <ArrowUpRight size={15} />
              </Link>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
