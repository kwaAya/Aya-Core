import { ArrowUpRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { SiGithub, SiInstagram } from "react-icons/si";
import { BiLogoLinkedin } from "react-icons/bi";

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-white/10 bg-[radial-gradient(circle_at_top,_rgba(248,18,149,0.18),_transparent_28%),_linear-gradient(180deg,_rgba(17,17,20,1),_rgba(9,9,12,1))] px-6 py-10 text-white/65 md:px-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hotpink/80 to-transparent" />
      <div className="absolute -left-10 top-12 h-48 w-48 rounded-full bg-hotpink/12 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-[#8b5cf6]/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.26em] text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-hotpink" />
            Select collaborations
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_40px_rgba(248,18,149,0.12)] backdrop-blur-sm">
              <img
                src="/brand/aya-core-symbol.png"
                alt="Aya Core Studios"
                className="h-10 w-auto opacity-95"
              />
            </div>

            <div>
              <p className="font-display text-2xl leading-tight text-white md:text-[2.2rem]">Aya Core Studios</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
                intentional · crafted · real
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-md text-sm leading-6 text-white/60 md:text-[15px]">
            Design, strategy, and product thinking for brands ready to feel sharper, richer, and more memorable.
          </p>
        </div>

        <div className="flex flex-col gap-5 lg:items-end">
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/75">
            <Link to="/work" className="transition-all duration-200 hover:text-hotpink-glow hover:translate-y-[-1px]">Shipped</Link>
            <Link to="/about" className="transition-all duration-200 hover:text-hotpink-glow hover:translate-y-[-1px]">Behind the Core</Link>
            <Link to="/services" className="transition-all duration-200 hover:text-hotpink-glow hover:translate-y-[-1px]">Build With Me</Link>
            <Link to="/contact" className="transition-all duration-200 hover:text-hotpink-glow hover:translate-y-[-1px]">Say Hi</Link>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 self-start rounded-full border border-hotpink/40 bg-hotpink/8 px-4 py-2.5 font-heading text-sm text-white transition-all duration-200 hover:border-hotpink/80 hover:bg-hotpink/12 hover:shadow-[0_0_30px_rgba(248,18,149,0.16)] lg:self-auto"
          >
            Start a project
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <div className="relative mx-auto mt-10 flex max-w-6xl flex-col gap-5 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between">
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
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.02] text-white/70 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-hotpink/80 hover:bg-hotpink/10 hover:text-white hover:shadow-[0_0_25px_rgba(248,18,149,0.22)]"
            >
              <Icon size={17} className="transition-transform duration-200 group-hover:scale-110" />
            </a>
          ))}
        </div>

        <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/45">
          © {new Date().getFullYear()} Aya Core Studios · Built in South Africa
        </div>
      </div>
    </footer>
  );
}