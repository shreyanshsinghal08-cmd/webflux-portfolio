import { getCategoriesWithCounts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await getCategoriesWithCounts();
    return Response.json({ categories });
  } catch (error) {
    console.error("[api/categories]", error);
    return Response.json({ error: "Unable to load categories." }, { status: 500 });
  }
}
