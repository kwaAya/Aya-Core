import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/60 px-6 md:px-10 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="flex items-center gap-3">
          <img
            src="/brand/aya-core-symbol.png"
            alt="Aya Core Studios"
            className="h-10 w-auto opacity-90"
          />
          <div>
            <p className="font-display text-lg text-white leading-tight">Aya Core Studios</p>
            <p className="font-mono text-[11px]">intentional · crafted · real</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 font-heading text-sm">
          <Link to="/work" className="hover:text-hotpink-glow transition-colors">Shipped</Link>
          <Link to="/about" className="hover:text-hotpink-glow transition-colors">Behind the Core</Link>
          <Link to="/services" className="hover:text-hotpink-glow transition-colors">Build With Me</Link>
          <Link to="/contact" className="hover:text-hotpink-glow transition-colors">Say Hi</Link>
        </div>

        <div className="flex gap-6 font-mono text-xs">
          <a href="mailto:aya@ayacore.studio" className="hover:text-hotpink-glow transition-colors">Email</a>
          <a href="https://github.com/ayacore" target="_blank" rel="noreferrer" className="hover:text-hotpink-glow transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/ayacore" target="_blank" rel="noreferrer" className="hover:text-hotpink-glow transition-colors">LinkedIn</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-hotpink-glow transition-colors">Instagram</a>
        </div>
      </div>
      <p className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 font-mono text-[11px]">
        © {new Date().getFullYear()} Aya Core Studios · Built in South Africa
      </p>
    </footer>
  );
}
