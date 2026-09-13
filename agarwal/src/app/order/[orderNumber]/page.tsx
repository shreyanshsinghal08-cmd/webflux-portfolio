import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { CopyButton } from "@/components/widgets";
import { getOrder } from "@/lib/queries";
import { formatINR, ORDER_FLOW, PAYMENT_LABEL, statusIndex, STORE } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Your order" };

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ orderNumber: string }>;
  searchParams: Promise<{ placed?: string }>;
}) {
  const { orderNumber } = await params;
  const sp = await searchParams;
  const result = await getOrder(orderNumber).catch(() => null);

  if (!result) {
    return (
      <div className="mx-auto grid min-h-[55vh] max-w-xl place-items-center px-4 py-16 text-center">
        <div>
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-amber-50 text-amber-600">
            <Icon name="package" className="h-9 w-9" />
          </div>
          <h1 className="mt-6 text-2xl font-extrabold text-slate-900">Order not found</h1>
          <p className="mt-2 text-sm text-slate-600">
            We could not find an order with number <strong>{orderNumber}</strong>. Please check the number on your
            confirmation SMS or call {STORE.phoneDisplay}.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/track" className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white">Track an order</Link>
            <Link href="/products" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700">Continue shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  const { order, items } = result;
  const stage = statusIndex(order.status);
  const delivery = order.expectedDelivery
    ? new Date(order.expectedDelivery).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })
    : "2–4 working days";
  const savings = items.reduce((s, i) => s + (i.mrp - i.unitPrice) * i.quantity, 0) + order.discount;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {sp.placed === "1" && (
        <div className="animate-fade-up rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-600 text-white">
              <Icon name="check" className="h-6 w-6" strokeWidth={2.6} />
            </span>
            <div>
              <h1 className="text-lg font-extrabold text-emerald-950">Thank you — your order is confirmed!</h1>
              <p className="mt-1 text-[13.5px] leading-relaxed text-emerald-900/80">
                {order.notes?.includes("Prescription attached") || order.notes?.includes("WhatsApp")
                  ? "Our pharmacist is verifying your prescription and will call you on the registered number within 15 minutes if anything needs clarification."
                  : `${STORE.ownerShort}'s team has started packing. You will receive an SMS and a GST invoice by email.`}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-slate-500">Order number</p>
            <p className="mt-1 flex items-center gap-2 text-xl font-extrabold text-slate-900">
              {order.orderNumber}
              <CopyButton text={order.orderNumber} />
            </p>
            <p className="mt-1.5 text-[12.5px] text-slate-500">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              · {order.itemCount} item{order.itemCount === 1 ? "" : "s"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-slate-500">Total paid / payable</p>
            <p className="mt-1 text-2xl font-extrabold text-emerald-700">{formatINR(order.total)}</p>
            <p className="mt-1 text-[12.5px] text-slate-500">{PAYMENT_LABEL[order.paymentMode] ?? order.paymentMode}</p>
          </div>
        </div>

        {order.discreetPackaging && (
          <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-3.5 text-[12.5px] text-fuchsia-900">
            <Icon name="lock" className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-600" />
            <span>
              <strong>Discreet packaging confirmed.</strong> Your parcel will arrive in a plain unmarked box and the
              delivery label will not mention any product name. The invoice has been emailed instead of being enclosed.
            </span>
          </div>
        )}

        {/* timeline */}
        <ol className="mt-6 space-y-0">
          {ORDER_FLOW.map((s, i) => {
            const done = i <= stage;
            const current = i === stage;
            return (
              <li key={s.key} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[12px] font-black ${
                      done ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"
                    } ${current ? "ring-4 ring-emerald-100" : ""}`}
                  >
                    {done ? <Icon name="check" className="h-4 w-4" strokeWidth={3} /> : i + 1}
                  </span>
                  {i < ORDER_FLOW.length - 1 && (
                    <span className={`h-12 w-0.5 ${i < stage ? "bg-emerald-500" : "bg-slate-200"}`} />
                  )}
                </div>
                <div className="pb-4">
                  <p className={`text-[14px] font-bold ${done ? "text-slate-900" : "text-slate-400"}`}>{s.label}</p>
                  <p className={`text-[12.5px] ${current ? "text-emerald-700" : "text-slate-500"}`}>{s.hint}</p>
                  {current && (
                    <p className="mt-1 text-[12px] font-semibold text-slate-700">
                      Expected delivery: <span className="text-emerald-700">{delivery}</span>
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_340px]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-base font-extrabold text-slate-900">Items in this order</h2>
          <ul className="mt-4 divide-y divide-slate-100">
            {items.map((i) => (
              <li key={i.id} className="flex items-start gap-3 py-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon name="capsule" className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13.5px] font-bold text-slate-900">{i.name}</span>
                  <span className="block text-[11.5px] text-slate-500">
                    {i.brand} · {i.packSize} · {formatINR(i.unitPrice)} × {i.quantity}
                  </span>
                </span>
                <span className="shrink-0 text-[14px] font-extrabold text-slate-900">{formatINR(i.lineTotal)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-[13px]">
            <Row label="Item total (MRP)" value={formatINR(items.reduce((s, i) => s + i.mrp * i.quantity, 0))} />
            <Row label="Store discount" value={`− ${formatINR(savings)}`} accent="text-emerald-600" />
            {order.discount > 0 && <Row label={`Coupon ${order.couponCode}`} value={`− ${formatINR(order.discount)}`} accent="text-emerald-600" />}
            <Row label="Delivery" value={order.deliveryFee === 0 ? "FREE" : formatINR(order.deliveryFee)} accent={order.deliveryFee === 0 ? "text-emerald-600" : ""} />
            <div className="flex items-center justify-between border-t border-dashed border-slate-300 pt-3">
              <span className="text-sm font-bold text-slate-900">Total</span>
              <span className="text-lg font-extrabold text-slate-900">{formatINR(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-extrabold text-slate-900">Delivery details</h2>
            <div className="mt-3 space-y-2.5 text-[13px] text-slate-600">
              <p className="flex items-start gap-2">
                <Icon name="user" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span className="font-semibold text-slate-800">{order.customerName}</span>
              </p>
              <p className="flex items-start gap-2">
                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                {order.phone}
              </p>
              {order.email && (
                <p className="flex items-start gap-2">
                  <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="break-all">{order.email}</span>
                </p>
              )}
              <p className="flex items-start gap-2">
                <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>
                  {order.address}
                  <br />
                  {order.city}, {order.state} {order.pincode}
                </span>
              </p>
              {order.notes && (
                <p className="flex items-start gap-2">
                  <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="text-[12.5px]">{order.notes}</span>
                </p>
              )}
            </div>
          </div>

          <div className="rounded-3xl bg-emerald-950 p-6 text-white">
            <h2 className="text-base font-extrabold">Need any change?</h2>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-emerald-100/80">
              Call us before the order is packed and we will modify, add or cancel items free of charge.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={`tel:${STORE.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-emerald-900">
                <Icon name="phone" className="h-3.5 w-3.5" /> {STORE.phoneDisplay}
              </a>
              <a
                href={`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(`Hello, regarding order ${order.orderNumber}`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-white"
              >
                <Icon name="whatsapp" className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </div>
            <Link href="/products" className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-emerald-300 hover:text-white">
              Continue shopping <Icon name="arrowRight" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
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
