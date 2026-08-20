import RevealText from "../components/RevealText";
import SectionTag from "../components/SectionTag";
import ProjectReel from "../components/ProjectReel";

export default function Work() {
  return (
    <div className="relative overflow-hidden pt-40 pb-28 px-6 md:px-10">
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-6 left-1/2 -z-10 -translate-x-1/2 whitespace-nowrap font-display text-[22vw] font-semibold leading-none text-ink/[0.03] md:text-[12rem]"
      >
        SHIPPED
      </span>
      <div className="max-w-6xl mx-auto">
        <SectionTag>work</SectionTag>
        <RevealText
          as="h1"
          text="Five platforms, five communities, one process."
          className="font-display text-4xl md:text-6xl font-semibold mt-6 max-w-3xl leading-tight"
        />
        <p className="mt-6 text-gray-700/80 max-w-xl">
          Scroll through — each one gets its own moment before the next takes over.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-20">
        <ProjectReel />
      </div>
    </div>
  );
}
