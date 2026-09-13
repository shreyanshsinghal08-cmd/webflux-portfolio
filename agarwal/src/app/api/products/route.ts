import { listProducts, searchSuggestions } from "@/lib/queries";
import type { SortKey } from "@/lib/filters";

export const dynamic = "force-dynamic";

function num(value: string | null) {
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export async function GET(req: Request) {
  try {
    const sp = new URL(req.url).searchParams;

    if (sp.get("suggest") === "1") {
      const items = await searchSuggestions(sp.get("q") ?? "", num(sp.get("limit")) ?? 8);
      return Response.json({ items });
    }

    const result = await listProducts({
      q: sp.get("q") ?? undefined,
      category: sp.get("category") ?? undefined,
      brand: sp.get("brand") ?? undefined,
      form: sp.get("form") ?? undefined,
      rx: sp.get("rx") ?? undefined,
      inStockOnly: sp.get("inStock") === "1",
      minPrice: num(sp.get("minPrice")),
      maxPrice: num(sp.get("maxPrice")),
      sort: (sp.get("sort") as SortKey) ?? "popular",
      page: num(sp.get("page")) ?? 1,
      limit: num(sp.get("limit")) ?? 24,
      featured: sp.get("featured") === "1",
      bestseller: sp.get("bestseller") === "1",
      deals: sp.get("deals") === "1",
    });

    return Response.json(result);
  } catch (error) {
    console.error("[api/products]", error);
    return Response.json({ error: "Unable to load products right now." }, { status: 500 });
  }
}
