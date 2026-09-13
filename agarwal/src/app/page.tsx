import Link from "next/link";
import { Icon } from "@/components/icons";
import HomeSearch from "@/components/HomeSearch";
import ProductCard from "@/components/ProductCard";
import { getCatalogueStats, getCategoriesWithCounts, listProducts } from "@/lib/queries";
import { IMAGES, SEARCH_SUGGESTIONS } from "@/lib/images";
import { STORE, TRUST_POINTS, TESTIMONIALS } from "@/lib/store";

export const dynamic = "force-dynamic";

const POPULAR_SEARCHES = [
  "Paracetamol 650", "Cetirizine 10mg", "Pantoprazole 40", "Vitamin D3 60000 IU", "Metformin 500",
  "Azithromycin 500", "Durex Ultra Thin", "Prega News", "Shelcal 500", "Cough syrup", "Becosules",
  "Minoxidil 5%", "ORS Electral", "Liv-52", "Omron BP monitor", "Condom", "I-Pill", "Sunscreen SPF 50",
  "Protinex", "Pain relief gel",
];

const CITIES = [
  "Jaipur", "Jodhpur", "Kota", "Udaipur", "Ajmer", "Bikaner", "Delhi NCR", "Mumbai", "Bengaluru",
  "Hyderabad", "Ahmedabad", "Chennai", "Pune", "Kolkata", "Indore", "Lucknow", "Chandigarh", "Surat",
];

export default async function HomePage() {
  const [stats, cats, best, deals, wellness] = await Promise.all([
    getCatalogueStats().catch(() => null),
    getCategoriesWithCounts().catch(() => []),
    listProducts({ bestseller: true, limit: 10 }).catch(() => ({ items: [] })),
    listProducts({ deals: true, sort: "discount", limit: 8 }).catch(() => ({ items: [] })),
    listProducts({ category: "sexual-wellness", sort: "popular", limit: 4 }).catch(() => ({ items: [] })),
  ]);

  const productCount = stats?.products ?? 0;
  const wellnessCount = cats.find((c) => c.slug === "sexual-wellness")?.count ?? 0;

  return (
    <>
      {/* ---------------------------------- HERO --------------------------------- */}
      <section className="relative overflow-hidden bg-emerald-950 text-white">
        <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(circle_at_15%_20%,#34d399_0,transparent_45%),radial-gradient(circle_at_85%_10%,#f0abfc_0,transparent_40%),radial-gradient(circle_at_60%_90%,#22d3ee_0,transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold text-emerald-100 ring-1 ring-white/15">
              <Icon name="award" className="h-4 w-4 text-amber-300" />
              Serving families since {STORE.since} · {STORE.stats.years} years at the same counter
            </span>

            <h1 className="mt-5 text-[clamp(2.1rem,5.2vw,3.7rem)] font-extrabold leading-[1.04] tracking-tight">
              {productCount > 0 ? productCount.toLocaleString("en-IN") : "10,000"}+ genuine medicines,
              <span className="block bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                delivered with {STORE.ownerShort}'s personal assurance
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-emerald-100/80">
              {STORE.name} is a licensed retail pharmacy run by {STORE.owner}. Prescription drugs, daily wellness,
              devices and a completely judgement-free sexual wellness &amp; protection counter — verified by our
              pharmacist, packed discreetly and delivered the same day in Jaipur.
            </p>

            <div className="mt-7 max-w-2xl">
              <HomeSearch variant="dark" suggestions={SEARCH_SUGGESTIONS} />
            </div>

            <dl className="mt-9 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { k: `${(productCount || 10000).toLocaleString("en-IN")}`, v: "medicines in stock" },
                { k: `${stats?.brands ?? 45}+`, v: "trusted brands" },
                { k: `${STORE.stats.dailyOrders}+`, v: "orders every day" },
                { k: "4.9★", v: "from 38,000 families" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl bg-white/[0.07] p-3.5 ring-1 ring-white/10">
                  <dt className="text-xl font-extrabold text-white">{s.k}</dt>
                  <dd className="mt-0.5 text-[11.5px] leading-tight text-emerald-100/70">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[28px] ring-1 ring-white/15">
              <img
                src={IMAGES.heroPharmacy}
                alt="Pharmacist assisting a customer at Agarwal Ji Medical Store"
                className="h-[380px] w-full object-cover lg:h-[460px]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-3.5 text-slate-900 shadow-xl backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-600 text-white">
                    <Icon name="shieldCheck" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold">Batch &amp; expiry verified on every strip</p>
                    <p className="truncate text-[11.5px] text-slate-500">
                      Licence {STORE.licence} · {STORE.pharmacist}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-3 top-6 hidden animate-floaty rounded-2xl bg-white p-3 text-slate-900 shadow-2xl ring-1 ring-slate-100 sm:block">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">Same-day delivery</p>
              <p className="mt-0.5 text-[13px] font-extrabold">Order before 7 PM</p>
            </div>
            <div
              className="absolute -right-2 bottom-24 hidden animate-floaty rounded-2xl bg-fuchsia-600 p-3 text-white shadow-2xl [animation-delay:1.5s] sm:block"
            >
              <p className="flex items-center gap-1.5 text-[12px] font-extrabold">
                <Icon name="lock" className="h-3.5 w-3.5" />
                100% discreet
              </p>
              <p className="mt-0.5 text-[11px] text-fuchsia-100">Plain box, no product names</p>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-emerald-900/40">
          <div className="mx-auto flex max-w-7xl gap-8 overflow-hidden px-4 py-3">
            <div className="flex min-w-full shrink-0 animate-marquee items-center gap-8 text-[12px] font-semibold uppercase tracking-[0.14em] text-emerald-200/70">
              {["Cipla", "Sun Pharma", "Mankind", "Dr. Reddy's", "Zydus", "Lupin", "Abbott", "Durex", "Himalaya", "Omron", "Accu-Chek", "Patanjali", "Dabur", "Torrent", "Glenmark"].map(
                (b) => (
                  <span key={b} className="whitespace-nowrap">{b}</span>
                ),
              )}
            </div>
            <div
              aria-hidden
              className="flex min-w-full shrink-0 animate-marquee items-center gap-8 text-[12px] font-semibold uppercase tracking-[0.14em] text-emerald-200/70"
            >
              {["Cipla", "Sun Pharma", "Mankind", "Dr. Reddy's", "Zydus", "Lupin", "Abbott", "Durex", "Himalaya", "Omron", "Accu-Chek", "Patanjali", "Dabur", "Torrent", "Glenmark"].map(
                (b) => (
                  <span key={b} className="whitespace-nowrap">{b}</span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------- CATEGORIES ------------------------------ */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionHead
          eyebrow="Shop by need"
          title={`${cats.length} health categories, one honest counter`}
          sub="From a strip of paracetamol to a digital BP monitor — everything is stocked on our shelves and priced without inflation."
          href="/products"
          linkLabel="Browse all products"
        />
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {cats.map((c) => (
            <Link
              key={c.slug}
              href={`/products?category=${c.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg"
            >
              <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${c.accent}`} />
              <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${c.accent} text-white shadow-md`}>
                <Icon name={c.icon} className="h-5.5 w-5.5" />
              </span>
              <h3 className="mt-3 flex items-center gap-1.5 text-[14px] font-bold leading-tight text-slate-900">
                {c.name}
                {c.ageRestricted && (
                  <span className="rounded bg-fuchsia-100 px-1 text-[9px] font-black text-fuchsia-700">18+</span>
                )}
              </h3>
              <p className="mt-1 text-[11.5px] font-medium text-emerald-700">
                {c.count.toLocaleString("en-IN")} products
              </p>
              <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-snug text-slate-500">{c.tagline}</p>
              <Icon
                name="arrowRight"
                className="absolute bottom-4 right-4 h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-emerald-600"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* --------------------------- SEXUAL WELLNESS ---------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-fuchsia-950 via-purple-950 to-slate-950 py-16 text-white">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_30%,#e879f9_0,transparent_45%),radial-gradient(circle_at_80%_70%,#818cf8_0,transparent_45%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-fuchsia-200 ring-1 ring-white/15">
              <Icon name="lock" className="h-3.5 w-3.5" />
              Adults only · 18+ · Discreet counter
            </span>
            <h2 className="mt-4 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-tight">
              Sexual wellness &amp; protection, handled with complete respect
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fuchsia-100/75">
              {wellnessCount > 0 ? `${wellnessCount.toLocaleString("en-IN")} products` : "Hundreds of products"} across
              condoms, contraceptives, lubricants, delay sprays, pregnancy tests and clinician-approved intimate care.
              Ask anything — {STORE.ownerShort}'s team answers without a single awkward question, and your parcel arrives
              in a plain brown box with no product names on the label.
            </p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {[
                { icon: "package", text: "Plain, unmarked packaging on every order" },
                { icon: "shieldCheck", text: "ISO-certified condoms & sealed lubricants" },
                { icon: "clock", text: "Emergency pill delivered in ~90 minutes in Jaipur" },
                { icon: "headset", text: "Private pharmacist counselling on WhatsApp" },
              ].map((f) => (
                <li key={f.text} className="flex items-start gap-2.5 rounded-xl bg-white/[0.06] p-3 text-[13px] text-fuchsia-50 ring-1 ring-white/10">
                  <Icon name={f.icon} className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-300" />
                  {f.text}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Condoms", "Lubricants", "Emergency pill", "Pregnancy test", "Delay spray", "Oral contraceptives"].map(
                (chip) => (
                  <Link
                    key={chip}
                    href={`/products?q=${encodeURIComponent(chip)}`}
                    className="rounded-full bg-white/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/20"
                  >
                    {chip}
                  </Link>
                ),
              )}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/sexual-wellness"
                className="inline-flex items-center gap-2 rounded-full bg-fuchsia-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-900/40 transition hover:bg-fuchsia-500"
              >
                Open the 18+ counter
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <Link
                href="/products?category=sexual-wellness"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-bold text-white ring-1 ring-white/20 transition hover:bg-white/20"
              >
                Browse all {wellnessCount > 0 ? wellnessCount.toLocaleString("en-IN") : "wellness"} products
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {wellness.items.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                href={`/product/${p.slug}`}
                className="flex items-center gap-3 rounded-2xl bg-white/[0.07] p-3 ring-1 ring-white/10 transition hover:bg-white/[0.12]"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white">
                  <Icon name="shield" className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-bold text-white">{p.name}</span>
                  <span className="block truncate text-[11.5px] text-fuchsia-200/70">{p.packSize}</span>
                </span>
                <span className="text-right">
                  <span className="block text-sm font-extrabold text-white">₹{Math.round(p.price)}</span>
                  <span className="block text-[11px] text-fuchsia-200/60 line-through">₹{Math.round(p.mrp)}</span>
                </span>
              </Link>
            ))}
            <div className="rounded-2xl border border-dashed border-fuchsia-400/40 bg-fuchsia-950/40 p-4 text-[12.5px] leading-relaxed text-fuchsia-100/80">
              <strong className="text-white">Note from {STORE.ownerShort}:</strong> contraception and protection are
              healthcare, not embarrassment. If you are unsure what to buy, message us on WhatsApp{" "}
              {STORE.phoneDisplay} — a registered pharmacist will guide you privately.
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ BESTSELLERS ------------------------------ */}
      {best.items.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14">
          <SectionHead
            eyebrow="Most ordered this month"
            title="Bestsellers from our shelves"
            sub="The medicines Jaipur reorders every week — always in stock, always within expiry."
            href="/products?sort=popular"
            linkLabel="View all bestsellers"
          />
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {best.items.slice(0, 10).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* --------------------------------- DEALS --------------------------------- */}
      {deals.items.length > 0 && (
        <section className="bg-white py-14">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-stretch">
              <div className="relative overflow-hidden rounded-3xl">
                <img src={IMAGES.pills} alt="Medicines on offer" className="h-full min-h-[240px] w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-amber-300">Price-drop corner</p>
                  <h3 className="mt-1.5 text-2xl font-extrabold leading-tight">Up to 32% off on daily medicines</h3>
                  <p className="mt-1.5 text-[13px] text-emerald-100/85">
                    Chronic-care refills, vitamins and devices at our counter price — no inflated MRP games.
                  </p>
                  <Link
                    href="/offers"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-emerald-800 transition hover:bg-amber-300"
                  >
                    See all offers <Icon name="arrowRight" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {deals.items.slice(0, 8).map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------ PRESCRIPTION ----------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-8 overflow-hidden rounded-[32px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-7 lg:grid-cols-[1fr_380px] lg:p-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-emerald-800">
              <Icon name="prescription" className="h-3.5 w-3.5" />
              Rx medicines · Schedule H &amp; H1
            </span>
            <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)] font-extrabold leading-tight text-slate-900">
              Send a photo of your prescription. We do the rest.
            </h2>
            <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-slate-600">
              {stats?.rx ? `${stats.rx.toLocaleString("en-IN")} prescription medicines` : "Thousands of prescription drugs"}{" "}
              in our catalogue are dispensed only after our registered pharmacist verifies your doctor's slip. Upload
              once, and we auto-build the cart, call you for confirmation and deliver.
            </p>

            <ol className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { n: "01", icon: "upload", t: "Upload or WhatsApp", d: "Snap the prescription with the doctor's name, registration number and date visible." },
                { n: "02", icon: "headset", t: "Pharmacist verifies", d: `${STORE.pharmacist.split("(")[0].trim()} checks dosage, interactions and substitutes nothing without asking you.` },
                { n: "03", icon: "truck", t: "Doorstep delivery", d: "Same day in Jaipur, 2–4 days elsewhere, with a GST bill and batch details." },
              ].map((s) => (
                <li key={s.n} className="rounded-2xl border border-emerald-100 bg-white p-4">
                  <div className="flex items-center gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-600 text-white">
                      <Icon name={s.icon} className="h-4.5 w-4.5" />
                    </span>
                    <span className="text-[11px] font-black text-emerald-700">{s.n}</span>
                  </div>
                  <p className="mt-2.5 text-[14px] font-bold text-slate-900">{s.t}</p>
                  <p className="mt-1 text-[12.5px] leading-snug text-slate-500">{s.d}</p>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/prescription"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
              >
                Upload prescription <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <a
                href={`https://wa.me/${STORE.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white px-6 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
              >
                <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp us
              </a>
            </div>
          </div>

          <div className="relative hidden overflow-hidden rounded-3xl lg:block">
            <img src={IMAGES.counter} alt="Pharmacists at the dispensing counter" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 to-transparent" />
          </div>
        </div>
      </section>

      {/* --------------------------------- TRUST --------------------------------- */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            eyebrow="Why 38,000 families choose us"
            title="A pharmacy that behaves like a pharmacy"
            sub="No marketplaces, no third-party sellers, no expired stock pushed on discount. Just Agarwal Ji's counter rules."
          />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_POINTS.map((t) => (
              <div key={t.title} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition hover:border-emerald-200 hover:bg-emerald-50/40">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                  <Icon name={t.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-3.5 text-[15px] font-bold text-slate-900">{t.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------- OWNER --------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 rounded-[32px] border border-slate-200 bg-white p-7 lg:grid-cols-[420px_1fr] lg:p-10">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl bg-emerald-900">
              <img
                src={IMAGES.owner}
                alt={`${STORE.owner}, owner of ${STORE.name}`}
                className="h-[380px] w-full object-cover lg:h-[440px]"
              />
            </div>
            <div className="absolute -bottom-4 left-5 rounded-2xl bg-emerald-600 px-4 py-3 text-white shadow-xl">
              <p className="text-[13px] font-extrabold">{STORE.owner}</p>
              <p className="text-[11px] text-emerald-100">Owner &amp; chief pharmacist-in-charge</p>
            </div>
          </div>

          <div className="lg:pl-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-amber-900">
              <Icon name="award" className="h-3.5 w-3.5" />
              The owner
            </span>
            <h2 className="mt-4 text-[clamp(1.7rem,3.6vw,2.5rem)] font-extrabold leading-tight text-slate-900">
              “If I would not give it to my own family, it does not leave my counter.”
            </h2>
            <div className="mt-4 space-y-3.5 text-[14.5px] leading-relaxed text-slate-600">
              <p>
                {STORE.owner} opened a single shutter shop on Gopal Bari Road in {STORE.since} with a wooden rack, a
                ledger and a promise: sell only genuine medicine at a fair price. Three decades later{" "}
                {STORE.name} ships {productCount > 0 ? productCount.toLocaleString("en-IN") : "10,000"}+ products across{" "}
                {STORE.stats.cities} cities, but the ledger rule has not changed.
              </p>
              <p>
                Every Schedule H order is read by a registered pharmacist before packing. Every expiry date is checked
                twice. And every customer — whether buying insulin for a parent or a packet of condoms at midnight —
                is treated with exactly the same quiet professionalism.
              </p>
              <p>
                The 18+ wellness counter was added in 2014 because {STORE.ownerShort} noticed young customers walking
                out of other shops embarrassed. Today it is one of the most ordered categories on this website, and it
                ships in packaging that reveals nothing.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { k: `${STORE.stats.years}`, v: "years in service" },
                { k: `${(productCount || 10000).toLocaleString("en-IN")}+`, v: "products listed" },
                { k: `${STORE.stats.cities}`, v: "cities delivered" },
                { k: `${STORE.stats.pincodeServed}+`, v: "pincodes served" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl bg-emerald-50 p-3.5 ring-1 ring-emerald-100">
                  <p className="text-lg font-extrabold text-emerald-800">{s.k}</p>
                  <p className="mt-0.5 text-[11.5px] leading-tight text-emerald-700/80">{s.v}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Our story &amp; licences <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${STORE.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-emerald-400 hover:text-emerald-700"
              >
                <Icon name="phone" className="h-4 w-4" /> {STORE.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ TESTIMONIALS ----------------------------- */}
      <section className="bg-emerald-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-emerald-200 ring-1 ring-white/10">
              <Icon name="star" filled className="h-3.5 w-3.5 text-amber-300" strokeWidth={0} />
              4.9 average from 12,400 reviews
            </span>
            <h2 className="mt-4 text-[clamp(1.7rem,3.6vw,2.4rem)] font-extrabold leading-tight">
              What our customers say
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/10">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Icon key={i} name="star" filled className="h-4 w-4" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-[13.5px] leading-relaxed text-emerald-50/85">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-4 border-t border-white/10 pt-3">
                  <p className="text-[13px] font-bold text-white">{t.name}</p>
                  <p className="text-[11.5px] text-emerald-200/70">{t.city}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- SEARCHES & CITIES --------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-extrabold text-slate-900">Popular searches this week</h3>
            <p className="mt-1 text-[13px] text-slate-500">
              Tap any salt, brand or product to see live stock and price.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((s) => (
                <Link
                  key={s}
                  href={`/products?q=${encodeURIComponent(s)}`}
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-[12.5px] font-medium text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-extrabold text-slate-900">Where we deliver</h3>
            <p className="mt-1 text-[13px] text-slate-500">
              Same-day inside Jaipur ring road · 24–72 hours for the rest of India via cold-chain safe packaging.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {CITIES.map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-[12.5px] font-medium text-slate-600 ring-1 ring-slate-200"
                >
                  <Icon name="mapPin" className="h-3.5 w-3.5 text-emerald-600" />
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4">
              <Icon name="truck" className="h-8 w-8 text-emerald-700" />
              <p className="text-[13px] leading-snug text-emerald-900">
                Free delivery on orders above <strong>₹{STORE.freeDeliveryAbove}</strong> · otherwise ₹
                {STORE.deliveryFee}. Express in Jaipur for ₹{STORE.expressDeliveryFee}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <span className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-emerald-700">{eyebrow}</span>
        <h2 className="mt-2 text-[clamp(1.5rem,3.2vw,2.2rem)] font-extrabold leading-tight tracking-tight text-slate-900">
          {title}
        </h2>
        {sub && <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{sub}</p>}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-300 px-4 py-2 text-[13px] font-bold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
        >
          {linkLabel} <Icon name="arrowRight" className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
