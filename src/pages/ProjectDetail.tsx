import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import SectionTag from "../components/SectionTag";
import RevealText from "../components/RevealText";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const index = projects.findIndex((p) => p.slug === slug);

  if (!project) return <Navigate to="/work" replace />;

  const next = projects[(index + 1) % projects.length];

  return (
    <div className="pt-40 pb-28 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/work"
          className="flex items-center gap-2 font-mono text-xs text-gray-700/60 hover:text-hotpink transition-colors mb-10 w-fit"
        >
          <ArrowLeft size={14} /> all projects
        </Link>

        <SectionTag>{`${project.category} · case study`}</SectionTag>
        <RevealText
          as="h1"
          text={project.name}
          className="font-display text-4xl md:text-6xl font-semibold mt-6"
        />
        <p className="mt-4 text-lg text-gray-700/70">{project.tagline}</p>

        {/* generative hero panel — no photo yet, so this fills the space on
            purpose instead of leaving an empty placeholder box */}
        <ProjectHeroPanel project={project} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid sm:grid-cols-3 gap-6 mt-12"
        >
          {project.metrics.map((m) => (
            <div key={m.label} className="border border-blush-100 rounded-xl p-5">
              <p className="font-display text-3xl font-semibold">{m.value}</p>
              <p className="font-mono text-[11px] text-gray-700/60 uppercase mt-1">{m.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="mt-14 space-y-6 text-gray-700/80 leading-relaxed">
          <div>
            <h2 className="font-heading text-sm uppercase tracking-wide text-hotpink mb-2">
              The story
            </h2>
            <p>{project.story}</p>
          </div>
          <div>
            <h2 className="font-heading text-sm uppercase tracking-wide text-hotpink mb-2">
              What it does
            </h2>
            <p>{project.description}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-xs bg-blush/30 text-gray-700 rounded-full px-3 py-1.5"
            >
              {s}
            </span>
          ))}
        </div>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2 bg-charcoal text-white font-heading text-sm rounded-full px-6 py-3.5 hover:bg-hotpink transition-colors"
          >
            View live project <ArrowUpRight size={16} />
          </a>
        )}

        <div className="mt-24 pt-10 border-t border-blush-100 flex items-center justify-between">
          <span className="font-mono text-xs text-gray-700/50">next case study</span>
          <Link
            to={`/work/${next.slug}`}
            className="font-display text-xl font-semibold hover:text-hotpink transition-colors"
          >
            {next.name} →
          </Link>
        </div>
      </div>
    </div>
  );
}

const CATEGORY_THEME: Record<string, { from: string; to: string; dark?: boolean }> = {
  Tourism: { from: "#0A0A0A", to: "#5c0033", dark: true },
  Aggregator: { from: "#0A0A0A", to: "#2a2a2e", dark: true },
  Healthcare: { from: "#0A0A0A", to: "#132226", dark: true },
  Gaming: { from: "#0A0A0A", to: "#3a1626", dark: true },
};

/**
 * Fills the "hero image" slot with something purposeful instead of a
 * placeholder box: an oversized initial letter (the same watermark
 * technique used on the homepage) tinted per project category, plus a
 * live-looking status line pulled from real project data.
 */
function ProjectHeroPanel({ project }: { project: (typeof import("../data/projects").projects)[number] }) {
  const theme = CATEGORY_THEME[project.category] ?? CATEGORY_THEME.Tourism;
  const initial = project.name.charAt(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative mt-10 aspect-video rounded-2xl border border-blush-100 overflow-hidden flex items-end p-6"
      style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none select-none absolute -right-6 -top-10 font-display font-semibold text-[16rem] leading-none ${
          theme.dark ? "text-white/10" : "text-ink/10"
        }`}
      >
        {initial}
      </span>

      <div
        className={`relative inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide backdrop-blur-sm ${
          theme.dark
            ? "border-white/20 bg-black/30 text-white/80"
            : "border-white/40 bg-white/50 text-gray-700"
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-hotpink animate-pulse" />
        status --project {project.slug} · {project.metrics[0].value}
      </div>
    </motion.div>
  );
}
