import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { AgeGate, Accordion } from "@/components/widgets";
import HomeSearch from "@/components/HomeSearch";
import ProductCard from "@/components/ProductCard";
import { getCatalogueStats, getCategoriesWithCounts, listProducts } from "@/lib/queries";
import { STORE } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sexual Wellness & Protection — Discreet 18+ Pharmacy Counter",
  description: `Condoms, contraceptives, lubricants, delay sprays, pregnancy tests and intimate care from ${STORE.name}. 100% discreet plain packaging, genuine sealed products, pharmacist counselling on WhatsApp.`,
};

const TYPES = [
  { label: "Ultra thin condoms", q: "ultra thin condom", icon: "shield" },
  { label: "Dotted & ribbed", q: "dotted condom", icon: "sparkle" },
  { label: "Flavoured condoms", q: "flavoured condom", icon: "leaf" },
  { label: "Extra-time / delay", q: "delay spray", icon: "clock" },
  { label: "Lubricants & gels", q: "lubricant", icon: "droplet" },
  { label: "Daily contraceptive pill", q: "oral contraceptive", icon: "capsule" },
  { label: "Emergency pill (72 hrs)", q: "levonorgestrel", icon: "flame" },
  { label: "Pregnancy test kits", q: "pregnancy test", icon: "thermometer" },
  { label: "Copper-T / IUD", q: "copper", icon: "shieldCheck" },
  { label: "Men's wellness", q: "shilajit", icon: "heart" },
  { label: "Women's intimate care", q: "intimate wash", icon: "sparkles" },
  { label: "PCOS & fertility support", q: "inositol", icon: "baby" },
];

const GUIDES = [
  {
    title: "Choosing the right condom",
    body: "Latex condoms are the only method that protects against pregnancy and STIs at the same time. Check for the ISO 4074 mark, the expiry date and an intact foil seal. If latex irritates either partner, switch to a non-latex polyisoprene condom. Ultra-thin variants feel closer to natural but are tested to the same burst standard.",
  },
  {
    title: "Emergency contraception window",
    body: "A levonorgestrel 1.5 mg pill works best within 24 hours and remains licensed up to 72 hours after unprotected sex — earlier is always better. It is not for regular use and does not protect against STIs. Expect a period shift of a few days; if it is delayed by more than a week, take a pregnancy test and see a gynaecologist.",
  },
  {
    title: "Daily pill vs weekly pill vs Copper-T",
    body: "Combined daily pills (21 or 28 tablets) are highly effective when taken at the same hour every day. Ormeloxifene is a non-steroidal weekly pill taken twice a week for the first month. A Copper-T 375 is hormone-free and works for up to 5 years but must be inserted by a doctor. Our pharmacist can explain side effects before you choose.",
  },
  {
    title: "Water-based or silicone lubricant?",
    body: "Water-based lubricants are safe with latex condoms and easy to wash off, making them the default choice. Silicone-based lubricants last longer and are suitable for sensitive skin, but should not be used with silicone toys. Avoid oil, petroleum jelly or coconut oil with latex — oil breaks down the condom within minutes.",
  },
];

export default async function SexualWellnessPage() {
  const [cats, stats, items, kits] = await Promise.all([
    getCategoriesWithCounts().catch(() => []),
    getCatalogueStats().catch(() => null),
    listProducts({ category: "sexual-wellness", limit: 20 }).catch(() => ({ items: [] })),
    listProducts({ q: "pregnancy test", limit: 5 }).catch(() => ({ items: [] })),
  ]);
  const cat = cats.find((c) => c.slug === "sexual-wellness");
  const count = cat?.count ?? stats?.products ?? 0;

  return (
    <AgeGate>
      <section className="relative overflow-hidden bg-gradient-to-br from-fuchsia-950 via-purple-900 to-slate-950 py-16 text-white">
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_15%_25%,#f0abfc_0,transparent_45%),radial-gradient(circle_at_85%_15%,#818cf8_0,transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl px-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-fuchsia-100 ring-1 ring-white/15">
            <Icon name="lock" className="h-3.5 w-3.5" /> 18+ counter · Private &amp; judgement-free
          </span>
          <h1 className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.05]">
            Protection, pleasure and privacy — the way healthcare should be
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fuchsia-100/80">
            {count > 0 ? `${count.toLocaleString("en-IN")} products` : "A full range"} across condoms, contraceptives,
            lubricants, pregnancy tests, delay sprays and intimate care — all sealed, all genuine, all delivered in a
            plain box that says nothing about what is inside. {STORE.ownerShort} started this counter in 2014 because
            customers deserved to buy protection without embarrassment.
          </p>
          <div className="mt-7 max-w-2xl">
            <HomeSearch
              variant="dark"
              placeholder="Search condoms, pills, lubricants, tests…"
              suggestions={["Durex", "Condom", "Lubricant", "i-Pill", "Prega News", "Delay spray"]}
            />
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "package", t: "Plain unmarked box", d: "No product names on the delivery label" },
              { icon: "shieldCheck", t: "Sealed & genuine", d: "ISO-certified condoms, batch verified" },
              { icon: "clock", t: "~90 min in Jaipur", d: "Emergency pill on express delivery" },
              { icon: "headset", t: "Private counselling", d: "Pharmacist replies on WhatsApp" },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
                <Icon name={f.icon} className="h-5 w-5 text-fuchsia-300" />
                <p className="mt-2 text-[13.5px] font-bold text-white">{f.t}</p>
                <p className="mt-0.5 text-[12px] leading-snug text-fuchsia-100/70">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Shop by type</h2>
        <p className="mt-1 text-[13.5px] text-slate-500">
          Tap a type to see live stock and prices — everything below is dispensed by our licensed pharmacy.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
          {TYPES.map((t) => (
            <Link
              key={t.label}
              href={`/products?q=${encodeURIComponent(t.q)}`}
              className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 transition hover:-translate-y-0.5 hover:border-fuchsia-300 hover:shadow-lg"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white">
                <Icon name={t.icon} className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13.5px] font-bold text-slate-900 group-hover:text-fuchsia-700">{t.label}</span>
                <span className="block text-[11.5px] text-slate-500">View products</span>
              </span>
              <Icon name="chevronRight" className="ml-auto h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-fuchsia-500" />
            </Link>
          ))}
        </div>
      </section>

      {items.items.length > 0 && (
        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Most ordered from the 18+ counter</h2>
                <p className="mt-1 text-[13.5px] text-slate-500">
                  Discreet packaging is applied automatically to every order that contains these products.
                </p>
              </div>
              <Link
                href="/products?category=sexual-wellness"
                className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-300 px-4 py-2 text-[13px] font-bold text-fuchsia-700 transition hover:bg-fuchsia-600 hover:text-white"
              >
                View all {count > 0 ? count.toLocaleString("en-IN") : ""} products <Icon name="arrowRight" className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {items.items.slice(0, 15).map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
              Read before you buy — from our pharmacist
            </h2>
            <p className="mt-1 text-[13.5px] text-slate-500">
              Practical, non-preachy information written by {STORE.pharmacist.split("(")[0].trim()} for customers who ask
              at the counter every day.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {GUIDES.map((g) => (
                <article key={g.title} className="rounded-3xl border border-slate-200 bg-white p-5">
                  <h3 className="flex items-center gap-2 text-[14.5px] font-extrabold text-slate-900">
                    <Icon name="info" className="h-4 w-4 text-fuchsia-600" />
                    {g.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{g.body}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl bg-gradient-to-br from-fuchsia-600 to-purple-700 p-6 text-white">
              <Icon name="lock" className="h-7 w-7" />
              <h3 className="mt-3 text-lg font-extrabold">How your parcel arrives</h3>
              <ol className="mt-3 space-y-2.5 text-[13px] leading-snug text-fuchsia-50/90">
                {[
                  "Products are sealed inside an inner wrapper.",
                  "Packed in a plain brown box or unmarked carry bag.",
                  "Delivery label shows only “Agarwal Ji Medical Store”.",
                  "GST invoice is emailed, never placed inside the box.",
                  "Rider is not told what the parcel contains.",
                ].map((s, i) => (
                  <li key={s} className="flex gap-2.5">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/20 text-[11px] font-black">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>

            {kits.items.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <h3 className="text-[15px] font-extrabold text-slate-900">Pregnancy test kits</h3>
                <p className="mt-1 text-[12.5px] text-slate-500">Results in 1–5 minutes, 99% accurate from the first day of a missed period.</p>
                <div className="mt-3 space-y-2">
                  {kits.items.slice(0, 3).map((p) => (
                    <Link key={p.slug} href={`/product/${p.slug}`} className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 px-3 py-2 transition hover:border-fuchsia-300">
                      <span className="min-w-0">
                        <span className="block truncate text-[12.5px] font-semibold text-slate-800">{p.name}</span>
                        <span className="block text-[11px] text-slate-500">{p.packSize}</span>
                      </span>
                      <span className="shrink-0 text-sm font-bold text-fuchsia-700">₹{Math.round(p.price)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="flex items-center gap-2 text-[15px] font-extrabold text-slate-900">
                <Icon name="headset" className="h-4.5 w-4.5 text-emerald-600" /> Private counselling
              </h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">
                Not sure which method suits you? Message us — no names, no judgement, no sales pressure. A registered
                pharmacist replies during {STORE.hours.split("·")[1]?.trim()}.
              </p>
              <a
                href={`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent("Hello, I need private advice about protection.")}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[13px] font-bold text-white"
              >
                <Icon name="whatsapp" className="h-4 w-4" /> Chat privately
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Questions customers whisper — answered loudly</h2>
          <div className="mt-5">
            <Accordion
              items={[
                {
                  q: "Will anyone at home know what I ordered?",
                  a: "No. The box is plain, the label says only Agarwal Ji Medical Store, and the invoice goes to your email. If you prefer, our rider can call you before reaching the gate and hand over the parcel personally.",
                },
                {
                  q: "Are the condoms and pills genuine?",
                  a: `Yes. We buy directly from company distributors and every strip carries a batch number and expiry that appears on your GST bill. Our retail licence is ${STORE.licence} and is displayed at the store counter.`,
                },
                {
                  q: "Do I need a prescription for contraceptives?",
                  a: "Emergency contraceptive pills (levonorgestrel 1.5 mg) and condoms are available over the counter. Daily hormonal pills, ormeloxifene and Copper-T devices are Schedule H and need a valid prescription from a registered practitioner — upload it at checkout or send it on WhatsApp.",
                },
                {
                  q: "How fast can you deliver an emergency pill?",
                  a: "Inside Jaipur we reach you in roughly 90 minutes on express delivery (₹99). Elsewhere it is 2–4 working days. If time is critical, call the store and we will tell you honestly whether we can make it.",
                },
                {
                  q: "Is the payment discreet too?",
                  a: "Yes. The charge on your card or UPI statement appears as a pharmacy/medical store name only. Cash on delivery is available everywhere we deliver.",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </AgeGate>
  );
}
