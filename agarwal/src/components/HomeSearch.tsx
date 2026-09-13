"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons";

type Suggestion = {
  slug: string;
  name: string;
  brand: string;
  price: number;
  categoryName: string;
  categoryAccent: string;
  categoryIcon: string;
  requiresPrescription: boolean;
};

export default function HomeSearch({
  placeholder = "Search by medicine, salt or brand… e.g. Paracetamol, Durex, Vitamin D3",
  suggestions: quick = [],
  variant = "light",
}: {
  placeholder?: string;
  suggestions?: string[];
  variant?: "light" | "dark";
}) {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (term.trim().length < 2) {
      setResults([]);
      return;
    }
    setBusy(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(term)}&suggest=1&limit=6`);
        const data = await res.json();
        setResults(data.items ?? []);
        setOpen(true);
      } finally {
        setBusy(false);
      }
    }, 220);
    return () => clearTimeout(t);
  }, [term]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function go(q: string) {
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setOpen(false);
  }

  const dark = variant === "dark";

  return (
    <div ref={wrap} className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go(term.trim());
        }}
        className={`flex items-center gap-2 rounded-2xl p-2 shadow-xl transition ${
          dark ? "bg-white/10 ring-1 ring-white/25 backdrop-blur" : "bg-white ring-1 ring-emerald-100"
        }`}
      >
        <Icon name="search" className="ml-2 h-5 w-5 shrink-0 text-emerald-600" />
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => results.length && setOpen(true)}
          placeholder={placeholder}
          aria-label="Search medicines"
          className={`w-full bg-transparent px-1 py-2 text-sm outline-none ${
            dark ? "text-white placeholder:text-emerald-100/60" : "text-slate-800 placeholder:text-slate-400"
          }`}
        />
        {busy && <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />}
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
        >
          Search
        </button>
      </form>

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {results.map((s) => (
            <Link
              key={s.slug}
              href={`/product/${s.slug}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 border-b border-slate-100 px-4 py-2.5 transition last:border-0 hover:bg-emerald-50/60"
            >
              <span className={`grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${s.categoryAccent} text-white`}>
                <Icon name={s.categoryIcon} className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-slate-900">{s.name}</span>
                <span className="block text-[11px] text-slate-500">
                  {s.brand} · {s.categoryName}
                </span>
              </span>
              <span className="text-sm font-bold text-emerald-700">₹{Math.round(s.price)}</span>
            </Link>
          ))}
          <button
            type="button"
            onClick={() => go(term.trim())}
            className="block w-full bg-slate-50 px-4 py-2.5 text-left text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            See all results →
          </button>
        </div>
      )}

      {quick.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className={`text-[11.5px] font-semibold ${dark ? "text-emerald-100/70" : "text-slate-500"}`}>
            Popular:
          </span>
          {quick.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => go(s)}
              className={`rounded-full px-2.5 py-1 text-[11.5px] font-medium transition ${
                dark
                  ? "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20"
                  : "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100 hover:bg-emerald-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
