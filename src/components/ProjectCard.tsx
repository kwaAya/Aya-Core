import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/projects";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative h-80 [perspective:1200px]"
    >
      <button
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f);
        }}
        aria-pressed={flipped}
        aria-label={`Flip card to ${flipped ? "hide" : "show"} details for ${project.name}`}
        className="w-full h-full text-left"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="relative w-full h-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-2xl bg-charcoal border border-blush-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow [backface-visibility:hidden]"
          >
            <div>
              <span className="font-mono text-xs text-hotpink">
                // {String(index + 1).padStart(2, "0")} · {project.category}
              </span>
              <h3 className="font-display text-2xl font-semibold mt-2">{project.name}</h3>
              <p className="text-sm text-gray-700/70 mt-2">{project.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.slice(0, 3).map((s) => (
                <span key={s} className="font-mono text-[11px] bg-blush/30 text-gray-700 rounded-full px-2.5 py-1">
                  {s}
                </span>
              ))}
            </div>
            <span className="font-mono text-[11px] text-gray-400 uppercase tracking-wide">
              click to flip
            </span>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl bg-charcoal text-white p-6 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            <div>
              <h3 className="font-display text-xl font-semibold text-hotpink-glow">{project.name}</h3>
              <p className="text-sm text-white/70 mt-2 line-clamp-4">{project.description}</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {project.metrics.slice(0, 3).map((m) => (
                <div key={m.label}>
                  <p className="font-display text-lg font-semibold">{m.value}</p>
                  <p className="font-mono text-[10px] text-white/50 uppercase">{m.label}</p>
                </div>
              ))}
            </div>
            <Link
              to={`/work/${project.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 font-mono text-xs text-hotpink-glow hover:underline"
            >
              full case study <ArrowUpRight size={14} />
            </Link>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}
