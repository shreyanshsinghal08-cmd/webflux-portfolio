import { useEffect, useState } from "react";

const links = [
  { label: "Overview", href: "#overview" },
  { label: "Classes (9th–12th)", href: "#classes" },
  { label: "Why Choose Us", href: "#why" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={`glass-strong mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled ? "shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]" : ""
        }`}
        style={{ borderColor: scrolled ? "rgba(212,175,55,0.22)" : undefined }}
      >
        {/* Brand */}
        <a href="#top" className="group flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gold/40 bg-gradient-to-br from-charcoal-3 to-obsidian">
            <span className="font-display text-lg font-bold text-gold">A</span>
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-amber shadow-[0_0_10px_2px_rgba(229,169,60,0.7)]" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[15px] font-semibold tracking-wide text-ivory sm:text-base">
              Agarwal Classes
            </span>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-ash">
              for Social Science
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative rounded-full px-4 py-2 text-sm text-mist transition hover:text-gold after:absolute after:bottom-1 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-gold after:transition-all after:duration-300 hover:after:w-6"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn-gold hidden px-5 py-2.5 text-sm md:inline-flex">
            Book Demo Class
          </a>
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-xl border border-white/10 lg:hidden"
          >
            <span
              className={`h-px w-5 bg-ivory transition-all duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span className={`h-px w-5 bg-ivory transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-5 bg-ivory transition-all duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 top-0 -z-10 bg-obsidian/80 backdrop-blur-xl transition-opacity duration-400 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          className={`mx-3 mt-24 rounded-2xl glass-strong p-6 transition-all duration-500 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="flex flex-col divide-y divide-white/5">
            {links.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 text-base text-mist transition hover:text-gold"
                >
                  {l.label}
                  <span className="font-mono text-xs text-ash">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-gold mt-6 w-full px-5 py-3.5 text-sm"
          >
            Book Demo Class
          </a>
        </div>
      </div>
    </header>
  );
}
