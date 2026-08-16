import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import RevealText from "../components/RevealText";
import SectionTag from "../components/SectionTag";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Work() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCategory = !category || p.category === category;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="pt-40 pb-28 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <SectionTag>work</SectionTag>
        <RevealText
          as="h1"
          text="Five platforms, five communities, one process."
          className="font-display text-4xl md:text-6xl font-semibold mt-6 max-w-3xl leading-tight"
        />
        <p className="mt-6 text-gray-700/80 max-w-xl">
          Flip a card for the headline metrics, or open the full case study
          for the story behind the build.
        </p>

        {/* Search + category filters */}
        <div className="mt-12 flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or tech stack…"
              aria-label="Search projects"
              className="w-full rounded-full border border-blush-100 bg-charcoal pl-10 pr-9 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-hotpink/40 transition-shadow"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-hotpink transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <FilterPill
              active={category === null}
              onClick={() => setCategory(null)}
              label="All"
            />
            {categories.map((c) => (
              <FilterPill
                key={c}
                active={category === c}
                onClick={() => setCategory(category === c ? null : c)}
                label={c}
              />
            ))}
          </div>
        </div>

        <p className="mt-4 font-mono text-xs text-gray-400">
          {filtered.length} of {projects.length} project{projects.length === 1 ? "" : "s"}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 min-h-[200px]">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={p} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-700/60 mt-16 font-mono text-sm"
          >
            No projects match "{query}" — try a different search or clear the filter.
          </motion.p>
        )}
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`font-mono text-xs uppercase tracking-wide rounded-full px-4 py-2 border transition-colors ${
        active
          ? "bg-hotpink text-white border-hotpink"
          : "border-blush-100 text-gray-700/70 hover:border-hotpink hover:text-hotpink"
      }`}
    >
      {label}
    </button>
  );
}
