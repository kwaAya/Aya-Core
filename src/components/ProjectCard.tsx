import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/projects";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative h-[21rem] [perspective:1200px]"
    >
      <button
        onClick={() => setFlipped((f) => !f)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f);
        }}
        aria-pressed={flipped}
        aria-label={`Flip card to ${flipped ? "hide" : "show"} details for ${project.name}`}
        className="group h-full w-full text-left"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          animate={{
            rotateY: flipped ? 180 : 0,
            y: hovered || flipped ? -8 : 0,
            scale: hovered || flipped ? 1.015 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className={`absolute inset-0 flex h-full flex-col justify-between rounded-[1.5rem] border p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-all duration-300 [backface-visibility:hidden] ${
              hovered || flipped
                ? "border-hotpink/50 shadow-[0_20px_50px_rgba(248,18,149,0.16)]"
                : "border-white/10"
            } bg-[linear-gradient(180deg,rgba(20,20,22,0.98),rgba(12,12,14,1))]`}
          >
            <div>
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-hotpink">
                  // {String(index + 1).padStart(2, "0")} · {project.category}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.02] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/50">
                  live
                </span>
              </div>

              <div className="logo-chip mb-3 h-10 w-10 rounded-xl">
                <img src={`/brand/logos/${project.slug}.png`} alt="" aria-hidden="true" />
              </div>

              <h3 className="font-display text-2xl font-semibold text-white">{project.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{project.tagline}</p>
            </div>

            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.stack.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/50"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">case study</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          </div>

          <div
            className={`absolute inset-0 flex h-full flex-col justify-between rounded-[1.5rem] border p-5 text-white [backface-visibility:hidden] [transform:rotateY(180deg)] ${
              hovered || flipped
                ? "border-hotpink/50 shadow-[0_0_40px_rgba(248,18,149,0.16)]"
                : "border-hotpink/20"
            } bg-[radial-gradient(circle_at_top,_rgba(248,18,149,0.18),_transparent_28%),_linear-gradient(180deg,rgba(18,18,20,1),rgba(9,9,11,1))]`}
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-hotpink">{project.category}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-white">{project.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{project.description}</p>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">selected work</span>
              <Link
                to={`/work/${project.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-hotpink-glow hover:text-white"
              >
                details <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}
