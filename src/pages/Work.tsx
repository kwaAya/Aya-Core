import RevealText from "../components/RevealText";
import SectionTag from "../components/SectionTag";
import ProjectReel from "../components/ProjectReel";
import WatermarkText from "../components/WatermarkText";
import WatermarkHint from "../components/WatermarkHint";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Work() {
  return (
    <div className="overflow-hidden pt-40 pb-28 px-6 md:px-10">
      <div className="relative pb-16 md:pb-24">
        <WatermarkText
          text="SHIPPED"
          playful
          className="select-none absolute -bottom-6 left-1/2 -z-10 -translate-x-1/2 whitespace-nowrap font-display text-[20vw] font-semibold leading-none text-ink/[0.03] md:text-[10rem]"
        />
        <WatermarkHint
          id="work"
          anchorClassName="left-1/2 bottom-6 -translate-x-1/2 z-30"
          messages={["SHIPPED's hiding down here", "catch it before it ships off"]}
        />
        <div className="max-w-6xl mx-auto">
          <SectionTag>work</SectionTag>
          <RevealText
            as="h1"
            text="Four platforms for real places. One built for the craft."
            className="font-display text-4xl md:text-6xl font-semibold mt-6 max-w-3xl leading-tight"
          />
          <p className="mt-6 text-gray-700/80 max-w-xl">
            Scroll through — each one gets its own moment before the next takes over.
          </p>
          <p className="mt-5 max-w-2xl border-l-2 border-hotpink pl-4 text-sm leading-relaxed text-gray-700/70">
            Most of this work was built with Route 56 Adventures, a South African tourism venture founded by my uncle in 2026. I'm the developer on it.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20">
        <ProjectReel />
      </div>

      <section className="mx-auto mt-28 max-w-6xl border-t border-white/10 pt-16">
        <SectionTag>built for no one but me</SectionTag>
        <div className="mt-6 grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-hotpink">self-directed · craft</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-tight md:text-5xl">Digital Break V2.1</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-gray-700/75">
              A browser game built from first principles: canvas rendering, collision detection, state management, and a hand-written game loop with no engine or framework.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/work/digital-break" className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-3 font-mono text-sm text-white transition-colors hover:bg-hotpink">
              technical breakdown <ArrowUpRight size={15} />
            </Link>
            <a href="https://digitalbreak.netlify.app" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-hotpink/50 px-5 py-3 font-mono text-sm text-hotpink transition-colors hover:bg-hotpink hover:text-white">
              play the build <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
