"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Icon } from "@/components/icons";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-white">
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
            aria-expanded={open === i}
          >
            <span className="text-[15px] font-semibold text-slate-900">{item.q}</span>
            <Icon
              name="chevronDown"
              className={`h-4 w-4 shrink-0 text-emerald-700 transition ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <p className="animate-fade-up px-5 pb-5 text-sm leading-relaxed text-slate-600">{item.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}

const AGE_KEY = "aj-adult-verified";

export function AgeGate({ children }: { children: ReactNode }) {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    try {
      setVerified(window.localStorage.getItem(AGE_KEY) === "yes");
    } catch {
      setVerified(false);
    }
  }, []);

  function confirm() {
    try {
      window.localStorage.setItem(AGE_KEY, "yes");
    } catch {
      /* ignore */
    }
    setVerified(true);
  }

  return (
    <>
      {children}
      {!verified && <AgeOverlay onConfirm={confirm} />}
    </>
  );

  function AgeOverlay({ onConfirm }: { onConfirm: () => void }) {
    return (
      <div className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white">
          <Icon name="lock" className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-xl font-extrabold text-slate-900">Adults only · 18+</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          This section contains condoms, contraceptives, lubricants and intimate wellness products. Please confirm you
          are 18 years or older and that purchase of these products is legal in your region.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-fuchsia-600 py-3 text-sm font-bold text-white transition hover:bg-fuchsia-700"
          >
            I am 18 or older — continue
          </button>
          <a
            href="/"
            className="rounded-full border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Take me back to the store
          </a>
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
          Every order ships in plain, unmarked packaging. No product names on the delivery label, ever.
        </p>
        </div>
      </div>
    );
  }
}

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        } catch {
          setDone(false);
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-emerald-400 hover:text-emerald-700"
    >
      <Icon name={done ? "check" : "download"} className="h-3.5 w-3.5" />
      {done ? "Copied" : label}
    </button>
  );
}
