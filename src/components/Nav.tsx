import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { to: "/work", label: "Shipped" },
  { to: "/about", label: "Behind the Core" },
  { to: "/services", label: "Build With Me" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-cream/85 backdrop-blur-md border-b border-blush-100" : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-10 h-20">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="relative">
            <div
              className="absolute -inset-2 rounded-full bg-hotpink/25 blur-md -z-10"
              aria-hidden="true"
            />
            <img
              src="/brand/aya-core-symbol.png"
              alt=""
              className="h-14 w-auto"
              aria-hidden="true"
            />
          </div>
          <span className="font-display text-base font-semibold tracking-wide leading-none">
            <span className="text-hotpink">A</span>
            <span className="brand-metallic">YA CORE</span>
            <span className="block w-10 h-px bg-gradient-to-r from-transparent via-hotpink to-transparent my-1" aria-hidden="true" />
            <span className="block font-mono text-[9px] tracking-[0.25em] text-hotpink font-normal">
              STUDIOS
            </span>
          </span>
        </NavLink>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-heading text-sm font-medium tracking-wide transition-colors ${
                  isActive ? "text-hotpink" : "text-ink/70 hover:text-ink"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="font-mono text-xs uppercase tracking-wide border border-hotpink text-hotpink rounded-full px-4 py-2 hover:bg-hotpink hover:text-white transition-colors"
          >
            $ let's talk
          </NavLink>
        </div>

        <MobileMenu />
      </nav>
    </motion.header>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex flex-col gap-1.5 p-2"
      >
        <span
          className={`block w-6 h-[2px] bg-ink transition-transform ${
            open ? "translate-y-[7px] rotate-45" : ""
          }`}
        />
        <span className={`block w-6 h-[2px] bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
        <span
          className={`block w-6 h-[2px] bg-ink transition-transform ${
            open ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-20 inset-x-0 bg-cream border-b border-blush-100 px-6 py-6 flex flex-col gap-5">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="font-heading text-lg text-ink"
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className="font-mono text-sm uppercase tracking-wide border border-hotpink text-hotpink rounded-full px-4 py-2 text-center"
          >
            $ let's talk
          </NavLink>
        </div>
      )}
    </div>
  );
}
