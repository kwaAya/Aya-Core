import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import RevealText from "../components/RevealText";
import SectionTag from "../components/SectionTag";
import WatermarkText from "../components/WatermarkText";
import WatermarkHint from "../components/WatermarkHint";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not found — Aya Core Studios";
  }, []);

  return (
    <div className="relative overflow-hidden flex min-h-[80vh] items-center px-6 pt-40 pb-28 md:px-10">
      <WatermarkText
        text="404"
        playful
        className="absolute -bottom-6 left-[-4%] md:bottom-0 md:left-0 -z-10 whitespace-nowrap font-display text-[28vw] font-semibold leading-none text-ink/[0.035] md:text-[14rem]"
      />
      <WatermarkHint
        id="404"
        anchorClassName="left-6 bottom-28 md:left-16"
        messages={["even the 404 is hiding", "psst — bottom left has a secret"]}
      />

      <div className="mx-auto max-w-xl text-center">
        <SectionTag>lost in orbit</SectionTag>
        <RevealText
          as="h1"
          text="This page drifted off the map."
          className="font-display text-4xl md:text-6xl font-semibold mt-6 leading-tight"
        />
        <p className="mt-6 text-gray-700/80 leading-relaxed">
          Whatever you were looking for isn't at this address — it might've moved, or never existed here at all.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3.5 font-heading text-sm font-medium text-white shadow-[0_0_40px_rgba(248,18,149,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-hotpink"
        >
          <ArrowLeft size={16} /> Back to the core
        </Link>
      </div>
    </div>
  );
}