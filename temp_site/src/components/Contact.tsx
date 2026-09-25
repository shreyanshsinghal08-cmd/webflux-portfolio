import { useState, type FormEvent } from "react";

const PHONE = "+919876543210";
const PHONE_DISPLAY = "+91 98765 43210";

type FormState = {
  name: string;
  cls: string;
  phone: string;
  school: string;
};

const initial: FormState = { name: "", cls: "", phone: "", school: "" };

export default function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er: Partial<FormState> = {};
    if (form.name.trim().length < 2) er.name = "Please enter the student's full name.";
    if (!form.cls) er.cls = "Select a class.";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "").slice(-10))) er.phone = "Enter a valid 10-digit mobile number.";
    if (form.school.trim().length < 2) er.school = "Please enter the school name.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    setTimeout(() => setStatus("done"), 1100);
  };

  const whatsappText = encodeURIComponent(
    `Hello Agarwal Classes! I'd like to enquire about admission.\nStudent: ${form.name || "—"}\nClass: ${form.cls || "—"}\nSchool: ${form.school || "—"}`
  );

  return (
    <section id="contact" className="relative overflow-hidden bg-charcoal py-20 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(212,175,55,0.10),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: info */}
          <div className="reveal lg:col-span-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">Student Inquiry &amp; Contact</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ivory sm:text-4xl lg:text-[2.75rem]">
              Book a <span className="text-gold-gradient">free demo class</span> in Mathura.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-mist/70">
              Fill in the form and we'll call you back within 24 hours to schedule a demo and share the
              batch timetable. Seats per batch are limited.
            </p>

            {/* Location marker */}
            <div className="glass-card mt-9 rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <span className="relative mt-1 flex h-12 w-12 shrink-0 items-center justify-center">
                  <span className="pulse-ring absolute inset-0 rounded-full" />
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber text-obsidian shadow-[0_0_24px_rgba(229,169,60,0.6)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-ash">Institute Location</p>
                  <p className="mt-1 font-display text-xl font-semibold text-ivory">Mathura, Uttar Pradesh</p>
                  <p className="mt-1 text-sm text-mist/70">
                    Agarwal Classes for Social Science
                    <br />
                    Near Holi Gate, Mathura – 281001, U.P., India
                  </p>
                  <a
                    href="https://maps.google.com/?q=Mathura,+Uttar+Pradesh"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:underline"
                  >
                    Open in Google Maps
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M7 17L17 7M8 7h9v9" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Decorative mini map */}
              <div className="relative mt-6 h-28 overflow-hidden rounded-2xl border border-white/5 bg-obsidian">
                <div className="grid-fade absolute inset-0 opacity-90" style={{ backgroundSize: "24px 24px" }} />
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 112" fill="none">
                  <path d="M0 70 C 80 40, 140 90, 220 60 S 340 30, 400 55" stroke="rgba(212,175,55,0.35)" strokeWidth="1.5" />
                  <path d="M0 30 C 60 60, 160 20, 240 45 S 330 80, 400 40" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <path d="M120 0 L 150 112" stroke="rgba(255,255,255,0.06)" />
                  <path d="M260 0 L 240 112" stroke="rgba(255,255,255,0.06)" />
                  <circle cx="200" cy="58" r="22" stroke="rgba(212,175,55,0.3)" strokeDasharray="3 4" />
                  <circle cx="200" cy="58" r="5" fill="#E5A93C" />
                  <circle cx="200" cy="58" r="10" fill="rgba(229,169,60,0.25)" />
                </svg>
                <span className="absolute left-1/2 top-[74px] -translate-x-1/2 rounded-full bg-obsidian/80 px-2 py-0.5 text-[10px] tracking-widest text-gold backdrop-blur">
                  MATHURA
                </span>
              </div>
            </div>

            {/* Quick actions */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/${PHONE.replace("+", "")}?text=${whatsappText}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition hover:border-[#25D366]/50 hover:bg-[#25D366]/5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8.1 8.1 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.1 4.5c1.9.8 2.6.9 3.6.7a3 3 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-ivory">WhatsApp</p>
                  <p className="text-[11px] text-ash">Quick chat</p>
                </div>
              </a>
              <a
                href={`tel:${PHONE}`}
                className="group flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition hover:border-gold/50 hover:bg-gold/5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.8 2z" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-ivory">Call Now</p>
                  <p className="text-[11px] text-ash">{PHONE_DISPLAY}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal lg:col-span-7">
            <div className="glass-strong relative overflow-hidden rounded-[2rem] p-6 sm:p-9">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-semibold text-ivory">Enrollment Inquiry</h3>
                  <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-widest text-gold">
                    Free Demo
                  </span>
                </div>
                <p className="mt-2 text-sm text-mist/65">Session 2026–27 · New batches starting soon</p>

                {status === "done" ? (
                  <div className="mt-10 flex flex-col items-center py-10 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber text-obsidian shadow-[0_0_40px_rgba(229,169,60,0.5)]">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </span>
                    <h4 className="mt-6 font-display text-2xl font-semibold text-ivory">Thank you, {form.name.split(" ")[0]}!</h4>
                    <p className="mt-2 max-w-sm text-sm text-mist/70">
                      Your inquiry for Class {form.cls} has been received. We'll call {form.phone} within 24 hours
                      to confirm your demo class.
                    </p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <a
                        href={`https://wa.me/${PHONE.replace("+", "")}?text=${whatsappText}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-gold px-6 py-3 text-sm"
                      >
                        Continue on WhatsApp
                      </a>
                      <button
                        onClick={() => {
                          setForm(initial);
                          setStatus("idle");
                        }}
                        className="btn-ghost px-6 py-3 text-sm"
                      >
                        Submit another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
                    <Field label="Student Name" error={errors.name}>
                      <input
                        className="input-glass"
                        placeholder="e.g. Aarav Sharma"
                        value={form.name}
                        onChange={update("name")}
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Class" error={errors.cls}>
                      <select className="input-glass" value={form.cls} onChange={update("cls")}>
                        <option value="">Select class</option>
                        <option value="9th">Class 9th</option>
                        <option value="10th">Class 10th</option>
                        <option value="11th">Class 11th (Humanities)</option>
                        <option value="12th">Class 12th (Humanities)</option>
                      </select>
                    </Field>
                    <Field label="Phone Number" error={errors.phone}>
                      <input
                        className="input-glass"
                        placeholder="10-digit mobile number"
                        inputMode="tel"
                        value={form.phone}
                        onChange={update("phone")}
                        autoComplete="tel"
                      />
                    </Field>
                    <Field label="School Name" error={errors.school}>
                      <input
                        className="input-glass"
                        placeholder="e.g. Kendriya Vidyalaya, Mathura"
                        value={form.school}
                        onChange={update("school")}
                      />
                    </Field>

                    <div className="sm:col-span-2">
                      <div className="flex flex-wrap gap-2">
                        {["CBSE", "UP Board", "Hindi Medium", "English Medium"].map((t) => (
                          <span key={t} className="rounded-full border border-white/8 px-3 py-1 text-[11px] text-ash">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-ash">
                        By submitting, you agree to be contacted regarding admissions. No spam, ever.
                      </p>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="btn-gold px-7 py-3.5 text-sm disabled:opacity-70"
                      >
                        {status === "sending" ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-obsidian/30 border-t-obsidian" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Request Callback
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-ash">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-amber">{error}</span>}
    </label>
  );
}
