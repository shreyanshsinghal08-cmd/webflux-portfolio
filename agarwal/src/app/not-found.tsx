import Link from "next/link";
import { Icon } from "@/components/icons";
import { STORE } from "@/lib/store";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-4 py-20 text-center">
      <div>
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-emerald-600 text-white shadow-xl shadow-emerald-600/20">
          <Icon name="search" className="h-9 w-9" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">We could not find that page</h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-slate-600">
          The medicine or page you are looking for may have moved. Search our 10,000+ product catalogue, or call{" "}
          {STORE.ownerShort} directly on {STORE.phoneDisplay} — if we do not stock it, we arrange it within 24 hours.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
          >
            Browse catalogue <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-800 transition hover:border-emerald-400 hover:text-emerald-700"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
