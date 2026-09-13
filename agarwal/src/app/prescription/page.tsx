import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { PrescriptionForm } from "@/components/forms";
import ProductCard from "@/components/ProductCard";
import { listProducts } from "@/lib/queries";
import { IMAGES } from "@/lib/images";
import { STORE } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Upload prescription & order Rx medicines",
  description: `Send a photo of your prescription to ${STORE.name}. Our registered pharmacist verifies Schedule H medicines and delivers with batch & expiry printed on the GST bill.`,
};

const ACCEPTS = [
  { icon: "check", t: "Photo or scan of the doctor's slip", d: "Doctor's name, registration number, date, patient name and dosage must be readable." },
  { icon: "check", t: "Hospital discharge summaries", d: "We pick the medicines from the summary and confirm the list with you on call." },
  { icon: "check", t: "Refill of an old prescription", d: "Valid for chronic medicines where the doctor has advised continued use." },
  { icon: "alert", t: "What we cannot accept", d: "Blurry photos, prescriptions older than 1 year, Schedule X narcotics, or slips without a registration number." },
];

export default async function PrescriptionPage() {
  const rxItems = await listProducts({ rx: "yes", sort: "popular", limit: 10 }).catch(() => ({ items: [] }));

  return (
    <>
      <section className="relative overflow-hidden bg-emerald-950 py-14 text-white">
        <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_20%_20%,#34d399_0,transparent_45%),radial-gradient(circle_at_80%_60%,#22d3ee_0,transparent_40%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-emerald-100 ring-1 ring-white/15">
              <Icon name="prescription" className="h-3.5 w-3.5" /> Schedule H &amp; H1 medicines
            </span>
            <h1 className="mt-4 text-[clamp(1.9rem,4.6vw,3.1rem)] font-extrabold leading-[1.06]">
              Upload your prescription. We build the order for you.
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-emerald-100/80">
              Send a photo of the doctor's slip and {STORE.ownerShort}'s pharmacist reads it, checks the dosage and
              interactions, calls you if anything is unclear, then dispatches with a GST bill showing batch number and
              expiry date. No substitute is ever sent without asking you first.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent("Hello Agarwal Ji, I am sending my prescription.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white"
              >
                <Icon name="whatsapp" className="h-4 w-4" /> Send on WhatsApp
              </a>
              <a
                href={`tel:${STORE.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-bold text-white ring-1 ring-white/20 transition hover:bg-white/20"
              >
                <Icon name="phone" className="h-4 w-4" /> {STORE.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="relative hidden overflow-hidden rounded-3xl ring-1 ring-white/15 lg:block">
            <img src={IMAGES.shelves} alt="Pharmacist arranging medicines" className="h-[320px] w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/95 p-3.5 text-slate-900">
              <p className="text-[12.5px] font-bold">Verified by {STORE.pharmacist}</p>
              <p className="mt-0.5 text-[11.5px] text-slate-500">Average verification time: 11 minutes</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:items-start">
          <PrescriptionForm />

          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h2 className="text-base font-extrabold text-slate-900">What we accept</h2>
              <ul className="mt-4 space-y-3.5">
                {ACCEPTS.map((a) => (
                  <li key={a.t} className="flex gap-3">
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${a.icon === "check" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                      <Icon name={a.icon} className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-[13.5px] font-bold text-slate-900">{a.t}</span>
                      <span className="block text-[12.5px] leading-snug text-slate-500">{a.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-emerald-950 p-6 text-white">
              <h2 className="text-base font-extrabold">How it works</h2>
              <ol className="mt-4 space-y-3 text-[13px]">
                {[
                  ["You send the prescription", "Upload here or WhatsApp it to the store number."],
                  ["Pharmacist verifies", "Dosage, drug interactions and validity are checked manually."],
                  ["We call to confirm", "You approve the exact list, quantity and any substitution."],
                  ["Packed & dispatched", "Same day in Jaipur, 2–4 days elsewhere, with a GST bill."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-600 text-[12px] font-black">{i + 1}</span>
                    <span>
                      <span className="block font-bold text-white">{t}</span>
                      <span className="block text-emerald-100/70">{d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="flex items-center gap-2 text-[15px] font-extrabold text-amber-900">
                <Icon name="alert" className="h-4.5 w-4.5" /> Responsible dispensing
              </h2>
              <p className="mt-2 text-[12.5px] leading-relaxed text-amber-900/80">
                Under the Drugs &amp; Cosmetics Rules, 1945 we cannot dispense Schedule H, H1 or X medicines without a
                valid prescription from a registered medical practitioner. We also do not supply antibiotics without one —
                antibiotic resistance is a public-health issue {STORE.ownerShort} takes seriously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {rxItems.items.length > 0 && (
        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Frequently prescribed medicines</h2>
                <p className="mt-1 text-[13.5px] text-slate-500">
                  These need a valid prescription — add them to the cart and upload your slip at checkout.
                </p>
              </div>
              <Link
                href="/products?rx=yes"
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 px-4 py-2 text-[13px] font-bold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
              >
                See all Rx medicines <Icon name="arrowRight" className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {rxItems.items.slice(0, 10).map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
