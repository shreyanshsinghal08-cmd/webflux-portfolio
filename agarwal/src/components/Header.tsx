"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@/components/icons";
import { useCart } from "@/components/cart";
import { STORE } from "@/lib/store";

export type NavCategory = {
  slug: string;
  name: string;
  icon: string;
  accent: string;
  count: number;
  ageRestricted: boolean;
  tagline: string | null;
};

const NAV_LINKS = [
  { href: "/products", label: "All medicines" },
  { href: "/sexual-wellness", label: "Sexual wellness", badge: "18+" },
  { href: "/products?category=devices", label: "Devices" },
  { href: "/products?category=ayurveda", label: "Ayurveda" },
  { href: "/offers", label: "Offers" },
  { href: "/prescription", label: "Upload Rx" },
  { href: "/about", label: "About Agarwal Ji" },
];

export default function Header({ categories }: { categories: NavCategory[] }) {
  const { count, open } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const [term, setTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    setCatOpen(false);
    setShowSuggest(false);
  }, [pathname]);

  useEffect(() => {
    if (term.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(term)}&suggest=1&limit=7`);
        const data = await res.json();
        setSuggestions(data.items ?? []);
        setShowSuggest(true);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => clearTimeout(t);
  }, [term]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setShowSuggest(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = term.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setShowSuggest(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-[0_1px_0_rgba(15,23,42,0.06)] backdrop-blur">
      <div className="hidden bg-emerald-900 text-emerald-50 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-1.5 text-[11.5px]">
          <p className="flex items-center gap-2">
            <Icon name="truck" className="h-3.5 w-3.5" />
            Free delivery above ₹{STORE.freeDeliveryAbove} · Same-day dispatch in Jaipur before 7 PM
          </p>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Icon name="shieldCheck" className="h-3.5 w-3.5" />
              Drug Licence {STORE.licence.split(" · ")[0]}
            </span>
            <a href={`tel:${STORE.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-white">
              <Icon name="phone" className="h-3.5 w-3.5" />
              {STORE.phoneDisplay}
            </a>
            <Link href="/track" className="flex items-center gap-1.5 hover:text-white">
              <Icon name="package" className="h-3.5 w-3.5" />
              Track order
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-600/25">
            <Icon name="plus" className="h-6 w-6" strokeWidth={2.6} />
            <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-amber-400 text-[9px] font-black text-emerald-950">
              Ji
            </span>
          </span>
          <span className="leading-tight">
            <span className="block text-[17px] font-extrabold tracking-tight text-slate-900">
              Agarwal<span className="text-emerald-700">Ji</span>
            </span>
            <span className="block text-[10.5px] font-medium uppercase tracking-[0.14em] text-slate-500">
              Medical Store · est. {STORE.since}
            </span>
          </span>
        </Link>

        <div ref={boxRef} className="relative mx-auto hidden w-full max-w-2xl md:block">
          <form onSubmit={submit}>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 transition focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-50">
              <Icon name="search" className="h-4.5 w-4.5 shrink-0 text-slate-400" />
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onFocus={() => suggestions.length && setShowSuggest(true)}
                placeholder="Search 10,000+ medicines, salts, brands… e.g. paracetamol, condom, Durex"
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
              {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />}
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-700"
              >
                Search
              </button>
            </div>
          </form>

          {showSuggest && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
              {suggestions.map((s) => (
                <Link
                  key={s.slug}
                  href={`/product/${s.slug}`}
                  onClick={() => setShowSuggest(false)}
                  className="flex items-center gap-3 border-b border-slate-100 px-4 py-2.5 transition last:border-0 hover:bg-emerald-50/60"
                >
                  <span className={`grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${s.categoryAccent} text-white`}>
                    <Icon name={s.categoryIcon} className="h-4.5 w-4.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-slate-900">{s.name}</span>
                    <span className="block truncate text-[11px] text-slate-500">
                      {s.categoryName} · {s.form}
                    </span>
                  </span>
                  <span className="text-sm font-bold text-emerald-700">₹{Math.round(s.price)}</span>
                </Link>
              ))}
              <button
                type="button"
                onClick={submit as unknown as () => void}
                className="block w-full bg-slate-50 px-4 py-2.5 text-left text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                See all results for “{term}” →
              </button>
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1.5 md:gap-2">
          <Link
            href="/prescription"
            className="hidden items-center gap-1.5 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700 lg:flex"
          >
            <Icon name="prescription" className="h-4 w-4" />
            Upload Rx
          </Link>
          <button
            type="button"
            onClick={open}
            className="relative flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
          >
            <Icon name="cart" className="h-4.5 w-4.5" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-amber-400 px-1 text-[10px] font-black text-emerald-950">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700 md:hidden"
            aria-label="Menu"
          >
            <Icon name={menuOpen ? "x" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="hidden border-t border-slate-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4">
          <div
            className="relative"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCatOpen((v) => !v)}
              className="flex items-center gap-2 rounded-t-lg px-3 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-emerald-50"
            >
              <Icon name="grid" className="h-4 w-4 text-emerald-700" />
              All categories
              <Icon name="chevronDown" className={`h-3.5 w-3.5 transition ${catOpen ? "rotate-180" : ""}`} />
            </button>
            {catOpen && (
              <div className="absolute left-0 top-full z-50 w-[720px] rounded-b-2xl rounded-tr-2xl border border-slate-200 bg-white p-3 shadow-2xl">
                <div className="grid grid-cols-3 gap-1.5">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/products?category=${c.slug}`}
                      className="group flex items-start gap-2.5 rounded-xl p-2.5 transition hover:bg-slate-50"
                    >
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${c.accent} text-white`}>
                        <Icon name={c.icon} className="h-4.5 w-4.5" />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-800 group-hover:text-emerald-700">
                          {c.name}
                          {c.ageRestricted && (
                            <span className="rounded bg-fuchsia-100 px-1 text-[9px] font-black text-fuchsia-700">18+</span>
                          )}
                        </span>
                        <span className="block text-[11px] text-slate-500">{c.count.toLocaleString("en-IN")} products</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                pathname === l.href ? "bg-emerald-50 text-emerald-800" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {l.label}
              {l.badge && (
                <span className="rounded bg-fuchsia-100 px-1 text-[9px] font-black text-fuchsia-700">{l.badge}</span>
              )}
            </Link>
          ))}
          <Link
            href="/track"
            className="ml-auto flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <Icon name="package" className="h-4 w-4" />
            Track order
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-4 md:hidden">
          <form onSubmit={submit} className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <Icon name="search" className="h-4 w-4 text-slate-400" />
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search medicines…"
              className="w-full bg-transparent text-sm outline-none"
            />
          </form>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/products?category=${c.slug}`}
                className="flex items-center gap-2 rounded-xl border border-slate-100 px-2.5 py-2 text-xs font-semibold text-slate-700"
              >
                <span className={`grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br ${c.accent} text-white`}>
                  <Icon name={c.icon} className="h-3.5 w-3.5" />
                </span>
                <span className="truncate">{c.name}</span>
              </Link>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
