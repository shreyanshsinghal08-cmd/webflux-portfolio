import Link from "next/link";
import { Icon } from "@/components/icons";
import { STORE } from "@/lib/store";
import type { NavCategory } from "@/components/Header";

export default function Footer({ categories }: { categories: NavCategory[] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-emerald-900/10 bg-emerald-950 text-emerald-100">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-600 text-white">
                <Icon name="plus" className="h-6 w-6" strokeWidth={2.6} />
              </span>
              <span className="leading-tight">
                <span className="block text-lg font-extrabold text-white">
                  Agarwal<span className="text-emerald-400">Ji</span>
                </span>
                <span className="block text-[10px] uppercase tracking-[0.16em] text-emerald-300/80">
                  Medical Store · est. {STORE.since}
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-emerald-100/70">
              A family-run pharmacy led by {STORE.owner}, serving {STORE.stats.cities}+ cities with{" "}
              <strong className="text-white">10,000+ genuine medicines</strong>, wellness products, devices and a
              completely judgement-free sexual wellness counter.
            </p>
            <div className="mt-5 space-y-2 text-sm text-emerald-100/80">
              <p className="flex items-start gap-2">
                <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>
                  {STORE.address.line1}, {STORE.address.line2}, {STORE.address.city}, {STORE.address.state}{" "}
                  {STORE.address.pincode}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Icon name="phone" className="h-4 w-4 text-emerald-400" />
                <a href={`tel:${STORE.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {STORE.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Icon name="mail" className="h-4 w-4 text-emerald-400" />
                <a href={`mailto:${STORE.email}`} className="hover:text-white">
                  {STORE.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Icon name="clock" className="h-4 w-4 text-emerald-400" />
                {STORE.hours}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-400">Shop by category</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {categories.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link href={`/products?category=${c.slug}`} className="text-emerald-100/75 transition hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-400">Quick links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { href: "/products", label: "All medicines" },
                { href: "/sexual-wellness", label: "Sexual wellness & protection" },
                { href: "/offers", label: "Offers & coupons" },
                { href: "/prescription", label: "Upload prescription" },
                { href: "/track", label: "Track your order" },
                { href: "/about", label: `About ${STORE.ownerShort}` },
                { href: "/about#faq", label: "FAQs & returns" },
                { href: "/about#contact", label: "Contact & bulk orders" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-emerald-100/75 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-400">Licence & compliance</h3>
            <div className="mt-4 rounded-2xl border border-emerald-800/60 bg-emerald-900/40 p-4 text-xs leading-relaxed text-emerald-100/75">
              <p>
                <strong className="text-white">Retail Drug Licence:</strong> {STORE.licence}
              </p>
              <p className="mt-1.5">
                <strong className="text-white">GSTIN:</strong> {STORE.gstin}
              </p>
              <p className="mt-1.5">
                <strong className="text-white">Responsible pharmacist:</strong> {STORE.pharmacist}
              </p>
              <p className="mt-3 border-t border-emerald-800/60 pt-3">
                Schedule H, H1 & X drugs are dispensed only against a valid prescription from a registered medical
                practitioner, as required by the Drugs & Cosmetics Rules, 1945.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {["whatsapp", "facebook", "instagram", "twitter"].map((s) => (
                <a
                  key={s}
                  href={s === "whatsapp" ? `https://wa.me/${STORE.whatsapp}` : "#"}
                  aria-label={s}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-emerald-800 bg-emerald-900/50 text-emerald-200 transition hover:bg-emerald-700 hover:text-white"
                >
                  <Icon name={s} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-emerald-900/60 pt-6 text-xs text-emerald-200/60 md:flex-row">
          <p>
            © {year} {STORE.name}. Owned & operated by {STORE.owner}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-lg border border-emerald-800 px-2 py-1 font-semibold">UPI</span>
            <span className="rounded-lg border border-emerald-800 px-2 py-1 font-semibold">VISA</span>
            <span className="rounded-lg border border-emerald-800 px-2 py-1 font-semibold">RuPay</span>
            <span className="rounded-lg border border-emerald-800 px-2 py-1 font-semibold">Mastercard</span>
            <span className="rounded-lg border border-emerald-800 px-2 py-1 font-semibold">Net banking</span>
            <span className="rounded-lg border border-emerald-800 px-2 py-1 font-semibold">COD</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
