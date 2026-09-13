"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { formatINR, ORDER_FLOW, PAYMENT_LABEL, statusIndex, STORE } from "@/lib/store";

type OrderPayload = {
  order: {
    orderNumber: string;
    customerName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    total: number;
    itemCount: number;
    status: string;
    paymentLabel: string;
    discreetPackaging: boolean;
    createdAt: string;
    expectedDelivery: string | null;
  };
  items: { id: number; name: string; brand: string; quantity: number; lineTotal: number; packSize: string | null }[];
};

export default function TrackPage() {
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<OrderPayload | null>(null);

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    const id = number.trim().toUpperCase();
    if (id.length < 4) {
      setError("Enter the order number from your confirmation SMS, e.g. AJ2026000123.");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(id)}`);
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json?.error ?? "We could not find this order.");
      } else {
        setData(json);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const stage = data ? statusIndex(data.order.status) : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-emerald-800">
          <Icon name="truck" className="h-3.5 w-3.5" /> Order tracking
        </span>
        <h1 className="mt-4 text-[clamp(1.7rem,4vw,2.5rem)] font-extrabold tracking-tight text-slate-900">
          Where is my medicine?
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-[14px] leading-relaxed text-slate-600">
          Enter the order number we sent you on SMS and email. For anything urgent call {STORE.phoneDisplay} — the
          phone at {STORE.name} is answered by a person, not a bot.
        </p>
      </div>

      <form onSubmit={lookup} className="mx-auto mt-7 flex max-w-xl flex-col gap-2.5 sm:flex-row">
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value.toUpperCase())}
          placeholder="AJ2026000123"
          className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm font-semibold uppercase outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        />
        <button
          type="submit"
          disabled={loading}
          className="h-12 shrink-0 rounded-2xl bg-emerald-600 px-7 text-sm font-extrabold text-white transition hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Checking…" : "Track order"}
        </button>
      </form>

      {error && (
        <p className="mx-auto mt-4 max-w-xl rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-[13px] font-semibold text-rose-700">
          {error}
        </p>
      )}

      {data && (
        <div className="mt-8 space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-slate-500">Order</p>
                <p className="mt-1 text-lg font-extrabold text-slate-900">{data.order.orderNumber}</p>
                <p className="mt-1 text-[12.5px] text-slate-500">
                  {data.order.customerName} · {data.order.itemCount} items ·{" "}
                  {new Date(data.order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-extrabold text-emerald-700">{formatINR(data.order.total)}</p>
                <p className="text-[12px] text-slate-500">{data.order.paymentLabel}</p>
              </div>
            </div>

            {data.order.discreetPackaging && (
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-fuchsia-50 px-3 py-1.5 text-[11.5px] font-bold text-fuchsia-700">
                <Icon name="lock" className="h-3.5 w-3.5" /> Discreet packaging
              </p>
            )}

            <ol className="mt-6 grid gap-3 sm:grid-cols-4">
              {ORDER_FLOW.map((s, i) => (
                <li
                  key={s.key}
                  className={`rounded-2xl border p-3.5 ${
                    i <= stage ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-full text-[12px] font-black ${
                      i <= stage ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {i <= stage ? <Icon name="check" className="h-4 w-4" strokeWidth={3} /> : i + 1}
                  </span>
                  <p className={`mt-2 text-[13px] font-bold ${i <= stage ? "text-emerald-900" : "text-slate-500"}`}>{s.label}</p>
                  <p className="mt-0.5 text-[11.5px] text-slate-500">{s.hint}</p>
                </li>
              ))}
            </ol>

            <p className="mt-4 text-[13px] text-slate-600">
              Expected delivery:{" "}
              <strong className="text-emerald-700">
                {data.order.expectedDelivery
                  ? new Date(data.order.expectedDelivery).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })
                  : "2–4 working days"}
              </strong>{" "}
              to {data.order.address}, {data.order.city}, {data.order.state} {data.order.pincode}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-extrabold text-slate-900">Items</h2>
            <ul className="mt-3 divide-y divide-slate-100">
              {data.items.map((i) => (
                <li key={i.id} className="flex items-center justify-between gap-3 py-2.5 text-[13px]">
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-slate-800">{i.name}</span>
                    <span className="block text-[11.5px] text-slate-500">
                      {i.brand} · {i.packSize} · Qty {i.quantity}
                    </span>
                  </span>
                  <span className="shrink-0 font-bold text-slate-900">{formatINR(i.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/order/${data.order.orderNumber}`}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Open full invoice <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      {!data && !error && (
        <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
          {[
            { icon: "clock", t: "Same-day in Jaipur", d: "Order before 7 PM for delivery today." },
            { icon: "package", t: "Cold-chain safe", d: "Insulin and vaccines travel in ice packs." },
            { icon: "headset", t: "Human support", d: `${STORE.hours.split("·")[1]?.trim()} on ${STORE.phoneDisplay}.` },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
              <Icon name={c.icon} className="mx-auto h-6 w-6 text-emerald-600" />
              <p className="mt-2 text-[13.5px] font-bold text-slate-900">{c.t}</p>
              <p className="mt-1 text-[12px] text-slate-500">{c.d}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
