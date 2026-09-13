import { db } from "@/db";
import { orderItems, orders, products } from "@/db/schema";
import { applyCoupon, deliveryFeeFor, PAYMENT_MODES } from "@/lib/store";
import { and, inArray, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

type OrderItemInput = { productId: number; quantity: number };

function fail(message: string, status = 400) {
  return Response.json({ ok: false, error: message }, { status });
}

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request body.");
  }

  const name = String(body?.customer?.name ?? "").trim();
  const phone = String(body?.customer?.phone ?? "").replace(/\D/g, "");
  const email = String(body?.customer?.email ?? "").trim();
  const address = String(body?.customer?.address ?? "").trim();
  const city = String(body?.customer?.city ?? "").trim();
  const state = String(body?.customer?.state ?? "").trim();
  const pincode = String(body?.customer?.pincode ?? "").replace(/\D/g, "");
  const paymentMode = String(body?.paymentMode ?? "cod");
  const couponCode = body?.coupon ? String(body.coupon).trim().toUpperCase() : null;
  const notes = body?.notes ? String(body.notes).slice(0, 600) : null;
  const express = Boolean(body?.express);
  const discreet = Boolean(body?.discreet);
  const items: OrderItemInput[] = Array.isArray(body?.items) ? body.items : [];

  if (name.length < 3) return fail("Please enter the full name of the patient or receiver.");
  if (phone.length < 10) return fail("Please enter a valid 10-digit mobile number.");
  if (address.length < 8) return fail("Please enter the complete delivery address.");
  if (!city || !state) return fail("City and state are required.");
  if (pincode.length !== 6) return fail("Please enter a valid 6-digit pincode.");
  if (!PAYMENT_MODES.some((m) => m.key === paymentMode)) return fail("Unsupported payment mode.");
  if (!items.length) return fail("Your cart is empty.");
  if (items.length > 60) return fail("Maximum 60 different products per order.");
  if (items.some((i) => !Number.isInteger(i.quantity) || i.quantity < 1 || i.quantity > 10))
    return fail("Quantity must be between 1 and 10 for each product.");

  const ids = items.map((i) => Number(i.productId)).filter((n) => Number.isFinite(n));
  const rows = await db.select().from(products).where(inArray(products.id, ids));
  if (rows.length !== ids.length) return fail("One or more products are no longer available.");

  const byId = new Map(rows.map((r) => [r.id, r]));
  let subtotal = 0;
  const lines = items.map((i) => {
    const p = byId.get(Number(i.productId))!;
    const qty = Math.min(10, Math.max(1, i.quantity));
    const lineTotal = Math.round(p.price * qty * 100) / 100;
    subtotal += lineTotal;
    return {
      productId: p.id,
      name: p.name,
      brand: p.brand,
      packSize: p.packSize,
      unitPrice: p.price,
      mrp: p.mrp,
      quantity: qty,
      lineTotal,
      stock: p.stock,
    };
  });

  for (const line of lines) {
    if (line.stock < line.quantity)
      return fail(`Only ${line.stock} unit(s) of ${line.name} are in stock. Please reduce the quantity.`);
  }

  subtotal = Math.round(subtotal * 100) / 100;
  const coupon = applyCoupon(couponCode, subtotal);
  if (couponCode && !coupon.applied) return fail(coupon.error ?? "This coupon cannot be applied.");
  const deliveryFee = deliveryFeeFor(subtotal - coupon.discount, express);
  const total = Math.max(0, Math.round((subtotal - coupon.discount + deliveryFee) * 100) / 100);
  const itemCount = lines.reduce((n, l) => n + l.quantity, 0);

  try {
    const created = await db.transaction(async (tx) => {
      const [order] = await tx
        .insert(orders)
        .values({
          orderNumber: `TMP-${Date.now()}`,
          customerName: name,
          phone,
          email: email || null,
          address,
          city,
          state,
          pincode,
          paymentMode,
          couponCode: coupon.applied,
          subtotal,
          discount: coupon.discount,
          deliveryFee,
          total,
          itemCount,
          status: "confirmed",
          notes,
          discreetPackaging: discreet,
          expectedDelivery: new Date(Date.now() + (express ? 1 : 3) * 24 * 60 * 60 * 1000),
        })
        .returning({ id: orders.id });

      const orderNumber = `AJ${new Date().getFullYear()}${String(order.id).padStart(6, "0")}`;

      await tx.insert(orderItems).values(
        lines.map((l) => ({
          orderId: order.id,
          productId: l.productId,
          name: l.name,
          brand: l.brand,
          packSize: l.packSize,
          unitPrice: l.unitPrice,
          mrp: l.mrp,
          quantity: l.quantity,
          lineTotal: l.lineTotal,
        })),
      );

      for (const l of lines) {
        await tx
          .update(products)
          .set({ stock: sql`greatest(0, ${products.stock} - ${l.quantity})` })
          .where(and(sql`${products.id} = ${l.productId}`));
      }

      await tx.update(orders).set({ orderNumber }).where(sql`${orders.id} = ${order.id}`);

      return { id: order.id, orderNumber };
    });

    return Response.json({
      ok: true,
      orderNumber: created.orderNumber,
      total,
      subtotal,
      discount: coupon.discount,
      deliveryFee,
      itemCount,
      paymentMode,
    });
  } catch (error) {
    console.error("[api/orders]", error);
    return fail("We could not place your order. Please try again or call the store.", 500);
  }
}
