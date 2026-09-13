import { getProductBySlug, getRelated } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  try {
    const product = await getProductBySlug(slug);
    if (!product) return Response.json({ error: "Product not found" }, { status: 404 });
    const related = await getRelated(product, 10);
    return Response.json({ product, related });
  } catch (error) {
    console.error("[api/products/slug]", error);
    return Response.json({ error: "Unable to load product." }, { status: 500 });
  }
}
