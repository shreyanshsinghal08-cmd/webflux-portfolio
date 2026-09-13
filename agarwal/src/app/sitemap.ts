import type { MetadataRoute } from "next";
import { getCategoriesWithCounts, listProducts } from "@/lib/queries";

const BASE = "https://agarwaljimedical.in";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/products`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/sexual-wellness`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/offers`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/prescription`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/track`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const [cats, popular] = await Promise.all([
    getCategoriesWithCounts().catch(() => []),
    listProducts({ sort: "popular", limit: 60 }).catch(() => ({ items: [] })),
  ]);

  return [
    ...staticRoutes,
    ...cats.map((c) => ({
      url: `${BASE}/products?category=${c.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...popular.items.map((p) => ({
      url: `${BASE}/product/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
