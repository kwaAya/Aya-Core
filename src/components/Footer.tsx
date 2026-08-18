import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";
import { BiLogoLinkedin } from "react-icons/bi";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/60 px-6 md:px-10 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="flex items-center gap-3">
          <img
            src="/brand/aya-core-symbol.png"
            alt="Aya Core Studios"
            className="h-14 w-auto opacity-90"
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

        <div className="flex gap-3">
          {[
            { href: "mailto:ayacorestudios@gmail.com", label: "Email", Icon: Mail, external: false },
            { href: "https://github.com/kwaAya", label: "GitHub", Icon: SiGithub, external: true },
            { href: "https://linkedin.com/in/unako-mtumtum", label: "LinkedIn", Icon: BiLogoLinkedin, external: true },
            { href: "https://www.instagram.com/ayabukwaaaa/?__pwa=1#", label: "Instagram", Icon: SiInstagram, external: true },
          ].map(({ href, label, Icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              aria-label={label}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-hotpink hover:bg-hotpink/10 transition-colors"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
      <p className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 font-mono text-[11px]">
        © {new Date().getFullYear()} Aya Core Studios 💋 · Built in South Africa
      </p>
    </footer>
  );
}