import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Terminal, X } from "lucide-react";
import { cn } from "../utils/cn";

const links = [
  { label: "Programs", href: "#courses" },
  { label: "Why Us", href: "#why-us" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#reviews" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={cn("container-x transition-all duration-500", scrolled ? "pt-3" : "pt-5")}>
        <nav
          className={cn(
            "flex h-16 items-center justify-between rounded-2xl pl-5 pr-3 transition-all duration-500",
            scrolled
              ? "glass shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]"
              : "border border-transparent",
          )}
        >
          <a href="#top" className="group flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-mint to-mint-2 shadow-[0_0_26px_rgba(16,185,129,0.4)] transition-transform duration-300 group-hover:scale-105">
              <Terminal size={16} strokeWidth={2.6} className="text-ink" />
            </span>
            <span className="leading-none">
              <span className="font-display text-[15px] font-bold tracking-tight text-frost">
                Smart<span className="text-mint-2">Institute</span>
              </span>
              <span className="mt-1 block text-[8.5px] font-medium tracking-[0.26em] text-mist/60">
                COMPUTER TRAINING
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="relative rounded-full px-4 py-2 text-[13.5px] font-medium text-mist transition-colors duration-300 hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#book"
              className="group hidden items-center gap-2 rounded-full bg-mint px-5 py-2.5 text-[13px] font-semibold text-ink transition-all duration-300 hover:bg-mint-2 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] sm:inline-flex"
            >
              Book Free Demo
              <ArrowUpRight
                size={15}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="glass grid h-10 w-10 place-items-center rounded-xl text-frost lg:hidden"
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="glass mt-2 space-y-1 rounded-2xl p-3 lg:hidden">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-mist transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-mint px-4 py-3 text-sm font-semibold text-ink"
            >
              Book Free Demo <ArrowUpRight size={15} strokeWidth={2.5} />
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
