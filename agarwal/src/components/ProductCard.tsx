"use client";

import Link from "next/link";
import { Icon } from "@/components/icons";
import { AddToCartButton } from "@/components/cart";
import { formatINR } from "@/lib/store";

export type CardProduct = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  discountPct: number;
  stock: number;
  rating: number;
  reviewCount: number;
  requiresPrescription: boolean;
  form: string;
  packSize: string;
  composition: string;
  categoryAccent: string;
  categoryIcon: string;
  categoryName?: string;
  ageRestricted?: boolean;
  isBestseller?: boolean;
};

export function glyphFor(form: string, categorySlug?: string) {
  if (categorySlug === "sexual-wellness") return "shield";
  switch (form) {
    case "Tablet":
    case "Capsule":
    case "Lozenge":
      return "capsule";
    case "Syrup":
    case "Suspension":
    case "Solution":
    case "Soap":
    case "Wipe":
      return "bottle";
    case "Injection":
    case "Drops":
      return "droplet";
    case "Cream":
    case "Gel":
    case "Ointment":
    case "Spray":
      return "sparkle";
    case "Device":
    case "TestKit":
      return "stethoscope";
    case "Powder":
    case "Sachet":
      return "leaf";
    default:
      return "pill";
  }
}

export function toCartLine(p: CardProduct) {
  return {
    productId: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    price: p.price,
    mrp: p.mrp,
    packSize: p.packSize,
    form: p.form,
    composition: p.composition,
    requiresPrescription: p.requiresPrescription,
    categoryAccent: p.categoryAccent,
  };
}

export default function ProductCard({ product }: { product: CardProduct }) {
  const out = product.stock <= 0;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_18px_40px_-24px_rgba(6,95,70,0.55)]">
      <Link href={`/product/${product.slug}`} className="relative block">
        <div
          className={`relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br ${product.categoryAccent}`}
        >
          <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:14px_14px]" />
          <Icon
            name={glyphFor(product.form)}
            className="h-16 w-16 text-white/90 drop-shadow transition duration-300 group-hover:scale-110"
          />
          {product.discountPct >= 5 && (
            <span className="absolute left-2 top-2 rounded-md bg-amber-400 px-1.5 py-0.5 text-[10px] font-black text-emerald-950 shadow">
              {product.discountPct}% OFF
            </span>
          )}
          {product.requiresPrescription && (
            <span className="absolute right-2 top-2 rounded-md bg-white/95 px-1.5 py-0.5 text-[10px] font-black text-rose-600 shadow">
              Rx
            </span>
          )}
          {product.isBestseller && !product.requiresPrescription && (
            <span className="absolute right-2 top-2 rounded-md bg-emerald-900/85 px-1.5 py-0.5 text-[10px] font-black text-white">
              Bestseller
            </span>
          )}
          {product.ageRestricted && (
            <span className="absolute bottom-2 right-2 rounded-md bg-fuchsia-600/90 px-1.5 py-0.5 text-[9px] font-black text-white">
              18+ discreet
            </span>
          )}
          {out && (
            <span className="absolute inset-0 grid place-items-center bg-slate-900/55 text-xs font-bold uppercase tracking-wider text-white">
              Out of stock
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[11px] font-bold uppercase tracking-wide text-emerald-700">{product.brand}</span>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
            <Icon name="star" filled className="h-2.5 w-2.5 text-amber-500" strokeWidth={0} />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <Link href={`/product/${product.slug}`} className="line-clamp-2 text-[13.5px] font-semibold leading-snug text-slate-900 transition group-hover:text-emerald-700">
          {product.name}
        </Link>
        <p className="line-clamp-1 text-[11.5px] text-slate-500">{product.composition}</p>
        <p className="line-clamp-1 text-[11px] font-medium text-slate-400">{product.packSize}</p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <p className="text-[17px] font-extrabold leading-none text-slate-900">{formatINR(product.price)}</p>
            {product.mrp > product.price && (
              <p className="mt-1 text-[11px] leading-none text-slate-400 line-through">MRP {formatINR(product.mrp)}</p>
            )}
          </div>
          <span className={`text-[10.5px] font-semibold ${product.stock > 10 ? "text-emerald-600" : product.stock > 0 ? "text-amber-600" : "text-slate-400"}`}>
            {product.stock > 10 ? "In stock" : product.stock > 0 ? `Only ${product.stock} left` : "Notify me"}
          </span>
        </div>

        <div className="pt-1.5">
          {out ? (
            <Link
              href="/prescription"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-500 transition hover:border-emerald-300 hover:text-emerald-700"
            >
              Request restock
            </Link>
          ) : (
            <AddToCartButton product={toCartLine(product)} size="sm" />
          )}
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="h-36 animate-pulse bg-slate-100" />
      <div className="space-y-2 p-3.5">
        <div className="h-2.5 w-16 animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-3/4 animate-pulse rounded bg-slate-100" />
        <div className="h-8 w-full animate-pulse rounded-full bg-slate-100" />
      </div>
    </div>
  );
}

export function ProductStrip({ products }: { products: CardProduct[] }) {
  if (!products.length) return null;
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((p) => (
        <ProductCard key={`${p.slug}-${p.id}`} product={p} />
      ))}
    </div>
  );
}


