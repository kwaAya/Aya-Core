import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";
import { BiLogoLinkedin } from "react-icons/bi";

export default function Footer() {
  return (
    <footer className="relative mt-14 border-t border-white/10 bg-[radial-gradient(circle_at_top,_rgba(248,18,149,0.12),_transparent_38%),_rgba(19,19,22,0.96)] px-6 py-10 text-white/65 md:px-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hotpink/80 to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/3 shadow-[0_0_35px_rgba(248,18,149,0.12)] backdrop-blur-sm">
            <img
              src="/brand/aya-core-symbol.png"
              alt="Aya Core Studios"
              className="h-10 w-auto opacity-95"
            />
          </div>

          <div>
            <p className="font-display text-xl leading-tight text-white md:text-2xl">Aya Core Studios</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
              intentional · crafted · real
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-heading text-sm text-white/70">
          <span className="mr-2 hidden text-[10px] uppercase tracking-[0.28em] text-white/40 md:inline-block">
            Explore
          </span>
          <Link to="/work" className="transition-all duration-200 hover:text-hotpink-glow hover:translate-y-[-1px]">
            Shipped
          </Link>
          <Link to="/about" className="transition-all duration-200 hover:text-hotpink-glow hover:translate-y-[-1px]">
            Behind the Core
          </Link>
          <Link to="/services" className="transition-all duration-200 hover:text-hotpink-glow hover:translate-y-[-1px]">
            Build With Me
          </Link>
          <Link to="/contact" className="transition-all duration-200 hover:text-hotpink-glow hover:translate-y-[-1px]">
            Say Hi
          </Link>
        </div>

        <div className="flex items-center gap-3">
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
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.02] text-white/70 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-hotpink/70 hover:bg-hotpink/10 hover:text-white hover:shadow-[0_0_25px_rgba(248,18,149,0.25)]"
            >
              <Icon size={17} className="transition-transform duration-200 group-hover:scale-110" />
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-9 flex max-w-6xl flex-col gap-3 border-t border-white/10 pt-5 text-[11px] font-mono uppercase tracking-[0.2em] text-white/45 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Aya Core Studios</p>
        <p>Built in South Africa · shaped with intention</p>
      </div>
    </footer>
  );
}