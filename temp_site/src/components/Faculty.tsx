import { useCountUp } from "../hooks/useCountUp";

function Metric({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { ref, value } = useCountUp(end);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="glass-card rounded-2xl p-5 text-center sm:p-6">
      <p className="font-display text-4xl font-semibold text-gold-gradient sm:text-5xl">
        {value.toLocaleString("en-IN")}
        {suffix}
      </p>
      <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-ash">{label}</p>
    </div>
  );
}

const methodology = [
  {
    step: "Diagnose",
    text: "A short entry assessment maps each student's conceptual gaps before the batch begins.",
  },
  {
    step: "Teach",
    text: "Story-driven History, map-anchored Geography, case-based Civics and real-data Economics.",
  },
  {
    step: "Practise",
    text: "Board-pattern writing every week. Timed, evaluated, and returned with margin notes.",
  },
  {
    step: "Refine",
    text: "1-on-1 doubt slots and parent progress reviews keep every learner on trajectory.",
  },
];

const reasons = [
  "Single-subject specialist — 100% focus on Social Science",
  "Small batches for genuine individual attention",
  "Handwritten, board-oriented notes for every chapter",
  "Weekly parent updates & transparent progress tracking",
  "Doubt resolution beyond class hours via WhatsApp",
  "Bilingual explanation (English / Hindi medium supported)",
];

export default function Faculty() {
  return (
    <section id="why" className="relative overflow-hidden bg-charcoal py-20 sm:py-28">
      <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Profile card */}
          <div className="reveal lg:col-span-5">
            <div className="glass-card relative overflow-hidden rounded-[2rem] p-7 sm:p-9">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-gold/25 to-transparent blur-3xl" />
              <div className="relative flex items-center gap-5">
                <div className="animate-float relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-gold/40 bg-gradient-to-br from-charcoal-3 via-graphite to-obsidian shadow-[0_0_40px_-10px_rgba(212,175,55,0.5)]">
                  <span className="font-display text-3xl font-bold text-gold">GA</span>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-obsidian">
                    Lead Educator
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-ivory sm:text-3xl">Ghanshyam Agarwal</h3>
                  <p className="mt-1 text-sm text-gold">Social Science &amp; Humanities Mentor</p>
                  <p className="mt-1 text-xs text-ash">9+ Years · Mathura, Uttar Pradesh</p>
                </div>
              </div>

              <blockquote className="relative mt-8 border-l-2 border-gold/50 pl-5 font-display text-lg italic leading-relaxed text-mist/90">
                “Social Science isn't memorised — it's understood. When a student can explain why the
                French Revolution mattered or how federalism shapes their own city, marks follow naturally.”
              </blockquote>

              <div className="relative mt-8 space-y-3 text-sm text-mist/75">
                <p>
                  Over nine years in Mathura, Ghanshyam Sir has refined a pedagogy that blends narrative
                  teaching with rigorous exam discipline. His students consistently outperform school
                  averages in board examinations across CBSE and UP Board.
                </p>
                <p>
                  His structured methodology — Diagnose → Teach → Practise → Refine — ensures every
                  learner, from a hesitant Class 9 beginner to a CUET-aspiring Class 12 student, gets a
                  clear roadmap.
                </p>
              </div>

              <div className="relative mt-8 flex flex-wrap gap-2">
                {["History", "Geography", "Political Science", "Economics"].map((s) => (
                  <span key={s} className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-mist/70">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-7">
            <div className="reveal">
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">Faculty &amp; Mentorship · Why Choose Us</p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ivory sm:text-4xl lg:text-[2.75rem]">
                Nine years of <span className="text-gold-gradient">academic excellence</span>, one structured
                method.
              </h2>
            </div>

            {/* Metrics */}
            <div className="reveal mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Metric end={9} suffix="+" label="Years Teaching" />
              <Metric end={1000} suffix="+" label="Students Mentored" />
              <Metric end={95} suffix="+" label="Consistent Scorers" />
            </div>

            {/* Methodology timeline */}
            <div className="reveal mt-12">
              <p className="text-[10px] uppercase tracking-[0.25em] text-ash">Structured Methodology</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {methodology.map((m, i) => (
                  <div key={m.step} className="relative flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 font-display text-sm font-semibold text-gold">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="font-display text-lg font-semibold text-ivory">{m.step}</h4>
                      <p className="mt-1 text-[13px] leading-relaxed text-mist/65">{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reasons */}
            <ul className="reveal mt-10 grid gap-3 sm:grid-cols-2">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-mist/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
