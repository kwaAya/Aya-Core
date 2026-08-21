import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import RevealText from "../components/RevealText";
import SectionTag from "../components/SectionTag";
import LazyOrbitalScene from "../components/LazyOrbitalScene";

const ENTRIES = [
  {
    title: "Digital Break V2.1",
    description:
      "A browser game built to expose the machinery: a hand-written update-and-render loop, direct canvas collision checks, explicit game states, and interaction timing without an engine.",
    stack: ["JavaScript", "HTML5 Canvas", "CSS3"],
    liveUrl: "https://digitalbreak.netlify.app",
    repoUrl: "https://github.com/kwaAya/Digital-Break-V2.1",
    linkLabel: "Play the build",
  },
  {
    title: "The orbit system",
    description:
      "The Three.js sphere on this site is a small rendering system of its own: a scene, camera, lights, orbital geometry, and an animation loop assembled as a route-lazy React component. It pauses when out of view or when the tab is hidden, and reduces to a static frame when motion is not wanted.",
    stack: ["Three.js", "React Three Fiber", "GSAP", "IntersectionObserver"],
    linkLabel: "See it on the home page",
  },
];

export default function Lab() {
  return (
    <div className="relative overflow-hidden px-6 pb-28 pt-40 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionTag>lab</SectionTag>
        <RevealText
          as="h1"
          text="Built to find out if it could be."
          className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-6xl"
        />
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-700/80">
          Work is what shipped for other people. The lab is where I test the
          ideas, mechanics, and systems that point to what comes next.
        </p>

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {ENTRIES.map((entry, index) => (
            <article key={entry.title} className="border border-white/10 bg-charcoal p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-hotpink">
                  {String(index + 1).padStart(2, "0")} / self-directed
                </span>
                {index === 1 && <LazyOrbitalScene interactive={false} className="h-20 w-20 shrink-0" />}
              </div>
              <h2 className="mt-8 font-display text-3xl font-semibold">{entry.title}</h2>
              <p className="mt-4 leading-relaxed text-gray-700/80">{entry.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {entry.stack.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-xs text-gray-300">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {entry.liveUrl ? (
                  <a href={entry.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-hotpink px-5 py-3 font-mono text-sm text-white transition-colors hover:bg-hotpink-glow">
                    {entry.linkLabel} <ArrowUpRight size={15} />
                  </a>
                ) : (
                  <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-hotpink px-5 py-3 font-mono text-sm text-white transition-colors hover:bg-hotpink-glow">
                    {entry.linkLabel} <ArrowUpRight size={15} />
                  </Link>
                )}
                {entry.repoUrl && (
                  <a href={entry.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 font-mono text-sm text-ink transition-colors hover:border-hotpink hover:text-hotpink">
                    View source <ArrowUpRight size={15} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
