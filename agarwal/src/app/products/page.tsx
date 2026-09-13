import type { Metadata } from "next";
import ProductsBrowser from "@/components/ProductsBrowser";
import { getCategoriesWithCounts } from "@/lib/queries";
import type { SortKey } from "@/lib/filters";
import { STORE } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Buy medicines & health products online",
  description: `Search ${STORE.name}'s catalogue of 10,000+ genuine medicines, wellness products, devices and protection essentials with filters for price, brand, form and prescription.`,
};

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const cats = await getCategoriesWithCounts().catch(() => []);
  const sort = one(sp.sort) as SortKey;

  return (
    <ProductsBrowser
      categories={cats.map((c) => ({
        slug: c.slug,
        name: c.name,
        icon: c.icon,
        accent: c.accent,
        count: c.count,
        ageRestricted: c.ageRestricted,
        tagline: c.tagline,
      }))}
      initial={{
        q: one(sp.q),
        category: one(sp.category),
        brand: one(sp.brand),
        form: one(sp.form),
        rx: one(sp.rx),
        minPrice: one(sp.minPrice),
        maxPrice: one(sp.maxPrice),
        inStock: one(sp.inStock) === "1",
        sort: (["popular", "price_asc", "price_desc", "discount", "rating", "newest", "name"] as SortKey[]).includes(sort)
          ? sort
          : "popular",
        page: Math.max(1, Number(one(sp.page)) || 1),
      }}
      title="All medicines & wellness products"
      subtitle={`Genuine stock from ${STORE.name}, Jaipur — priced at our counter rate and verified for batch & expiry before dispatch.`}
    />
  );
}
