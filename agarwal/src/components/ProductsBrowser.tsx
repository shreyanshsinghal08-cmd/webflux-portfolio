"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import ProductCard, { ProductCardSkeleton, type CardProduct } from "@/components/ProductCard";
import { SORT_OPTIONS, type SortKey } from "@/lib/filters";
import { formatINR } from "@/lib/store";
import type { NavCategory } from "@/components/Header";

export type BrowserState = {
  q: string;
  category: string;
  brand: string;
  form: string;
  rx: string;
  minPrice: string;
  maxPrice: string;
  inStock: boolean;
  sort: SortKey;
  page: number;
};

type Facets = {
  brands: { value: string; count: number }[];
  forms: { value: string; count: number }[];
  price: { min: number; max: number };
};

const EMPTY: BrowserState = {
  q: "",
  category: "",
  brand: "",
  form: "",
  rx: "",
  minPrice: "",
  maxPrice: "",
  inStock: false,
  sort: "popular",
  page: 1,
};

function toParams(s: BrowserState) {
  const p = new URLSearchParams();
  if (s.q) p.set("q", s.q);
  if (s.category) p.set("category", s.category);
  if (s.brand) p.set("brand", s.brand);
  if (s.form) p.set("form", s.form);
  if (s.rx) p.set("rx", s.rx);
  if (s.minPrice) p.set("minPrice", s.minPrice);
  if (s.maxPrice) p.set("maxPrice", s.maxPrice);
  if (s.inStock) p.set("inStock", "1");
  if (s.sort !== "popular") p.set("sort", s.sort);
  if (s.page > 1) p.set("page", String(s.page));
  return p.toString();
}

export default function ProductsBrowser({
  categories,
  initial,
  title = "All medicines",
  subtitle,
}: {
  categories: NavCategory[];
  initial: Partial<BrowserState>;
  title?: string;
  subtitle?: string;
}) {
  const [state, setState] = useState<BrowserState>({ ...EMPTY, ...initial });
  const [searchInput, setSearchInput] = useState(state.q);
  const [items, setItems] = useState<CardProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [facets, setFacets] = useState<Facets>({ brands: [], forms: [], price: { min: 0, max: 0 } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileFilters, setMobileFilters] = useState(false);

  const activeCategory = useMemo(
    () => categories.find((c) => c.slug === state.category),
    [categories, state.category],
  );

  const update = useCallback((patch: Partial<BrowserState>, resetPage = true) => {
    setState((prev) => ({ ...prev, ...patch, page: resetPage ? 1 : prev.page }));
  }, []);

  // debounce the free-text search box
  useEffect(() => {
    if (searchInput === state.q) return;
    const t = setTimeout(() => update({ q: searchInput }), 350);
    return () => clearTimeout(t);
  }, [searchInput, state.q, update]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    const qs = toParams(state);
    window.history.replaceState(null, "", qs ? `/products?${qs}` : "/products");
    fetch(`/api/products?${qs}&limit=24`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Request failed"))))
      .then((data) => {
        setItems(data.items ?? []);
        setTotal(data.total ?? 0);
        setPages(data.pages ?? 1);
        setFacets(data.facets ?? { brands: [], forms: [], price: { min: 0, max: 0 } });
      })
      .catch((e) => {
        if (e?.name !== "AbortError") setError("Could not load products. Please try again.");
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [state]);

  const heading = activeCategory ? activeCategory.name : title;
  const headingSub = activeCategory?.tagline ?? subtitle;

  const filtersPanel = (
    <div className="space-y-5">
      <FilterBlock title="Category">
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => update({ category: "" })}
            className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] transition ${
              !state.category ? "bg-emerald-600 font-semibold text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>All products</span>
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => update({ category: c.slug })}
              className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13px] transition ${
                state.category === c.slug ? "bg-emerald-50 font-semibold text-emerald-800" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon name={c.icon} className="h-4 w-4 shrink-0 text-emerald-600" />
              <span className="truncate">{c.name}</span>
              {c.ageRestricted && <span className="ml-auto rounded bg-fuchsia-100 px-1 text-[9px] font-black text-fuchsia-700">18+</span>}
            </button>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Price (₹)">
        <div className="flex items-center gap-2">
          <input
            value={state.minPrice}
            onChange={(e) => update({ minPrice: e.target.value.replace(/\D/g, "") })}
            placeholder={`Min ${Math.round(facets.price.min)}`}
            className="h-9 w-full rounded-lg border border-slate-200 px-2 text-xs outline-none focus:border-emerald-500"
          />
          <span className="text-slate-400">–</span>
          <input
            value={state.maxPrice}
            onChange={(e) => update({ maxPrice: e.target.value.replace(/\D/g, "") })}
            placeholder={`Max ${Math.round(facets.price.max)}`}
            className="h-9 w-full rounded-lg border border-slate-200 px-2 text-xs outline-none focus:border-emerald-500"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[
            { label: "Under ₹99", max: "99" },
            { label: "₹100 – ₹299", min: "100", max: "299" },
            { label: "₹300 – ₹699", min: "300", max: "699" },
            { label: "Above ₹700", min: "700" },
          ].map((r) => (
            <button
              key={r.label}
              type="button"
              onClick={() => update({ minPrice: r.min ?? "", maxPrice: r.max ?? "" })}
              className="rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition hover:border-emerald-400 hover:text-emerald-700"
            >
              {r.label}
            </button>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Prescription">
        <div className="flex gap-1.5">
          {[
            { key: "", label: "All" },
            { key: "no", label: "OTC only" },
            { key: "yes", label: "Rx only" },
          ].map((o) => (
            <button
              key={o.key}
              type="button"
              onClick={() => update({ rx: o.key })}
              className={`flex-1 rounded-lg px-2 py-1.5 text-[12px] font-semibold transition ${
                state.rx === o.key ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
        <label className="mt-2.5 flex cursor-pointer items-center gap-2 text-[12.5px] text-slate-600">
          <input
            type="checkbox"
            checked={state.inStock}
            onChange={(e) => update({ inStock: e.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          In stock only
        </label>
      </FilterBlock>

      {facets.forms.length > 0 && (
        <FilterBlock title="Form">
          <div className="flex flex-wrap gap-1.5">
            {facets.forms.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => update({ form: state.form === f.value ? "" : f.value })}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                  state.form === f.value
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-700"
                }`}
              >
                {f.value} <span className="opacity-60">({f.count})</span>
              </button>
            ))}
          </div>
        </FilterBlock>
      )}

      {facets.brands.length > 0 && (
        <FilterBlock title="Brand">
          <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
            {facets.brands.map((b) => (
              <label key={b.value} className="flex cursor-pointer items-center gap-2 text-[12.5px] text-slate-600">
                <input
                  type="radio"
                  name="brand"
                  checked={state.brand === b.value}
                  onChange={() => update({ brand: b.value })}
                  className="h-3.5 w-3.5 border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="truncate">{b.value}</span>
                <span className="ml-auto text-[11px] text-slate-400">{b.count}</span>
              </label>
            ))}
            {state.brand && (
              <button
                type="button"
                onClick={() => update({ brand: "" })}
                className="text-[11.5px] font-semibold text-emerald-700 hover:underline"
              >
                Clear brand filter
              </button>
            )}
          </div>
        </FilterBlock>
      )}

      <button
        type="button"
        onClick={() => setState({ ...EMPTY, q: state.q })}
        className="w-full rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-600 transition hover:border-rose-300 hover:text-rose-600"
      >
        Reset all filters
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="flex flex-wrap items-center gap-1.5 text-[12px] text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <Icon name="chevronRight" className="h-3 w-3" />
        <Link href="/products" className="hover:text-emerald-700">Catalogue</Link>
        {activeCategory && (
          <>
            <Icon name="chevronRight" className="h-3 w-3" />
            <span className="font-semibold text-slate-700">{activeCategory.name}</span>
          </>
        )}
      </nav>

      <header className="mt-3 flex flex-col gap-3 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            {heading}
            {state.q && <span className="text-emerald-700"> · “{state.q}”</span>}
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-slate-500">
            {headingSub ??
              "Genuine medicines at honest prices, checked by our pharmacist and delivered from Agarwal Ji's counter in Jaipur."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
            {loading ? "Loading…" : `${total.toLocaleString("en-IN")} products`}
          </span>
          <select
            value={state.sort}
            onChange={(e) => update({ sort: e.target.value as SortKey })}
            className="h-9 rounded-xl border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-emerald-500"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setMobileFilters(true)}
            className="flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 px-3 text-xs font-semibold text-slate-700 lg:hidden"
          >
            <Icon name="filter" className="h-4 w-4" />
            Filters
          </button>
        </div>
      </header>

      <div className="mt-6 grid gap-7 lg:grid-cols-[248px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2">
              <Icon name="search" className="h-4 w-4 text-emerald-700" />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search in results…"
                className="w-full bg-transparent text-xs outline-none placeholder:text-slate-400"
              />
            </div>
            {filtersPanel}
          </div>
        </aside>

        <section>
          {(state.q || state.brand || state.form || state.rx || state.category || state.minPrice || state.maxPrice || state.inStock) && (
            <div className="mb-4 flex flex-wrap items-center gap-1.5">
              {state.category && <Chip label={`Category: ${activeCategory?.name ?? state.category}`} onClear={() => update({ category: "" })} />}
              {state.q && <Chip label={`“${state.q}”`} onClear={() => { setSearchInput(""); update({ q: "" }); }} />}
              {state.brand && <Chip label={state.brand} onClear={() => update({ brand: "" })} />}
              {state.form && <Chip label={state.form} onClear={() => update({ form: "" })} />}
              {state.rx && <Chip label={state.rx === "yes" ? "Prescription only" : "OTC only"} onClear={() => update({ rx: "" })} />}
              {(state.minPrice || state.maxPrice) && (
                <Chip
                  label={`${state.minPrice ? formatINR(Number(state.minPrice)) : "₹0"} – ${state.maxPrice ? formatINR(Number(state.maxPrice)) : "Any"}`}
                  onClear={() => update({ minPrice: "", maxPrice: "" })}
                />
              )}
              {state.inStock && <Chip label="In stock" onClear={() => update({ inStock: false })} />}
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 12 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-slate-100 text-slate-400">
                <Icon name="search" className="h-7 w-7" />
              </div>
              <p className="mt-4 text-base font-bold text-slate-900">No products matched your filters</p>
              <p className="mx-auto mt-1.5 max-w-md text-sm text-slate-500">
                Try a different salt name, brand or category — or call {`Agarwal Ji`} and we will arrange any medicine
                from our 10,000+ catalogue within 24 hours.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setState({ ...EMPTY })}
                  className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Clear filters
                </button>
                <Link
                  href="/prescription"
                  className="rounded-full border border-emerald-300 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                >
                  Order on prescription
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {items.map((p) => <ProductCard key={`${p.slug}-${p.id}`} product={p} />)}
              </div>

              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <PageBtn disabled={state.page <= 1} onClick={() => update({ page: state.page - 1 }, false)} label="Prev" icon="chevronLeft" />
                  {pageWindow(state.page, pages).map((p) =>
                    p === "…" ? (
                      <span key={`gap-${Math.random()}`} className="px-1.5 text-sm text-slate-400">…</span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        onClick={() => update({ page: p as number }, false)}
                        className={`h-9 min-w-9 rounded-xl px-2 text-sm font-semibold transition ${
                          p === state.page ? "bg-emerald-600 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-400"
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}
                  <PageBtn disabled={state.page >= pages} onClick={() => update({ page: state.page + 1 }, false)} label="Next" icon="chevronRight" />
                </div>
                <p className="text-xs text-slate-500">
                  Showing page {state.page} of {pages} · {total.toLocaleString("en-IN")} products
                </p>
              </div>
            </>
          )}
        </section>
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button type="button" aria-label="Close filters" className="absolute inset-0 bg-slate-900/50" onClick={() => setMobileFilters(false)} />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Filters</h2>
              <button type="button" onClick={() => setMobileFilters(false)} className="grid h-9 w-9 place-items-center rounded-full bg-slate-100">
                <Icon name="x" className="h-4 w-4" />
              </button>
            </div>
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2">
              <Icon name="search" className="h-4 w-4 text-slate-500" />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search medicines…"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            {filtersPanel}
            <button
              type="button"
              onClick={() => setMobileFilters(false)}
              className="mt-5 w-full rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white"
            >
              Show {total.toLocaleString("en-IN")} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-slate-100 pt-4 first:border-0 first:pt-0">
      <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{title}</h3>
      {children}
    </div>
  );
}

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 py-1 pl-3 pr-1.5 text-[11.5px] font-semibold text-emerald-800">
      {label}
      <button type="button" onClick={onClear} className="grid h-4.5 w-4.5 place-items-center rounded-full bg-white/80 text-emerald-700 hover:bg-white" aria-label={`Remove ${label}`}>
        <Icon name="x" className="h-3 w-3" />
      </button>
    </span>
  );
}

function PageBtn({
  onClick,
  disabled,
  label,
  icon,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  icon: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-9 items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 transition hover:border-emerald-400 disabled:opacity-40"
    >
      <Icon name={icon} className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function pageWindow(page: number, pages: number): (number | "…")[] {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(pages - 1, page + 1);
  if (start > 2) out.push("…");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < pages - 1) out.push("…");
  out.push(pages);
  return out;
}
