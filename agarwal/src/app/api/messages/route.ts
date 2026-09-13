import { db } from "@/db";
import { messages } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body?.name ?? "").trim();
  const phone = String(body?.phone ?? "").replace(/\D/g, "");
  const email = String(body?.email ?? "").trim();
  const subject = String(body?.subject ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (name.length < 3) return Response.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  if (phone.length < 10)
    return Response.json({ ok: false, error: "Please enter a valid 10-digit mobile number." }, { status: 400 });
  if (message.length < 10)
    return Response.json({ ok: false, error: "Please write a message of at least 10 characters." }, { status: 400 });

  try {
    await db.insert(messages).values({
      name,
      phone,
      email: email || null,
      subject: subject || "General enquiry",
      body: message.slice(0, 2000),
      status: "new",
    });
    return Response.json({
      ok: true,
      message: `Thank you ${name.split(" ")[0]}. Your message has reached ${"Agarwal Ji"}'s desk and we will reply within 2 working hours.`,
    });
  } catch (error) {
    console.error("[api/messages]", error);
    return Response.json({ ok: false, error: "Could not send your message. Please call the store." }, { status: 500 });
  }
}
