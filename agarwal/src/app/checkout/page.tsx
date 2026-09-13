"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons";
import { useCart } from "@/components/cart";
import { COUPONS, formatINR, PAYMENT_MODES, STORE } from "@/lib/store";

type Form = {
  name: string;
  phone: string;
  email: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
};

const EMPTY_FORM: Form = {
  name: "",
  phone: "",
  email: "",
  address: "",
  landmark: "",
  city: "",
  state: "Rajasthan",
  pincode: "",
  notes: "",
};

const STATES = [
  "Rajasthan", "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Telangana", "Gujarat", "Madhya Pradesh",
  "Uttar Pradesh", "Haryana", "Punjab", "West Bengal", "Kerala", "Bihar", "Chhattisgarh", "Assam", "Odisha",
  "Jharkhand", "Uttarakhand", "Himachal Pradesh", "Goa", "Jammu & Kashmir",
];

export default function CheckoutPage() {
  const {
    items, count, subtotal, mrpTotal, savings, coupon, setCoupon, couponResult,
    express, setExpress, deliveryFee, needsPrescription, clear,
  } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<Form>(EMPTY_FORM);
  const [payment, setPayment] = useState<string>("cod");
  const [discreet, setDiscreet] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [willWhatsApp, setWillWhatsApp] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const ageRestricted = useMemo(() => items.some((i) => i.form === "Condom"), [items]);
  const toPay = Math.max(0, subtotal - couponResult.discount + deliveryFee);

  function set<K extends keyof Form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 3) e.name = "Enter the patient's or receiver's full name.";
    if (form.phone.replace(/\D/g, "").length !== 10) e.phone = "Enter a valid 10-digit mobile number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.address.trim().length < 8) e.address = "Enter house/flat, street and area.";
    if (!form.city.trim()) e.city = "City is required.";
    if (form.pincode.replace(/\D/g, "").length !== 6) e.pincode = "Enter a valid 6-digit pincode.";
    if (needsPrescription && files.length === 0 && !willWhatsApp)
      e.prescription = "Upload your prescription or choose to send it on WhatsApp.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function placeOrder() {
    setServerError(null);
    if (!items.length) {
      setServerError("Your cart is empty.");
      return;
    }
    if (!validate()) {
      document.getElementById("checkout-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setSubmitting(true);
    try {
      const notesParts = [
        form.landmark.trim() ? `Landmark: ${form.landmark.trim()}` : "",
        form.notes.trim() ? `Instructions: ${form.notes.trim()}` : "",
        files.length ? `Prescription attached: ${files.join(", ")}` : "",
        willWhatsApp ? "Customer will share the prescription on WhatsApp." : "",
        discreet ? "Discreet packaging requested." : "",
      ].filter(Boolean);

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name.trim(),
            phone: form.phone,
            email: form.email,
            address: [form.address.trim(), form.landmark.trim(), form.city.trim()].filter(Boolean).join(", "),
            city: form.city.trim(),
            state: form.state,
            pincode: form.pincode,
          },
          paymentMode: payment,
          coupon: coupon || null,
          notes: notesParts.join(" | ") || null,
          express,
          discreet: discreet || ageRestricted,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setServerError(data?.error ?? "Something went wrong while placing your order.");
        setSubmitting(false);
        return;
      }
      clear();
      router.push(`/order/${data.orderNumber}?placed=1`);
    } catch {
      setServerError("Network error. Please try again or call the store.");
      setSubmitting(false);
    }
  }

  if (items.length === 0 && !submitting) {
    return (
      <div className="mx-auto grid min-h-[55vh] max-w-xl place-items-center px-4 py-16 text-center">
        <div>
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-emerald-50 text-emerald-600">
            <Icon name="cart" className="h-9 w-9" />
          </div>
          <h1 className="mt-6 text-2xl font-extrabold text-slate-900">Nothing to check out yet</h1>
          <p className="mt-2 text-sm text-slate-600">Add medicines to your cart and they will appear here.</p>
          <Link href="/products" className="mt-6 inline-block rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">
            Browse the catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="flex items-center gap-1.5 text-[12px] text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <Icon name="chevronRight" className="h-3 w-3" />
        <Link href="/cart" className="hover:text-emerald-700">Cart</Link>
        <Icon name="chevronRight" className="h-3 w-3" />
        <span className="font-semibold text-slate-700">Checkout</span>
      </nav>

      <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">Secure checkout</h1>
      <p className="mt-1 text-sm text-slate-500">
        {count} item{count === 1 ? "" : "s"} · payable {formatINR(toPay)} · billed and dispatched by {STORE.name}.
      </p>

      <div id="checkout-form" className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
        <div className="space-y-5">
          {serverError && (
            <div className="flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-[13px] text-rose-700">
              <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          <Card step="1" title="Delivery address" icon="mapPin">
            <div className="grid gap-3.5 sm:grid-cols-2">
              <Field label="Full name *" error={errors.name}>
                <input className={inputCls(!!errors.name)} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Patient / receiver name" />
              </Field>
              <Field label="Mobile number *" error={errors.phone}>
                <div className="flex items-center gap-2">
                  <span className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-600">+91</span>
                  <input
                    className={`${inputCls(!!errors.phone)} flex-1`}
                    value={form.phone}
                    inputMode="numeric"
                    maxLength={10}
                    onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))}
                    placeholder="10-digit mobile"
                  />
                </div>
              </Field>
              <Field label="Email (for GST invoice)" error={errors.email} className="sm:col-span-2">
                <input className={inputCls(!!errors.email)} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
              </Field>
              <Field label="Flat / house, street, area *" error={errors.address} className="sm:col-span-2">
                <textarea
                  className={`${inputCls(!!errors.address)} min-h-20 resize-y`}
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  placeholder="Complete address for the delivery rider"
                />
              </Field>
              <Field label="Landmark">
                <input className={inputCls(false)} value={form.landmark} onChange={(e) => set("landmark", e.target.value)} placeholder="Near Sanganeri Gate" />
              </Field>
              <Field label="Pincode *" error={errors.pincode}>
                <input
                  className={inputCls(!!errors.pincode)}
                  value={form.pincode}
                  inputMode="numeric"
                  maxLength={6}
                  onChange={(e) => set("pincode", e.target.value.replace(/\D/g, ""))}
                  placeholder="302001"
                />
              </Field>
              <Field label="City *" error={errors.city}>
                <input className={inputCls(!!errors.city)} value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Jaipur" />
              </Field>
              <Field label="State *">
                <select className={inputCls(false)} value={form.state} onChange={(e) => set("state", e.target.value)}>
                  {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Delivery instructions" className="sm:col-span-2">
                <textarea
                  className={`${inputCls(false)} min-h-16 resize-y`}
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Call before arriving, leave with the guard, avoid ringing the bell…"
                />
              </Field>
            </div>
          </Card>

          <Card step="2" title="Delivery speed & packaging" icon="truck">
            <div className="grid gap-2.5 sm:grid-cols-2">
              <RadioCard
                active={!express}
                onClick={() => setExpress(false)}
                title="Standard delivery"
                price={deliveryFeeForStandard()}
                hint={`Jaipur: same day before 7 PM · Other cities: 2–4 days. Free above ₹${STORE.freeDeliveryAbove}.`}
              />
              <RadioCard
                active={express}
                onClick={() => setExpress(true)}
                title="Express (Jaipur only)"
                price={`₹${STORE.expressDeliveryFee}`}
                hint="Rider at your door within 3 hours, 8 AM – 9 PM."
              />
            </div>
            <label className="mt-3 flex cursor-pointer items-start gap-2.5 rounded-2xl border border-fuchsia-200 bg-fuchsia-50/60 p-3.5">
              <input
                type="checkbox"
                checked={discreet || ageRestricted}
                onChange={(e) => setDiscreet(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-fuchsia-300 text-fuchsia-600 focus:ring-fuchsia-500"
              />
              <span className="text-[12.5px] leading-snug text-fuchsia-950">
                <strong className="block">Pack discreetly</strong>
                Plain unmarked box, no product names on the delivery label, invoice emailed instead of enclosed.
                {ageRestricted && " Applied automatically because your cart contains 18+ products."}
              </span>
            </label>
          </Card>

          {needsPrescription && (
            <Card step="3" title="Prescription for Rx items" icon="prescription">
              <p className="text-[13px] leading-relaxed text-slate-600">
                Your cart contains prescription (Schedule H) medicines. Upload a clear photo/PDF of the doctor's
                prescription — it is verified by {STORE.pharmacist.split("(")[0].trim()} before dispatch.
              </p>
              <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 px-4 py-6 text-center transition hover:bg-emerald-50">
                <Icon name="upload" className="h-5 w-5 text-emerald-700" />
                <span className="text-[13px] font-semibold text-emerald-800">
                  {files.length ? `${files.length} file(s) attached — tap to change` : "Tap to attach prescription (JPG / PNG / PDF, max 3)"}
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const list = Array.from(e.target.files ?? []).slice(0, 3).map((f) => f.name);
                    setFiles(list);
                    setErrors((er) => ({ ...er, prescription: "" }));
                  }}
                />
              </label>
              {files.length > 0 && (
                <ul className="mt-2 space-y-1 text-[12px] text-slate-600">
                  {files.map((f) => (
                    <li key={f} className="flex items-center gap-1.5">
                      <Icon name="check" className="h-3.5 w-3.5 text-emerald-600" /> {f}
                    </li>
                  ))}
                </ul>
              )}
              <label className="mt-3 flex cursor-pointer items-center gap-2.5 text-[12.5px] text-slate-700">
                <input
                  type="checkbox"
                  checked={willWhatsApp}
                  onChange={(e) => {
                    setWillWhatsApp(e.target.checked);
                    setErrors((er) => ({ ...er, prescription: "" }));
                  }}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                I will send the prescription on WhatsApp ({STORE.phoneDisplay}) right after ordering.
              </label>
              {errors.prescription && <p className="mt-2 text-[12px] font-semibold text-rose-600">{errors.prescription}</p>}
            </Card>
          )}

          <Card step={needsPrescription ? "4" : "3"} title="Payment method" icon="rupee">
            <div className="grid gap-2.5 sm:grid-cols-2">
              {PAYMENT_MODES.map((m) => (
                <RadioCard
                  key={m.key}
                  active={payment === m.key}
                  onClick={() => setPayment(m.key)}
                  title={m.label}
                  hint={m.hint}
                />
              ))}
            </div>
            <p className="mt-3 text-[12px] text-slate-500">
              Online payments are processed on a secure gateway. Nothing is charged until you confirm on the payment page.
            </p>
          </Card>
        </div>

        {/* summary */}
        <aside className="space-y-4 lg:sticky lg:top-32">
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <h2 className="text-base font-extrabold text-slate-900">Order summary</h2>
            <ul className="mt-3 max-h-64 space-y-2.5 overflow-y-auto pr-1">
              {items.map((i) => (
                <li key={i.productId} className="flex items-start gap-2.5 border-b border-dashed border-slate-200 pb-2.5 last:border-0">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${i.categoryAccent} text-white`}>
                    <Icon name="capsule" className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-semibold text-slate-800">{i.name}</span>
                    <span className="block text-[11px] text-slate-500">
                      {i.packSize} · Qty {i.quantity}
                    </span>
                  </span>
                  <span className="shrink-0 text-[13px] font-bold text-slate-900">{formatINR(i.price * i.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2 border-t border-slate-200 pt-3 text-[13px]">
              <Row label="Item total (MRP)" value={formatINR(mrpTotal)} />
              <Row label="Store discount" value={`− ${formatINR(savings)}`} accent="text-emerald-600" />
              {couponResult.applied && <Row label={`Coupon ${couponResult.applied}`} value={`− ${formatINR(couponResult.discount)}`} accent="text-emerald-600" />}
              <Row label="Delivery" value={deliveryFee === 0 ? "FREE" : formatINR(deliveryFee)} accent={deliveryFee === 0 ? "text-emerald-600" : ""} />
              <div className="flex items-center justify-between border-t border-dashed border-slate-300 pt-3">
                <span className="text-sm font-bold text-slate-900">Total payable</span>
                <span className="text-xl font-extrabold text-slate-900">{formatINR(toPay)}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                placeholder="Coupon code"
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
              <p className="mt-1.5 text-[11.5px] font-semibold text-emerald-700">{COUPONS[couponResult.applied]?.label}</p>
            )}

            <button
              type="button"
              onClick={placeOrder}
              disabled={submitting}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Placing your order…
                </>
              ) : (
                <>
                  Place order · {formatINR(toPay)} <Icon name="arrowRight" className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-500">
              By placing this order you confirm that the medicines are for personal use and, where applicable, that you
              hold a valid prescription from a registered medical practitioner.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-5">
            <p className="flex items-center gap-2 text-[13px] font-bold text-emerald-900">
              <Icon name="headset" className="h-4 w-4" /> Stuck somewhere?
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-emerald-800/80">
              {STORE.owner} personally answers the store phone during {STORE.hours.split("·")[1]?.trim()}.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={`tel:${STORE.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white">
                <Icon name="phone" className="h-3.5 w-3.5" /> {STORE.phoneDisplay}
              </a>
              <a
                href={`https://wa.me/${STORE.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-emerald-800 ring-1 ring-emerald-200"
              >
                <Icon name="whatsapp" className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );

  function deliveryFeeForStandard() {
    const payable = subtotal - couponResult.discount;
    return payable >= STORE.freeDeliveryAbove ? "FREE" : `₹${STORE.deliveryFee}`;
  }
}

function inputCls(hasError: boolean) {
  return `h-11 w-full rounded-xl border bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
    hasError ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100" : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-100"
  }`;
}

function Card({ step, title, icon, children }: { step: string; title: string; icon: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5">
      <h2 className="flex items-center gap-2.5 text-base font-extrabold text-slate-900">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600 text-[13px] font-black text-white">{step}</span>
        {title}
        <Icon name={icon} className="ml-auto h-5 w-5 text-emerald-600" />
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({ label, error, children, className = "" }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-wide text-slate-500">{label}</span>
      {children}
      {error && <span className="mt-1 block text-[11.5px] font-semibold text-rose-600">{error}</span>}
    </label>
  );
}

function Row({ label, value, accent = "" }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex items-center justify-between text-slate-600">
      <span>{label}</span>
      <span className={`font-bold ${accent || "text-slate-900"}`}>{value}</span>
    </div>
  );
}

function RadioCard({
  active, onClick, title, hint, price,
}: {
  active: boolean; onClick: () => void; title: string; hint?: string; price?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-3.5 text-left transition ${
        active ? "border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-100" : "border-slate-200 bg-white hover:border-emerald-300"
      }`}
    >
      <span className="flex items-center gap-2">
        <span className={`grid h-4 w-4 place-items-center rounded-full border-2 ${active ? "border-emerald-600" : "border-slate-300"}`}>
          {active && <span className="h-2 w-2 rounded-full bg-emerald-600" />}
        </span>
        <span className="text-[13.5px] font-bold text-slate-900">{title}</span>
        {price && <span className="ml-auto text-[13px] font-extrabold text-emerald-700">{price}</span>}
      </span>
      {hint && <span className="mt-1 block pl-6 text-[11.5px] leading-snug text-slate-500">{hint}</span>}
    </button>
  );
}
