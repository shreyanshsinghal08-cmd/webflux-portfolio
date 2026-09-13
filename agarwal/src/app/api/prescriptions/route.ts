import { db } from "@/db";
import { prescriptionRequests } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const fullName = String(body?.fullName ?? "").trim();
  const phone = String(body?.phone ?? "").replace(/\D/g, "");
  const email = String(body?.email ?? "").trim();
  const city = String(body?.city ?? "").trim();
  const medicines = String(body?.medicines ?? "").trim();
  const notes = String(body?.notes ?? "").trim();
  const files: { name: string; dataUrl: string }[] = Array.isArray(body?.files)
    ? body.files
        .filter((f: any) => f && typeof f.name === "string" && typeof f.dataUrl === "string")
        .slice(0, 3)
        .map((f: any) => ({ name: String(f.name).slice(0, 120), dataUrl: String(f.dataUrl).slice(0, 1_200_000) }))
    : [];
  const fileNames = files.map((f) => f.name).join(", ");

  if (fullName.length < 3)
    return Response.json({ ok: false, error: "Please enter the patient's full name." }, { status: 400 });
  if (phone.length < 10)
    return Response.json({ ok: false, error: "Please enter a valid 10-digit mobile number." }, { status: 400 });
  if (!medicines && !fileNames)
    return Response.json(
      { ok: false, error: "Upload a prescription image or type the medicine names." },
      { status: 400 },
    );

  try {
    const [row] = await db
      .insert(prescriptionRequests)
      .values({
        fullName,
        phone,
        email: email || null,
        city: city || null,
        medicines: medicines || null,
        notes: notes || null,
        fileNames: fileNames || null,
        fileData: files.length ? JSON.stringify(files) : null,
        status: "received",
      })
      .returning({ id: prescriptionRequests.id, createdAt: prescriptionRequests.createdAt });

    return Response.json({
      ok: true,
      requestId: `RX${String(row.id).padStart(5, "0")}`,
      message:
        "Prescription received. Our pharmacist will verify it and call you within 15 minutes (8 AM – 11 PM).",
    });
  } catch (error) {
    console.error("[api/prescriptions]", error);
    return Response.json({ ok: false, error: "Could not save your prescription. Please try again." }, { status: 500 });
  }
}
