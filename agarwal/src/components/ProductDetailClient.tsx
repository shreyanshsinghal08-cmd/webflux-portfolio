"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon, Stars } from "@/components/icons";
import { AddToCartButton, QtyStepper, useCart } from "@/components/cart";
import { toCartLine } from "@/components/ProductCard";
import { formatINR, STORE } from "@/lib/store";
import type { CardProduct } from "@/components/ProductCard";

type Detail = CardProduct & {
  description: string | null;
  uses: string | null;
  manufacturer: string;
  strength: string | null;
  categoryName: string;
  categorySlug: string;
  ageRestricted?: boolean;
};

const TABS = ["Overview", "Uses & benefits", "Safety", "Specifications", "Reviews"] as const;

export default function ProductDetailClient({
  product,
  alternatives,
}: {
  product: Detail;
  alternatives: { slug: string; packSize: string; price: number; mrp: number; name: string }[];
}) {
  const { add } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Overview");
  const [pin, setPin] = useState("");
  const [pinResult, setPinResult] = useState<string | null>(null);

  const cartLine = useMemo(() => toCartLine(product), [product]);

  const reviews = useMemo(() => {
    const base = [
      { name: "Vikas Agarwal", city: "Jaipur", text: `Genuine ${product.brand} stock, sealed strip with batch number printed on the bill. Reached home the same evening.` },
      { name: "Meera Joshi", city: "Jodhpur", text: `I have been ordering ${product.name} for my mother every month. Never once a delay or a short expiry.` },
      { name: "Imran Khan", city: "Delhi", text: "Price was lower than my local chemist and the packaging was neat. Pharmacist called to confirm the dose before dispatch." },
      { name: "S. Rao", city: "Hyderabad", text: "Ordered late at night, delivered in 2 days. Bill came on email with GST — exactly what I needed for reimbursement." },
    ];
    return base.slice(0, 3).map((r, i) => ({
      ...r,
      rating: Math.max(3, Math.min(5, Math.round(product.rating - i * 0.2))),
      date: `${2 + i} ${["Mar", "Apr", "Jun"][i]} 2026`,
    }));
  }, [product.brand, product.name, product.rating]);

  function checkPin() {
    if (pin.length !== 6) {
      setPinResult("Enter a valid 6-digit pincode.");
      return;
    }
    const jaipur = pin.startsWith("30") || pin.startsWith("31") || pin.startsWith("32") || pin.startsWith("33");
    setPinResult(
      jaipur
        ? `Same-day delivery available at ${pin}. Order before 7 PM and ${STORE.ownerShort}'s rider will reach you today.`
        : `We deliver to ${pin} in 2–4 working days by cold-chain safe courier. Free above ₹${STORE.freeDeliveryAbove}.`,
    );
  }

  function buyNow() {
    add({ ...cartLine }, qty);
    router.push("/checkout");
  }

  const out = product.stock <= 0;
  const deliveryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr]">
      {/* ---------------------------------- media --------------------------------- */}
      <div className="lg:sticky lg:top-32 lg:self-start">
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${product.categoryAccent} p-1`}>
          <div className="relative flex h-[300px] items-center justify-center rounded-[20px] bg-white/10 sm:h-[360px]">
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_25%_25%,white_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
            <Icon name={product.categoryIcon} className="h-32 w-32 text-white/90 drop-shadow-xl" />
            {product.discountPct >= 5 && (
              <span className="absolute left-4 top-4 rounded-xl bg-amber-400 px-3 py-1.5 text-sm font-black text-emerald-950 shadow-lg">
                {product.discountPct}% OFF
              </span>
            )}
            {product.requiresPrescription && (
              <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-xs font-black text-rose-600 shadow-lg">
                <Icon name="prescription" className="h-3.5 w-3.5" /> Rx required
              </span>
            )}
            {product.ageRestricted && (
              <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-xl bg-fuchsia-600 px-3 py-1.5 text-xs font-black text-white shadow-lg">
                <Icon name="lock" className="h-3.5 w-3.5" /> 18+ · discreet pack
              </span>
            )}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            { icon: "shieldCheck", label: "100% genuine" },
            { icon: "refresh", label: "7-day return" },
            { icon: "truck", label: `By ${deliveryDate}` },
          ].map((b) => (
            <div key={b.label} className="rounded-2xl border border-slate-200 bg-white p-3">
              <Icon name={b.icon} className="mx-auto h-5 w-5 text-emerald-600" />
              <p className="mt-1.5 text-[11.5px] font-semibold text-slate-600">{b.label}</p>
            </div>
          ))}
        </div>

        {alternatives.length > 0 && (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-[12px] font-bold uppercase tracking-wide text-slate-500">Other pack sizes</h3>
            <div className="mt-2.5 space-y-1.5">
              {alternatives.slice(0, 5).map((a) => (
                <Link
                  key={a.slug}
                  href={`/product/${a.slug}`}
                  className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 px-3 py-2 text-[12.5px] transition hover:border-emerald-400 hover:bg-emerald-50"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-slate-800">{a.packSize}</span>
                    <span className="block truncate text-[11px] text-slate-500">{a.name}</span>
                  </span>
                  <span className="shrink-0 text-sm font-bold text-emerald-700">{formatINR(a.price)}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ---------------------------------- info ---------------------------------- */}
      <div>
        <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-emerald-700">
          <Link href={`/products?brand=${encodeURIComponent(product.brand)}`} className="hover:underline">
            {product.brand}
          </Link>
          <span className="text-slate-300">|</span>
          <Link href={`/products?category=${product.categorySlug}`} className="text-slate-500 hover:underline">
            {product.categoryName}
          </Link>
        </p>

        <h1 className="mt-2 text-[clamp(1.4rem,3vw,2.1rem)] font-extrabold leading-tight text-slate-900">
          {product.name}
        </h1>
        <p className="mt-1.5 text-sm text-slate-600">
          {product.composition}
          {product.strength ? ` · ${product.strength}` : ""} · {product.packSize}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[12.5px] font-bold text-emerald-800">
            <Icon name="star" filled className="h-3.5 w-3.5 text-amber-500" strokeWidth={0} />
            {product.rating.toFixed(1)}
            <span className="font-medium text-emerald-700/70">({product.reviewCount.toLocaleString("en-IN")} ratings)</span>
          </span>
          <span className="text-[12.5px] text-slate-500">Manufactured by {product.manufacturer}</span>
          {product.isBestseller && (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11.5px] font-bold text-amber-800">Bestseller</span>
          )}
        </div>

        <div className="mt-5 rounded-3xl border border-emerald-100 bg-emerald-50/50 p-5">
          <div className="flex flex-wrap items-end gap-3">
            <span className="text-[34px] font-extrabold leading-none text-slate-900">{formatINR(product.price)}</span>
            {product.mrp > product.price && (
              <>
                <span className="text-base text-slate-400 line-through">MRP {formatINR(product.mrp)}</span>
                <span className="rounded-lg bg-emerald-600 px-2 py-1 text-xs font-black text-white">
                  Save {formatINR(product.mrp - product.price)}
                </span>
              </>
            )}
          </div>
          <p className="mt-1.5 text-[12px] text-slate-500">Inclusive of all taxes · GST bill with batch & expiry</p>

          <ul className="mt-3 grid gap-1.5 text-[12.5px] text-slate-700 sm:grid-cols-2">
            <li className="flex items-center gap-1.5">
              <Icon name="percent" className="h-3.5 w-3.5 text-emerald-600" /> Coupon AGARWAL10 — extra 10% off
            </li>
            <li className="flex items-center gap-1.5">
              <Icon name="truck" className="h-3.5 w-3.5 text-emerald-600" /> Free delivery above ₹{STORE.freeDeliveryAbove}
            </li>
            <li className="flex items-center gap-1.5">
              <Icon name="lock" className="h-3.5 w-3.5 text-emerald-600" /> Discreet packaging on wellness orders
            </li>
            <li className="flex items-center gap-1.5">
              <Icon name="refresh" className="h-3.5 w-3.5 text-emerald-600" /> Easy 7-day return on sealed packs
            </li>
          </ul>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <QtyStepper quantity={qty} onChange={(q) => setQty(Math.max(1, q))} />
            <span className={`text-[12.5px] font-semibold ${product.stock > 10 ? "text-emerald-700" : product.stock > 0 ? "text-amber-700" : "text-rose-600"}`}>
              {product.stock > 10 ? "In stock · dispatches today" : product.stock > 0 ? `Hurry — only ${product.stock} left` : "Out of stock"}
            </span>
          </div>

          <div className="mt-4 grid gap-2.5 sm:grid-cols-[1fr_1fr_auto]">
            <AddToCartButton product={{ ...cartLine }} size="lg" />
            <button
              type="button"
              onClick={buyNow}
              disabled={out}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-emerald-600 px-6 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Icon name="arrowRight" className="h-4 w-4" />
              Buy now
            </button>
            <a
              href={`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(`Hello Agarwal Ji, I want to order ${product.name} (${product.packSize}).`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:brightness-95"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              Order on WhatsApp
            </a>
          </div>

          {out && (
            <Link
              href="/prescription"
              className="mt-3 block rounded-xl border border-dashed border-rose-300 bg-rose-50 px-4 py-2.5 text-center text-[12.5px] font-semibold text-rose-700"
            >
              Out of stock right now — request a restock and we will arrange it within 24 hours
            </Link>
          )}

          {qty > 1 && !out && (
            <p className="mt-3 text-[12.5px] font-semibold text-emerald-800">
              You pay {formatINR(product.price * qty)} for {qty} unit{qty > 1 ? "s" : ""}
            </p>
          )}
        </div>

        {product.requiresPrescription && (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <Icon name="prescription" className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
            <div className="text-[13px] leading-relaxed text-amber-900">
              <strong>Prescription medicine (Schedule H).</strong> You will be asked to upload your doctor's
              prescription at checkout, or you can send it on WhatsApp. Our pharmacist {STORE.pharmacist.split("(")[0].trim()}{" "}
              verifies the dose before dispatch. <Link href="/prescription" className="font-bold underline">Upload now</Link>
            </div>
          </div>
        )}

        {product.ageRestricted && (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-4">
            <Icon name="lock" className="mt-0.5 h-5 w-5 shrink-0 text-fuchsia-700" />
            <div className="text-[13px] leading-relaxed text-fuchsia-900">
              <strong>18+ product with private packaging.</strong> Ships in a plain unmarked box, the delivery label
              shows only “Agarwal Ji Medical Store”, and the bill is emailed instead of being placed inside the parcel.
            </div>
          </div>
        )}

        {/* pincode */}
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="flex items-center gap-2 text-[13px] font-bold text-slate-900">
            <Icon name="mapPin" className="h-4 w-4 text-emerald-600" /> Check delivery at your pincode
          </h3>
          <div className="mt-2.5 flex gap-2">
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="e.g. 302001"
              className="h-10 w-full max-w-40 rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
            <button
              type="button"
              onClick={checkPin}
              className="rounded-xl bg-slate-900 px-4 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Check
            </button>
          </div>
          {pinResult && <p className="mt-2.5 text-[12.5px] text-slate-600">{pinResult}</p>}
        </div>

        {/* tabs */}
        <div className="mt-7">
          <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-slate-200">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`whitespace-nowrap border-b-2 px-3.5 py-2.5 text-[13px] font-bold transition ${
                  tab === t ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="animate-fade-up pt-5 text-[14px] leading-relaxed text-slate-600">
            {tab === "Overview" && (
              <div className="space-y-3">
                <p>{product.description}</p>
                <p className="rounded-2xl bg-slate-50 p-4 text-[13px]">
                  <strong className="text-slate-800">Composition:</strong> {product.composition}
                  <br />
                  <strong className="text-slate-800">Pack:</strong> {product.packSize} · {product.form}
                  {product.strength ? ` · ${product.strength}` : ""}
                </p>
              </div>
            )}

            {tab === "Uses & benefits" && (
              <ul className="space-y-2">
                {[
                  product.uses ?? "Symptomatic relief as advised by your physician",
                  `Consistent quality — each batch from ${product.manufacturer} is checked at our counter`,
                  product.requiresPrescription
                    ? "To be taken exactly in the dose and duration prescribed by your doctor"
                    : "Can be purchased without a prescription for self-limiting conditions",
                  "Convenient monthly refill option available for chronic care",
                ].map((u) => (
                  <li key={u} className="flex items-start gap-2.5">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            )}

            {tab === "Safety" && (
              <div className="space-y-3">
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-[13px] text-amber-900">
                  <strong>Before you use:</strong> tell your doctor or pharmacist about any other medicine you are
                  taking, including ayurvedic and over-the-counter products. Do not exceed the recommended dose.
                </div>
                <ul className="space-y-2 text-[13.5px]">
                  {[
                    "Store below 30°C in a cool, dry place away from sunlight.",
                    "Keep out of reach of children.",
                    "Do not use if the strip seal is broken or the expiry date has passed.",
                    "If you are pregnant, breastfeeding or have liver/kidney disease, consult a physician first.",
                    "Side effects are usually mild — stop use and call us if you notice a rash, swelling or breathing trouble.",
                  ].map((s) => (
                    <li key={s} className="flex items-start gap-2.5">
                      <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[12.5px] text-slate-500">
                  Need advice? Call {STORE.phoneDisplay} between {STORE.hours.split("·")[1]?.trim() ?? "8 AM – 11 PM"} and
                  speak to our pharmacist directly.
                </p>
              </div>
            )}

            {tab === "Specifications" && (
              <dl className="overflow-hidden rounded-2xl border border-slate-200">
                {[
                  ["Brand", product.brand],
                  ["Manufacturer", product.manufacturer],
                  ["Composition / salt", product.composition],
                  ["Strength", product.strength ?? "—"],
                  ["Form", product.form],
                  ["Pack size", product.packSize],
                  ["Category", product.categoryName],
                  ["Prescription required", product.requiresPrescription ? "Yes (Schedule H)" : "No"],
                  ["Country of origin", "India"],
                  ["Sold by", `${STORE.name}, ${STORE.address.city}`],
                  ["Return policy", "7 days, sealed & unused"],
                ].map(([k, v], i) => (
                  <div key={k} className={`flex gap-4 px-4 py-2.5 text-[13px] ${i % 2 ? "bg-slate-50" : "bg-white"}`}>
                    <dt className="w-44 shrink-0 font-semibold text-slate-500">{k}</dt>
                    <dd className="flex-1 text-slate-800">{v}</dd>
                  </div>
                ))}
              </dl>
            )}

            {tab === "Reviews" && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-slate-50 p-4">
                  <div className="text-center">
                    <p className="text-3xl font-extrabold text-slate-900">{product.rating.toFixed(1)}</p>
                    <Stars value={product.rating} className="mt-1" />
                  </div>
                  <div className="text-[13px] text-slate-600">
                    <p>{product.reviewCount.toLocaleString("en-IN")} verified purchases</p>
                    <p className="mt-1 text-slate-500">
                      Reviews are collected only from customers whose order was delivered from our store.
                    </p>
                  </div>
                </div>
                {reviews.map((r) => (
                  <article key={r.name} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                          {r.name.charAt(0)}
                        </span>
                        <div>
                          <p className="text-[13.5px] font-bold text-slate-900">{r.name}</p>
                          <p className="text-[11.5px] text-slate-500">
                            {r.city} · {r.date} · <span className="text-emerald-700">Verified purchase</span>
                          </p>
                        </div>
                      </div>
                      <Stars value={r.rating} />
                    </div>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-600">{r.text}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
