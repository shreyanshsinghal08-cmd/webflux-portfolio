"use client";

import Link from "next/link";
import { Icon } from "@/components/icons";
import { QtyStepper, useCart } from "@/components/cart";
import { glyphFor } from "@/components/ProductCard";
import { COUPONS, formatINR, STORE } from "@/lib/store";

export default function CartPage() {
  const {
    items,
    count,
    subtotal,
    mrpTotal,
    savings,
    setQty,
    remove,
    clear,
    coupon,
    setCoupon,
    couponResult,
    express,
    setExpress,
    deliveryFee,
    needsPrescription,
  } = useCart();

  const toPay = Math.max(0, subtotal - couponResult.discount + deliveryFee);

  if (items.length === 0) {
    return (
      <div className="mx-auto grid min-h-[55vh] max-w-xl place-items-center px-4 py-16 text-center">
        <div>
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-emerald-50 text-emerald-600">
            <Icon name="cart" className="h-9 w-9" />
          </div>
          <h1 className="mt-6 text-2xl font-extrabold text-slate-900">Your cart is empty</h1>
          <p className="mt-2 text-sm text-slate-600">
            Add medicines, wellness products or devices from our 10,000+ product catalogue. Free delivery above ₹
            {STORE.freeDeliveryAbove}.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/products" className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">
              Start shopping
            </Link>
            <Link href="/sexual-wellness" className="rounded-full border border-fuchsia-300 px-6 py-3 text-sm font-bold text-fuchsia-700 transition hover:bg-fuchsia-50">
              18+ wellness counter
            </Link>
            <Link href="/prescription" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-400">
              Upload prescription
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="flex items-center gap-1.5 text-[12px] text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <Icon name="chevronRight" className="h-3 w-3" />
        <span className="font-semibold text-slate-700">Cart</span>
      </nav>

      <header className="mt-3 flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            Your cart · {count} item{count === 1 ? "" : "s"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            You are saving <strong className="text-emerald-700">{formatINR(savings + couponResult.discount)}</strong> on
            this order compared to MRP.
          </p>
        </div>
        <button
          type="button"
          onClick={clear}
          className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-500 transition hover:border-rose-300 hover:text-rose-600"
        >
          <Icon name="trash" className="h-3.5 w-3.5" /> Empty cart
        </button>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
        <section className="space-y-3">
          {needsPrescription && (
            <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <Icon name="prescription" className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
              <p className="text-[13px] leading-relaxed text-amber-900">
                <strong>Prescription needed.</strong> This cart contains Schedule H medicines. Keep your doctor's
                prescription ready — you can upload it during checkout or send it on WhatsApp{" "}
                {STORE.phoneDisplay} and our pharmacist will verify it in 15 minutes.
                <Link href="/prescription" className="ml-1 font-bold underline">Upload now</Link>
              </p>
            </div>
          )}

          {items.map((item) => (
            <article key={item.productId} className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-4">
              <Link
                href={`/product/${item.slug}`}
                className={`grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${item.categoryAccent} text-white transition hover:opacity-90`}
              >
                <Icon name={glyphFor(item.form)} className="h-10 w-10" />
              </Link>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-700">{item.brand}</p>
                    <Link href={`/product/${item.slug}`} className="mt-0.5 block text-[14.5px] font-bold leading-snug text-slate-900 hover:text-emerald-700">
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-[12px] text-slate-500">
                      {item.composition} · {item.packSize}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.productId)}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Icon name="trash" className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                  <QtyStepper quantity={item.quantity} onChange={(q) => setQty(item.productId, q)} />
                  <div className="text-right">
                    <p className="text-lg font-extrabold text-slate-900">{formatINR(item.price * item.quantity)}</p>
                    {item.mrp > item.price && (
                      <p className="text-[11.5px] text-slate-400 line-through">MRP {formatINR(item.mrp * item.quantity)}</p>
                    )}
                  </div>
                </div>

                {item.requiresPrescription && (
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">
                    <Icon name="prescription" className="h-3 w-3" /> Rx item
                  </p>
                )}
              </div>
            </article>
          ))}

          <div className="flex flex-wrap gap-3 pt-1">
            <Link href="/products" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-700">
              <Icon name="arrowLeft" className="h-4 w-4" /> Continue shopping
            </Link>
            <Link href="/offers" className="inline-flex items-center gap-2 rounded-full border border-emerald-300 px-5 py-2.5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50">
              <Icon name="percent" className="h-4 w-4" /> See today's offers
            </Link>
          </div>
        </section>

        {/* bill summary */}
        <aside className="space-y-4 lg:sticky lg:top-32">
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <h2 className="text-base font-extrabold text-slate-900">Bill summary</h2>

            <div className="mt-4 space-y-2 text-[13px]">
              <Line label={`Item total (${count} items) · MRP`} value={formatINR(mrpTotal)} />
              <Line label="Store discount" value={`− ${formatINR(savings)}`} accent="text-emerald-600" />
              {couponResult.applied && (
                <Line label={`Coupon ${couponResult.applied}`} value={`− ${formatINR(couponResult.discount)}`} accent="text-emerald-600" />
              )}
              <Line label="Delivery" value={deliveryFee === 0 ? "FREE" : formatINR(deliveryFee)} accent={deliveryFee === 0 ? "text-emerald-600" : ""} />
              <div className="flex items-center justify-between border-t border-dashed border-slate-300 pt-3">
                <span className="text-sm font-bold text-slate-900">To pay</span>
                <span className="text-xl font-extrabold text-slate-900">{formatINR(toPay)}</span>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-emerald-50 px-3.5 py-2.5 text-[12.5px] font-bold text-emerald-800">
              Total savings on this order: {formatINR(savings + couponResult.discount)}
            </div>

            <div className="mt-4">
              <label className="text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Coupon code</label>
              <div className="mt-1.5 flex gap-2">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  placeholder="Enter code"
                  className="h-10 w-full rounded-xl border border-slate-300 px-3 text-sm uppercase outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
                <button
                  type="button"
                  onClick={() => setCoupon(coupon)}
                  className="shrink-0 rounded-xl bg-slate-900 px-4 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  Apply
                </button>
              </div>
              {couponResult.error && <p className="mt-1.5 text-[11.5px] text-rose-600">{couponResult.error}</p>}
              {couponResult.applied && (
                <p className="mt-1.5 text-[11.5px] font-semibold text-emerald-700">
                  {COUPONS[couponResult.applied]?.label} applied.
                </p>
              )}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {Object.entries(COUPONS).map(([code, c]) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setCoupon(code)}
                    className="rounded-lg border border-dashed border-emerald-300 bg-white px-2 py-1 text-[10.5px] font-bold text-emerald-700 transition hover:bg-emerald-50"
                    title={c.label}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-2.5 rounded-2xl border border-slate-200 p-3">
              <input
                type="checkbox"
                checked={express}
                onChange={(e) => setExpress(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-[12.5px] leading-snug text-slate-700">
                <strong className="block text-slate-900">Express delivery in Jaipur — ₹{STORE.expressDeliveryFee}</strong>
                Rider at your door within 3 hours (8 AM – 9 PM).
              </span>
            </label>

            <Link
              href="/checkout"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
            >
              Proceed to checkout <Icon name="arrowRight" className="h-4 w-4" />
            </Link>

            <ul className="mt-4 space-y-1.5 text-[11.5px] text-slate-500">
              {["GST invoice emailed with batch & expiry", "Discreet packaging on wellness items", "Cash / UPI / card on delivery", "Free delivery above ₹499"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Icon name="check" className="h-3.5 w-3.5 text-emerald-600" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-emerald-950 p-5 text-white">
            <p className="text-[13px] font-bold text-emerald-300">Need help building this order?</p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-emerald-100/80">
              Send us your prescription list and {STORE.ownerShort}'s team will add everything to your cart, apply the
              best coupon and call you to confirm.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={`https://wa.me/${STORE.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-white"
              >
                <Icon name="whatsapp" className="h-3.5 w-3.5" /> WhatsApp
              </a>
              <a href={`tel:${STORE.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white ring-1 ring-white/20">
                <Icon name="phone" className="h-3.5 w-3.5" /> {STORE.phoneDisplay}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Line({ label, value, accent = "" }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex items-center justify-between text-slate-600">
      <span>{label}</span>
      <span className={`font-bold ${accent || "text-slate-900"}`}>{value}</span>
    </div>
  );
}
