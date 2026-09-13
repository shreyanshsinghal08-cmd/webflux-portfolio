"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { STORE } from "@/lib/store";

const inputCls =
  "h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

function readFiles(list: FileList | null, max = 3) {
  const files = Array.from(list ?? []).slice(0, max);
  return Promise.all(
    files.map(
      (f) =>
        new Promise<{ name: string; dataUrl: string }>((resolve) => {
          if (f.size > 1_400_000) {
            resolve({ name: f.name, dataUrl: "" });
            return;
          }
          const reader = new FileReader();
          reader.onload = () => resolve({ name: f.name, dataUrl: String(reader.result ?? "") });
          reader.onerror = () => resolve({ name: f.name, dataUrl: "" });
          reader.readAsDataURL(f);
        }),
    ),
  );
}

export function PrescriptionForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [medicines, setMedicines] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<{ name: string; dataUrl: string }[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ id: string; message: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (fullName.trim().length < 3) return setError("Please enter the patient's full name.");
    if (phone.replace(/\D/g, "").length !== 10) return setError("Please enter a valid 10-digit mobile number.");
    if (!medicines.trim() && files.length === 0)
      return setError("Attach a prescription image or type the medicine names.");
    setBusy(true);
    try {
      const res = await fetch("/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone,
          email: email.trim(),
          city: city.trim(),
          medicines: medicines.trim(),
          notes: notes.trim(),
          files: files.filter((f) => f.dataUrl).map((f) => ({ name: f.name, dataUrl: f.dataUrl })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) return setError(data?.error ?? "Could not submit. Please try again.");
      setDone({ id: data.requestId, message: data.message });
    } catch {
      setError("Network error. Please try again or WhatsApp us.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg">
          <Icon name="check" className="h-8 w-8" strokeWidth={3} />
        </div>
        <h3 className="mt-4 text-xl font-extrabold text-emerald-950">Prescription received</h3>
        <p className="mt-1 text-[13px] font-bold text-emerald-800">Reference {done.id}</p>
        <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-emerald-900/80">{done.message}</p>
        {files.filter((f) => f.dataUrl).length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {files
              .filter((f) => f.dataUrl)
              .map((f) => (
                <img key={f.name} src={f.dataUrl} alt={f.name} className="h-20 w-20 rounded-xl object-cover ring-2 ring-white" />
              ))}
          </div>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(`Hello, prescription reference ${done.id}`)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white"
          >
            <Icon name="whatsapp" className="h-4 w-4" /> Chat with our pharmacist
          </a>
          <a href="/products" className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white px-5 py-3 text-sm font-bold text-emerald-800">
            Browse OTC medicines
          </a>
        </div>
        <button
          type="button"
          onClick={() => {
            setDone(null);
            setFullName("");
            setPhone("");
            setEmail("");
            setCity("");
            setMedicines("");
            setNotes("");
            setFiles([]);
          }}
          className="mt-4 text-[12.5px] font-semibold text-emerald-800 underline"
        >
          Submit another prescription
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6">
      <h3 className="text-lg font-extrabold text-slate-900">Upload prescription</h3>
      <p className="mt-1 text-[13px] text-slate-500">
        Clear photo or PDF of the doctor's slip. Our pharmacist verifies it within 15 minutes during store hours.
      </p>

      <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 px-4 py-7 text-center transition hover:bg-emerald-50">
        <Icon name="upload" className="h-6 w-6 text-emerald-700" />
        <span className="text-[13px] font-bold text-emerald-800">
          {files.length ? `${files.length} file(s) attached — tap to change` : "Tap to attach (JPG, PNG or PDF)"}
        </span>
        <span className="text-[11.5px] text-emerald-700/70">Up to 3 files · under 1.4 MB each</span>
        <input
          type="file"
          accept="image/*,.pdf"
          multiple
          className="hidden"
          onChange={async (e) => setFiles(await readFiles(e.target.files))}
        />
      </label>

      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {files.map((f) =>
            f.dataUrl ? (
              <img key={f.name} src={f.dataUrl} alt={f.name} className="h-16 w-16 rounded-lg object-cover ring-1 ring-slate-200" />
            ) : (
              <span key={f.name} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11.5px] font-semibold text-slate-600">
                <Icon name="prescription" className="h-3.5 w-3.5" /> {f.name} (too large — send on WhatsApp)
              </span>
            ),
          )}
        </div>
      )}

      <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Patient name *</span>
          <input className={inputCls} value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Mobile *</span>
          <input
            className={inputCls}
            value={phone}
            inputMode="numeric"
            maxLength={10}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            placeholder="10-digit number"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Email</span>
          <input className={inputCls} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="for the invoice" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-wide text-slate-500">City / pincode</span>
          <input className={inputCls} value={city} onChange={(e) => setCity(e.target.value)} placeholder="Jaipur 302001" />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-wide text-slate-500">
            Medicines needed (optional if you attached a photo)
          </span>
          <textarea
            className="min-h-24 w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            value={medicines}
            onChange={(e) => setMedicines(e.target.value)}
            placeholder="e.g. Glycomet 500 x 2 strips, Telma 40 x 1, Shelcal 500 x 1"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Anything we should know?</span>
          <textarea
            className="min-h-16 w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Allergies, substitute preference, delivery timing…"
          />
        </label>
      </div>

      {error && (
        <p className="mt-3 flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-[12.5px] font-semibold text-rose-700">
          <Icon name="alert" className="h-4 w-4" /> {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {busy ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Sending…
          </>
        ) : (
          <>
            Send prescription to {STORE.ownerShort} <Icon name="arrowRight" className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="mt-2.5 text-center text-[11.5px] leading-relaxed text-slate-500">
        Your prescription is used only to dispense and verify your order. We never share it with third parties.
      </p>
    </form>
  );
}

export function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "General enquiry", message: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data?.error ?? "Could not send your message.");
      } else {
        setSent(data.message);
        setForm({ name: "", phone: "", email: "", subject: "General enquiry", message: "" });
      }
    } catch {
      setError("Network error. Please call the store instead.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6">
      <h3 className="text-lg font-extrabold text-slate-900">Write to {STORE.ownerShort}</h3>
      <p className="mt-1 text-[13px] text-slate-500">Bulk orders, medicine enquiries, complaints or feedback — every message is read.</p>

      {sent && (
        <p className="mt-4 flex items-start gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-[13px] font-semibold text-emerald-800">
          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" /> {sent}
        </p>
      )}

      <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Your name *</span>
          <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Mobile *</span>
          <input
            className={inputCls}
            value={form.phone}
            inputMode="numeric"
            maxLength={10}
            onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
            placeholder="10-digit number"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Email</span>
          <input className={inputCls} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Subject</span>
          <select className={inputCls} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
            {["General enquiry", "Medicine availability", "Bulk / hospital supply", "Subscription refills", "Order issue", "Feedback"].map(
              (s) => (
                <option key={s} value={s}>{s}</option>
              ),
            )}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Message *</span>
          <textarea
            className="min-h-28 w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell us what you need…"
          />
        </label>
      </div>

      {error && (
        <p className="mt-3 flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-[12.5px] font-semibold text-rose-700">
          <Icon name="alert" className="h-4 w-4" /> {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-3.5 text-sm font-extrabold text-white transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {busy ? "Sending…" : "Send message"}
        {!busy && <Icon name="arrowRight" className="h-4 w-4" />}
      </button>
    </form>
  );
}
