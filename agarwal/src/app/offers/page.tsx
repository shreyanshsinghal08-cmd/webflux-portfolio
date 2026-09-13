import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import ProductCard from "@/components/ProductCard";
import { CopyButton } from "@/components/widgets";
import { listProducts } from "@/lib/queries";
import { COUPONS, formatINR, STORE } from "@/lib/store";
import { IMAGES } from "@/lib/images";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Offers, coupons & subscription savings",
  description: `Live coupon codes and price-drop deals at ${STORE.name} — up to 32% off on daily medicines, flat discounts on first orders and chronic-care subscriptions.`,
};

const COUPON_META: Record<string, { icon: string; accent: string; min: string }> = {
  AGARWAL10: { icon: "percent", accent: "from-emerald-500 to-teal-600", min: "on orders above ₹199" },
  FIRST100: { icon: "sparkles", accent: "from-sky-500 to-indigo-600", min: "on your first order above ₹499" },
  WELLNESS20: { icon: "shield", accent: "from-fuchsia-500 to-purple-600", min: "on sexual wellness above ₹399" },
  SUPER150: { icon: "package", accent: "from-amber-500 to-orange-600", min: "on bulk orders above ₹1,200" },
};

export default async function OffersPage() {
  const [deals, chronic, wellness] = await Promise.all([
    listProducts({ deals: true, sort: "discount", limit: 20 }).catch(() => ({ items: [] })),
    listProducts({ q: "metformin", limit: 5 }).catch(() => ({ items: [] })),
    listProducts({ category: "sexual-wellness", sort: "discount", limit: 5 }).catch(() => ({ items: [] })),
  ]);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 py-14 text-white">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_40%),radial-gradient(circle_at_80%_60%,white_0,transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] ring-1 ring-white/20">
            <Icon name="percent" className="h-3.5 w-3.5" /> Live offers · updated daily
          </span>
          <h1 className="mt-4 max-w-3xl text-[clamp(1.9rem,4.6vw,3.2rem)] font-extrabold leading-[1.06]">
            Counter prices, not marketplace prices
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/85">
            {STORE.ownerShort} keeps the discount honest: we buy at distributor rates and pass the margin on. Stack a
            coupon on top of the shelf price and most monthly medicine bills drop by 15–25%.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Coupon codes</h2>
        <p className="mt-1 text-[13.5px] text-slate-500">
          Apply at cart or checkout — the code is validated on the server, so what you see is what you get.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(COUPONS).map(([code, c]) => {
            const meta = COUPON_META[code] ?? { icon: "percent", accent: "from-emerald-500 to-teal-600", min: "" };
            return (
              <article key={code} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5">
                <span className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${meta.accent}`} />
                <span className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${meta.accent} text-white`}>
                  <Icon name={meta.icon} className="h-5 w-5" />
                </span>
                <p className="mt-3 text-[15px] font-extrabold text-slate-900">
                  {c.type === "percent" ? `${c.value}% off` : `${formatINR(c.value)} off`}
                  {c.maxDiscount ? ` up to ${formatINR(c.maxDiscount)}` : ""}
                </p>
                <p className="mt-1 text-[12.5px] leading-snug text-slate-500">{c.label}</p>
                <p className="mt-1 text-[11.5px] font-semibold text-slate-400">{meta.min}</p>
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/60 px-3 py-2">
                  <code className="flex-1 text-[13px] font-black tracking-wide text-emerald-800">{code}</code>
                  <CopyButton text={code} label="Copy" />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {deals.items.length > 0 && (
        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Biggest price drops right now</h2>
                <p className="mt-1 text-[13.5px] text-slate-500">
                  Sorted by discount — {deals.items.length} of our highest-saving products.
                </p>
              </div>
              <Link
                href="/products?sort=discount"
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 px-4 py-2 text-[13px] font-bold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
              >
                Sort the whole catalogue by discount <Icon name="arrowRight" className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {deals.items.slice(0, 20).map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white lg:col-span-2">
            <div className="grid gap-0 sm:grid-cols-[1fr_220px]">
              <div className="p-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-800">
                  <Icon name="refresh" className="h-3.5 w-3.5" /> Chronic care subscription
                </span>
                <h3 className="mt-3 text-xl font-extrabold text-slate-900">
                  Never run out of diabetes, BP or thyroid medicine again
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
                  Set a 30, 60 or 90-day refill for your regular prescription. We keep the price locked, apply up to 20%
                  off automatically, remind you three days before dispatch and deliver free. Cancel or pause any time by
                  calling the store.
                </p>
                <ul className="mt-4 grid gap-2 text-[13px] text-slate-700 sm:grid-cols-2">
                  {[
                    "Price locked for 6 months",
                    "Up to 20% off every refill",
                    "Free delivery, always",
                    "Doctor's prescription verified once",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <Icon name="check" className="h-4 w-4 text-emerald-600" /> {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={`tel:${STORE.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                  >
                    <Icon name="phone" className="h-4 w-4" /> Start a subscription
                  </a>
                  <Link
                    href="/prescription"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-400"
                  >
                    Upload prescription first
                  </Link>
                </div>
              </div>
              <div className="hidden sm:block">
                <img src={IMAGES.care} alt="Pharmacist helping a senior customer" className="h-full w-full object-cover" loading="lazy" />
              </div>
            </div>
          </article>

          <div className="space-y-5">
            <div className="rounded-3xl bg-gradient-to-br from-fuchsia-600 to-purple-700 p-6 text-white">
              <Icon name="lock" className="h-6 w-6" />
              <h3 className="mt-2.5 text-lg font-extrabold">20% off the 18+ counter</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-fuchsia-50/85">
                Use <strong className="rounded bg-white/20 px-1.5 py-0.5">WELLNESS20</strong> on condoms, lubricants,
                tests and intimate care. Discreet packaging is always free.
              </p>
              <Link href="/sexual-wellness" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-fuchsia-700">
                Open the counter <Icon name="arrowRight" className="h-3.5 w-3.5" />
              </Link>
              {wellness.items.length > 0 && (
                <ul className="mt-4 space-y-1.5 border-t border-white/20 pt-3 text-[12px]">
                  {wellness.items.slice(0, 3).map((p) => (
                    <li key={p.slug} className="flex items-center justify-between gap-2">
                      <Link href={`/product/${p.slug}`} className="truncate hover:underline">{p.name}</Link>
                      <span className="shrink-0 font-bold">₹{Math.round(p.price)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h3 className="text-[15px] font-extrabold text-slate-900">Diabetes refill picks</h3>
              <p className="mt-1 text-[12.5px] text-slate-500">Most subscribed medicines this month.</p>
              <ul className="mt-3 space-y-2">
                {chronic.items.slice(0, 4).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/product/${p.slug}`} className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 px-3 py-2 transition hover:border-emerald-300">
                      <span className="min-w-0">
                        <span className="block truncate text-[12.5px] font-semibold text-slate-800">{p.name}</span>
                        <span className="block text-[11px] text-slate-500">{p.packSize}</span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="block text-sm font-bold text-emerald-700">{formatINR(p.price)}</span>
                        <span className="block text-[10.5px] text-slate-400 line-through">{formatINR(p.mrp)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="flex items-center gap-2 text-[15px] font-extrabold text-slate-900">
            <Icon name="info" className="h-4 w-4 text-emerald-600" /> Coupon terms
          </h3>
          <ul className="mt-3 grid gap-2 text-[12.5px] leading-relaxed text-slate-600 sm:grid-cols-2">
            {[
              "One coupon per order; cannot be combined with a store subscription discount.",
              `Minimum order values are calculated on the payable subtotal after product discounts.`,
              "Coupons are not valid on Schedule X drugs, infant formula and devices already at distributor price.",
              `${STORE.name} may withdraw or modify any coupon without prior notice.`,
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
