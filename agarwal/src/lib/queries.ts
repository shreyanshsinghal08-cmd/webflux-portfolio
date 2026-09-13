import { db } from "@/db";
import { categories, orderItems, orders, products } from "@/db/schema";
import { and, asc, desc, eq, gte, ilike, lte, ne, or, sql } from "drizzle-orm";

import type { SortKey } from "@/lib/filters";

export { SORT_OPTIONS } from "@/lib/filters";
export type { SortKey } from "@/lib/filters";

export type ProductRow = {
  id: number;
  name: string;
  slug: string;
  brand: string;
  manufacturer: string;
  description: string | null;
  composition: string;
  uses: string | null;
  form: string;
  packSize: string;
  strength: string | null;
  mrp: number;
  price: number;
  discountPct: number;
  stock: number;
  requiresPrescription: boolean;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isBestseller: boolean;
  ageRestricted: boolean;
  categorySlug: string;
  categoryName: string;
  categoryIcon: string;
  categoryAccent: string;
};

export type ProductFilters = {
  q?: string;
  category?: string;
  brand?: string;
  form?: string;
  rx?: string;
  inStockOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortKey;
  page?: number;
  limit?: number;
  featured?: boolean;
  bestseller?: boolean;
  deals?: boolean;
};

const baseSelect = {
  id: products.id,
  name: products.name,
  slug: products.slug,
  brand: products.brand,
  manufacturer: products.manufacturer,
  description: products.description,
  composition: products.composition,
  uses: products.uses,
  form: products.form,
  packSize: products.packSize,
  strength: products.strength,
  mrp: products.mrp,
  price: products.price,
  discountPct: products.discountPct,
  stock: products.stock,
  requiresPrescription: products.requiresPrescription,
  rating: products.rating,
  reviewCount: products.reviewCount,
  isFeatured: products.isFeatured,
  isBestseller: products.isBestseller,
  ageRestricted: products.ageRestricted,
  categorySlug: categories.slug,
  categoryName: categories.name,
  categoryIcon: categories.icon,
  categoryAccent: categories.accent,
};

function buildWhere(f: ProductFilters) {
  const clauses = [];
  if (f.q && f.q.trim()) {
    const term = `%${f.q.trim().toLowerCase()}%`;
    const words = f.q.trim().split(/\s+/).slice(0, 4);
    clauses.push(
      or(
        ilike(products.name, term),
        ilike(products.brand, term),
        ilike(products.composition, term),
        ...words.flatMap((w) => [
          ilike(products.name, `%${w}%`),
          ilike(products.composition, `%${w}%`),
          ilike(products.uses ?? sql`''`, `%${w}%`),
        ]),
      ),
    );
  }
  if (f.category) clauses.push(eq(categories.slug, f.category));
  if (f.brand) clauses.push(eq(products.brand, f.brand));
  if (f.form) clauses.push(eq(products.form, f.form));
  if (f.rx === "yes") clauses.push(eq(products.requiresPrescription, true));
  if (f.rx === "no") clauses.push(eq(products.requiresPrescription, false));
  if (f.inStockOnly) clauses.push(gte(products.stock, 1));
  if (f.minPrice) clauses.push(gte(products.price, f.minPrice));
  if (f.maxPrice) clauses.push(lte(products.price, f.maxPrice));
  if (f.featured) clauses.push(eq(products.isFeatured, true));
  if (f.bestseller) clauses.push(eq(products.isBestseller, true));
  if (f.deals) clauses.push(gte(products.discountPct, 22));
  return clauses.length ? and(...clauses) : undefined;
}

function orderFor(sort: SortKey) {
  switch (sort) {
    case "price_asc":
      return asc(products.price);
    case "price_desc":
      return desc(products.price);
    case "discount":
      return desc(products.discountPct);
    case "rating":
      return desc(products.rating);
    case "newest":
      return desc(products.id);
    case "name":
      return asc(products.name);
    default:
      return sql`${products.isBestseller} desc, ${products.reviewCount} desc, ${products.rating} desc, ${products.id} desc`;
  }
}

export async function listProducts(f: ProductFilters) {
  const limit = Math.min(Math.max(f.limit ?? 24, 1), 60);
  const page = Math.max(f.page ?? 1, 1);
  const where = buildWhere(f);

  const [rows, countRes, brandRes, formRes, priceRes] = await Promise.all([
    db
      .select(baseSelect)
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(where)
      .orderBy(orderFor(f.sort ?? "popular"))
      .limit(limit)
      .offset((page - 1) * limit),
    db.select({ n: sql<number>`count(*)::int` }).from(products).innerJoin(categories, eq(products.categoryId, categories.id)).where(where),
    db
      .select({ brand: products.brand, n: sql<number>`count(*)::int` })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(where)
      .groupBy(products.brand)
      .orderBy(desc(sql`count(*)`))
      .limit(18),
    db
      .select({ form: products.form, n: sql<number>`count(*)::int` })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(where)
      .groupBy(products.form)
      .orderBy(desc(sql`count(*)`))
      .limit(14),
    db
      .select({ min: sql<number>`min(${products.price})`, max: sql<number>`max(${products.price})` })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(where),
  ]);

  const total = countRes[0]?.n ?? 0;
  return {
    items: rows as ProductRow[],
    total,
    page,
    limit,
    pages: Math.max(1, Math.ceil(total / limit)),
    facets: {
      brands: brandRes.map((b) => ({ value: b.brand, count: b.n })),
      forms: formRes.map((b) => ({ value: b.form, count: b.n })),
      price: { min: Number(priceRes[0]?.min ?? 0), max: Number(priceRes[0]?.max ?? 9999) },
    },
  };
}

export async function getProductBySlug(slug: string): Promise<ProductRow | undefined> {
  const rows = await db
    .select(baseSelect)
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.slug, slug))
    .limit(1);
  return rows[0] as ProductRow | undefined;
}

export async function getRelated(product: { id: number; categorySlug: string; brand: string }, limit = 8) {
  const rows = await db
    .select(baseSelect)
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(
      or(
        and(eq(categories.slug, product.categorySlug), ne(products.id, product.id), eq(products.brand, product.brand)),
        and(eq(categories.slug, product.categorySlug), ne(products.id, product.id)),
      ),
    )
    .orderBy(desc(products.isBestseller), desc(products.reviewCount))
    .limit(limit);
  return rows as ProductRow[];
}

export async function getPackVariants(product: { id: number; composition: string; brand: string; form: string }, limit = 6) {
  const rows = await db
    .select(baseSelect)
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(
      and(
        eq(products.composition, product.composition),
        eq(products.form, product.form),
        ne(products.id, product.id),
      ),
    )
    .orderBy(asc(products.price))
    .limit(limit);
  return rows as ProductRow[];
}

export async function getCategoriesWithCounts() {
  return db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      tagline: categories.tagline,
      description: categories.description,
      icon: categories.icon,
      accent: categories.accent,
      ageRestricted: categories.ageRestricted,
      count: sql<number>`count(${products.id})::int`,
    })
    .from(categories)
    .leftJoin(products, eq(products.categoryId, categories.id))
    .groupBy(categories.id)
    .orderBy(asc(categories.sort));
}

export async function getCatalogueStats() {
  const [p, c, b, rx, o, inStock] = await Promise.all([
    db.select({ n: sql<number>`count(*)::int` }).from(products),
    db.select({ n: sql<number>`count(*)::int` }).from(categories),
    db.select({ n: sql<number>`count(distinct ${products.brand})::int` }).from(products),
    db.select({ n: sql<number>`count(*)::int` }).from(products).where(eq(products.requiresPrescription, true)),
    db.select({ n: sql<number>`count(*)::int` }).from(orders),
    db.select({ n: sql<number>`count(*)::int` }).from(products).where(gte(products.stock, 1)),
  ]);
  return {
    products: p[0]?.n ?? 0,
    categories: c[0]?.n ?? 0,
    brands: b[0]?.n ?? 0,
    rx: rx[0]?.n ?? 0,
    orders: o[0]?.n ?? 0,
    inStock: inStock[0]?.n ?? 0,
  };
}

export async function searchSuggestions(q: string, limit = 8) {
  if (!q.trim()) return [];
  const term = `%${q.trim().toLowerCase()}%`;
  const rows = await db
    .select({
      slug: products.slug,
      name: products.name,
      brand: products.brand,
      price: products.price,
      mrp: products.mrp,
      discountPct: products.discountPct,
      form: products.form,
      categorySlug: categories.slug,
      categoryName: categories.name,
      categoryAccent: categories.accent,
      categoryIcon: categories.icon,
      requiresPrescription: products.requiresPrescription,
      stock: products.stock,
      reviewCount: products.reviewCount,
    })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(or(ilike(products.name, term), ilike(products.composition, term), ilike(products.brand, term)))
    .orderBy(desc(products.isBestseller), desc(products.reviewCount))
    .limit(limit);
  return rows;
}

export type OrderWithItems = Awaited<ReturnType<typeof getOrder>>;

export async function getOrder(orderNumber: string) {
  const orderRows = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
  const order = orderRows[0];
  if (!order) return null;
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
  return { order, items };
}

export async function getOrderTotals() {
  const rows = await db
    .select({ n: sql<number>`count(*)::int`, revenue: sql<number>`coalesce(sum(${orders.total}),0)::numeric` })
    .from(orders);
  return { orders: rows[0]?.n ?? 0, revenue: Number(rows[0]?.revenue ?? 0) };
}
