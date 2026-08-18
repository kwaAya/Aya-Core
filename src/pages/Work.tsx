import RevealText from "../components/RevealText";
import SectionTag from "../components/SectionTag";
import ProjectReel from "../components/ProjectReel";

export default function Work() {
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
          Scroll through — each one gets its own moment before the next takes over.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-20">
        <ProjectReel />
      </div>
    </div>
  );
}
