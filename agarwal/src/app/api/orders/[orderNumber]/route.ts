import { getOrder } from "@/lib/queries";
import { PAYMENT_LABEL } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, ctx: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await ctx.params;
  try {
    const result = await getOrder(orderNumber.trim());
    if (!result) return Response.json({ ok: false, error: "No order found with this number." }, { status: 404 });
    return Response.json({
      ok: true,
      order: {
        ...result.order,
        paymentLabel: PAYMENT_LABEL[result.order.paymentMode] ?? result.order.paymentMode,
      },
      items: result.items,
    });
  } catch (error) {
    console.error("[api/orders/number]", error);
    return Response.json({ ok: false, error: "Unable to load the order." }, { status: 500 });
  }
}
