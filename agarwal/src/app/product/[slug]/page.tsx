import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import ProductCard from "@/components/ProductCard";
import ProductDetailClient from "@/components/ProductDetailClient";
import { getProductBySlug, getPackVariants, getRelated } from "@/lib/queries";
import { STORE } from "@/lib/store";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => undefined);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} (${product.packSize}) — Price ₹${Math.round(product.price)}`,
    description: `${product.description?.slice(0, 155) ?? `${product.name} contains ${product.composition}.`} Buy online from ${STORE.name} with same-day delivery in Jaipur.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [variants, related] = await Promise.all([
    getPackVariants(product).catch(() => []),
    getRelated(product, 10).catch(() => []),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="flex flex-wrap items-center gap-1.5 text-[12px] text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <Icon name="chevronRight" className="h-3 w-3" />
        <Link href="/products" className="hover:text-emerald-700">Catalogue</Link>
        <Icon name="chevronRight" className="h-3 w-3" />
        <Link href={`/products?category=${product.categorySlug}`} className="hover:text-emerald-700">
          {product.categoryName}
        </Link>
        <Icon name="chevronRight" className="h-3 w-3" />
        <span className="max-w-[220px] truncate font-semibold text-slate-700">{product.name}</span>
      </nav>

      <div className="mt-5">
        <ProductDetailClient
          product={{
            ...product,
            categorySlug: product.categorySlug,
            categoryName: product.categoryName,
          }}
          alternatives={variants.map((v) => ({
            slug: v.slug,
            name: v.name,
            packSize: v.packSize,
            price: v.price,
            mrp: v.mrp,
          }))}
        />
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                Similar products in {product.categoryName}
              </h2>
              <p className="mt-1 text-[13px] text-slate-500">
                Same-category alternatives our pharmacist dispenses — never substituted without your approval.
              </p>
            </div>
            <Link
              href={`/products?category=${product.categorySlug}`}
              className="hidden shrink-0 items-center gap-1.5 rounded-full border border-emerald-300 px-4 py-2 text-[13px] font-bold text-emerald-700 transition hover:bg-emerald-600 hover:text-white sm:flex"
            >
              View category <Icon name="arrowRight" className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {related.slice(0, 10).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <Icon name="info" className="h-4 w-4 text-emerald-600" />
          Important disclaimer
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
          The information on this page is for general awareness only and is not a substitute for professional medical
          advice, diagnosis or treatment. {STORE.name} ({STORE.owner}) dispenses this product under retail drug licence{" "}
          {STORE.licence}. Always follow the dosage prescribed by your registered medical practitioner and read the
          package insert before use. In case of a medical emergency call {STORE.phoneDisplay} or visit the nearest
          hospital.
        </p>
      </section>
    </div>
  );
}
