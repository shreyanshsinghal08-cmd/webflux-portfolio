import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { Accordion } from "@/components/widgets";
import { ContactForm } from "@/components/forms";
import { getCatalogueStats, getOrderTotals } from "@/lib/queries";
import { FAQS, STORE, formatINR } from "@/lib/store";
import { IMAGES } from "@/lib/images";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `About ${STORE.ownerShort} — our story, licence & contact`,
  description: `${STORE.name} has been run by ${STORE.owner} since ${STORE.since}. Read our story, verify our drug licence and GSTIN, and contact the store for bulk orders or medicine enquiries.`,
};

const TIMELINE = [
  { year: STORE.since, title: "One shutter on Gopal Bari Road", text: `${STORE.owner} opens a 90 sq ft chemist shop with two wooden racks, a ledger and a borrowed refrigerator for insulin.` },
  { year: 1996, title: "The family joins in", text: "His son Ankur starts handling the counter after school. The store begins keeping rare cardiac and diabetic brands that bigger shops refused to stock." },
  { year: 2005, title: "Hospital supply licence", text: "Wholesale licence added; the store starts supplying nursing homes and clinics across Jaipur, which is how the distributor network grew to 45+ companies." },
  { year: 2014, title: "A judgement-free wellness counter", text: "After noticing young customers walking out embarrassed, a private sexual wellness & protection counter is added with discreet billing." },
  { year: 2020, title: "Home delivery through the pandemic", text: "Riders deliver chronic-care medicines door to door for 2,000+ families during lockdown, with cold-chain packing for insulin." },
  { year: 2026, title: "10,000+ products online", text: `This website lists the full shelf — ${STORE.stats.cities} cities, same-day delivery in Jaipur, prescription verification by a registered pharmacist on every Rx order.` },
];

const VALUES = [
  { icon: "shieldCheck", t: "Genuine or nothing", d: "We buy only from the manufacturer or an authorised C&F agent. If a company cannot give us a proper invoice, we do not stock it." },
  { icon: "rupee", t: "Honest pricing", d: "Discounts come from our buying margin, not from an inflated MRP. The printed price and the billed price always match." },
  { icon: "prescription", t: "Rules followed", d: "Schedule H and H1 medicines are dispensed only against a valid prescription, logged in our H1 register as the law requires." },
  { icon: "lock", t: "Privacy respected", d: "Whatever you buy — insulin, contraceptives or a pregnancy test — is treated with identical professional discretion." },
];

export default async function AboutPage() {
  const [stats, totals] = await Promise.all([
    getCatalogueStats().catch(() => null),
    getOrderTotals().catch(() => ({ orders: 0, revenue: 0 })),
  ]);
  const productCount = stats?.products ?? 0;

  return (
    <>
      <section className="relative overflow-hidden bg-emerald-950 py-14 text-white">
        <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_25%_15%,#34d399_0,transparent_45%),radial-gradient(circle_at_75%_70%,#fbbf24_0,transparent_40%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-3xl ring-1 ring-white/20">
              <img src={IMAGES.owner} alt={STORE.owner} className="h-[420px] w-full object-cover" />
            </div>
            <div className="absolute -bottom-4 left-1/2 w-[92%] -translate-x-1/2 rounded-2xl bg-white p-4 text-slate-900 shadow-2xl">
              <p className="text-[15px] font-extrabold">{STORE.owner}</p>
              <p className="text-[12px] text-slate-500">Founder &amp; owner · {STORE.name}</p>
              <p className="mt-2 flex items-center gap-1.5 text-[11.5px] font-semibold text-emerald-700">
                <Icon name="award" className="h-3.5 w-3.5" /> Serving Jaipur since {STORE.since}
              </p>
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-emerald-100 ring-1 ring-white/15">
              <Icon name="heart" className="h-3.5 w-3.5 text-rose-300" /> {STORE.tagline}
            </span>
            <h1 className="mt-4 text-[clamp(1.9rem,4.6vw,3.1rem)] font-extrabold leading-[1.06]">
              Three generations at the same counter
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-emerald-100/80">
              {STORE.name} is not a marketplace. It is a licensed retail pharmacy in Jaipur owned by {STORE.owner}, who
              still walks in at 8 AM, checks the delivery list and signs the H1 register. Everything you order on this
              website is picked off his shelves, verified by his pharmacist and packed by his team.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { k: `${STORE.stats.years}`, v: "years of service" },
                { k: `${(productCount || 10000).toLocaleString("en-IN")}+`, v: "products on the shelf" },
                { k: `${STORE.stats.dailyOrders}+`, v: "orders dispatched daily" },
                { k: `${totals.orders.toLocaleString("en-IN")}`, v: "orders placed on this site" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl bg-white/[0.07] p-3.5 ring-1 ring-white/10">
                  <p className="text-xl font-extrabold text-white">{s.k}</p>
                  <p className="mt-0.5 text-[11.5px] leading-tight text-emerald-100/70">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900">The four rules of this shop</h2>
        <p className="mt-1 max-w-2xl text-[13.5px] text-slate-500">
          Written on the wall behind the dispensing counter since {STORE.since}.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <article key={v.t} className="rounded-3xl border border-slate-200 bg-white p-5">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                <Icon name={v.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-3.5 text-[15px] font-extrabold text-slate-900">{v.t}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{v.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* timeline */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Our journey</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {TIMELINE.map((t) => (
              <li key={t.year} className="relative rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1 text-[12px] font-black text-white">
                  {t.year}
                </span>
                <h3 className="mt-3 text-[15px] font-extrabold text-slate-900">{t.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* compliance */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-extrabold text-slate-900">Verify us before you trust us</h2>
            <p className="mt-1.5 text-[13.5px] text-slate-500">
              Every pharmacy should publish these. Ours are printed on the wall of the shop too.
            </p>
            <dl className="mt-5 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
              {[
                ["Business name", STORE.name],
                ["Owner / proprietor", STORE.owner],
                ["Retail drug licence", STORE.licence],
                ["GSTIN", STORE.gstin],
                ["Responsible pharmacist", STORE.pharmacist],
                ["Registered address", `${STORE.address.line1}, ${STORE.address.line2}, ${STORE.address.city}, ${STORE.address.state} ${STORE.address.pincode}`],
                ["Store hours", STORE.hours],
                ["Customer care", `${STORE.phoneDisplay} · ${STORE.email}`],
                ["Orders billed on this site", `${totals.orders.toLocaleString("en-IN")} (${formatINR(Math.round(totals.revenue))})`],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-1 px-4 py-3 sm:grid-cols-[220px_1fr] sm:gap-4">
                  <dt className="text-[12px] font-bold uppercase tracking-wide text-slate-500">{k}</dt>
                  <dd className="text-[13.5px] font-medium text-slate-800">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-5">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <img src={IMAGES.vintage} alt="Inside the store" className="h-52 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <h3 className="text-[15px] font-extrabold text-slate-900">Visit the shop</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                  {STORE.address.line1}, {STORE.address.line2}, {STORE.address.city} {STORE.address.pincode}. Walk in for
                  anything we do not list online — if it is licensed for retail in India, we can arrange it in 24 hours.
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${STORE.address.line1}, ${STORE.address.line2}, ${STORE.address.city}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-slate-800"
                >
                  <Icon name="mapPin" className="h-4 w-4" /> Get directions
                </a>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 p-6 text-emerald-950">
              <Icon name="package" className="h-7 w-7" />
              <h3 className="mt-2.5 text-lg font-extrabold">Bulk, hospital &amp; clinic supply</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-emerald-950/80">
                We supply nursing homes, corporate first-aid rooms and NGOs at wholesale rates with full documentation,
                batch-wise invoices and credit terms for registered institutions.
              </p>
              <a
                href={`tel:${STORE.phone.replace(/\s/g, "")}`}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-950 px-5 py-2.5 text-[13px] font-bold text-white"
              >
                <Icon name="phone" className="h-4 w-4" /> Talk to {STORE.ownerShort}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-14 scroll-mt-28">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Frequently asked questions</h2>
          <p className="mt-1 text-[13.5px] text-slate-500">
            Everything customers ask at the counter, answered here so you do not have to ask twice.
          </p>
          <div className="mt-5">
            <Accordion items={FAQS} />
          </div>
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:items-start">
          <ContactForm />

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-extrabold text-slate-900">Reach the store directly</h3>
              <ul className="mt-4 space-y-3 text-[13px]">
                {[
                  { icon: "phone", label: "Phone", value: STORE.phoneDisplay, href: `tel:${STORE.phone.replace(/\s/g, "")}` },
                  { icon: "whatsapp", label: "WhatsApp", value: STORE.phoneDisplay, href: `https://wa.me/${STORE.whatsapp}` },
                  { icon: "mail", label: "Email", value: STORE.email, href: `mailto:${STORE.email}` },
                  { icon: "clock", label: "Hours", value: STORE.hours },
                ].map((c) => (
                  <li key={c.label} className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                      <Icon name={c.icon} className="h-4.5 w-4.5" />
                    </span>
                    <span>
                      <span className="block text-[11.5px] font-bold uppercase tracking-wide text-slate-500">{c.label}</span>
                      {c.href ? (
                        <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block font-semibold text-slate-800 hover:text-emerald-700">
                          {c.value}
                        </a>
                      ) : (
                        <span className="block font-semibold text-slate-800">{c.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-emerald-950 p-6 text-white">
              <h3 className="text-base font-extrabold">Medical emergency?</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-emerald-100/80">
                This website is a pharmacy, not an emergency service. For chest pain, breathing difficulty, overdose,
                severe allergic reaction or poisoning, call an ambulance on <strong className="text-white">108</strong> or
                go to the nearest hospital immediately.
              </p>
              <Link href="/products" className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-emerald-300 hover:text-white">
                Back to the catalogue <Icon name="arrowRight" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
