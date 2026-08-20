import { useState, useEffect } from "react";
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
  const value = project.metrics.find((m) => m.label === "Value")?.value;
  const heroImage = { src: `/projects/${project.slug}.jpg`, alt: `${project.name} — live site` };
  const detailImages = [2, 3, 4].map((n) => ({
    src: `/projects/${project.slug}-${n}.jpg`,
    alt: `${project.name} — detail ${n - 1}`,
  }));
  const lightboxImages = [heroImage, ...detailImages];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden pt-40 pb-28 px-6 md:px-10">
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-6 left-1/2 -z-10 -translate-x-1/2 whitespace-nowrap font-display text-[22vw] font-semibold uppercase leading-none text-ink/[0.03] md:text-[12rem]"
      >
        {project.category}
      </span>
      <div className="max-w-3xl mx-auto">
        <Link
          to="/work"
          className="flex items-center gap-2 font-mono text-xs text-gray-700/60 hover:text-hotpink transition-colors mb-10 w-fit"
        >
          <ArrowLeft size={14} /> all projects
        </Link>

        <div className="flex items-center gap-3">
          <div className="logo-chip h-12 w-12 rounded-2xl">
            <img src={`/brand/logos/${project.slug}.png`} alt={`${project.name} logo`} />
          </div>
          <SectionTag>{`${project.category} · case study`}</SectionTag>
        </div>
        <RevealText
          as="h1"
          text={project.name}
          className="font-display text-4xl md:text-6xl font-semibold mt-6"
        />
        <p className="mt-4 text-lg text-gray-700/70">{project.tagline}</p>
        {value && (
          <p className="mt-2 font-mono text-[11px] text-gray-700/40">est. project value {value}</p>
        )}

        <ProjectHeroPanel project={project} onImageClick={() => setLightboxIndex(0)} />
      </div>

      {/* Gallery — full width, breaks out of the narrow text column */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-4 mt-6"
      >
        {detailImages.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setLightboxIndex(i + 1)}
            className="rounded-xl overflow-hidden border border-white/10 bg-charcoal aspect-[4/3] group cursor-pointer"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </button>
        ))}
      </motion.div>

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}

      <div className="max-w-3xl mx-auto">
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
function ProjectHeroPanel({
  project,
  onImageClick,
}: {
  project: (typeof import("../data/projects").projects)[number];
  onImageClick?: () => void;
}) {
  const theme = CATEGORY_THEME[project.category] ?? CATEGORY_THEME.Tourism;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative mt-10"
    >
      <div
        className="absolute -inset-8 rounded-full blur-3xl -z-10 opacity-60"
        style={{ background: `radial-gradient(circle, ${theme.to}, transparent 70%)` }}
        aria-hidden="true"
      />
      <div className="rounded-2xl border border-white/10 bg-charcoal overflow-hidden shadow-2xl">
        <div className="flex items-center gap-3 px-4 py-3 bg-black/40 border-b border-white/10">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          <span className="font-mono text-xs text-white/40 truncate">
            {project.liveUrl.replace(/^https?:\/\//, "")}
          </span>
        </div>
        <button type="button" onClick={onImageClick} className="block w-full cursor-pointer">
          <img
            src={`/projects/${project.slug}.jpg`}
            alt={`${project.name} — live site`}
            className="w-full aspect-video object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
          />
        </button>
      </div>
    </motion.div>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onChange,
}: {
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const goPrev = () => onChange((index - 1 + images.length) % images.length);
  const goNext = () => onChange((index + 1) % images.length);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [index]);

  const current = images[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 text-white/70 hover:text-white text-3xl leading-none"
      >
        &times;
      </button>

      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous image"
          className="absolute left-4 md:left-8 text-white/70 hover:text-white text-4xl leading-none"
        >
          ‹
        </button>
      )}

      <img
        src={current.src}
        alt={current.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
      />

      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next image"
          className="absolute right-4 md:right-8 text-white/70 hover:text-white text-4xl leading-none"
        >
          ›
        </button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-6 font-mono text-xs text-white/50">
          {index + 1} / {images.length}
        </div>
      )}
    </motion.div>
  );
}
