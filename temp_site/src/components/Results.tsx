const toppers = [
  { name: "Aarav S.", cls: "Class 10 · CBSE", score: 98, note: "Full marks in Map Work & History section" },
  { name: "Priya V.", cls: "Class 12 · Political Science", score: 97, note: "Now pursuing B.A. (Hons.) at Delhi University" },
  { name: "Rohan G.", cls: "Class 10 · UP Board", score: 96, note: "From 62% in Class 9 to 96% in boards" },
  { name: "Ishita A.", cls: "Class 12 · History", score: 95, note: "CUET Humanities 99th percentile" },
];

const testimonials = [
  {
    quote:
      "My daughter used to dread History. Within two months at Agarwal Classes she was narrating chapters at the dinner table. She scored 97 in boards.",
    who: "Mrs. Sunita Sharma",
    role: "Parent · Class 10 student",
  },
  {
    quote:
      "Sir's answer-writing framework changed everything. I finally knew exactly what to write for a 5-marker and how much. No more guesswork.",
    who: "Kartik Mishra",
    role: "Class 12 · Humanities",
  },
  {
    quote:
      "Weekly tests and map practice gave me real confidence. The 1-on-1 doubt slots meant I never carried confusion into the next chapter.",
    who: "Ananya Gupta",
    role: "Class 11 · Humanities",
  },
];

const distribution = [
  { band: "95–100", pct: 38 },
  { band: "90–94", pct: 34 },
  { band: "80–89", pct: 21 },
  { band: "Below 80", pct: 7 },
];

export default function Results() {
  return (
    <section id="results" className="relative overflow-hidden bg-obsidian py-20 sm:py-28">
      <div className="grid-fade absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">Results</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ivory sm:text-4xl lg:text-5xl">
              Numbers that speak <span className="text-gold-gradient">louder than claims.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-mist/65">
            Board performance of our batches over the last academic sessions — CBSE and UP Board combined.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* Distribution chart */}
          <div className="reveal glass-card rounded-3xl p-7 lg:col-span-5">
            <h3 className="font-display text-xl font-semibold text-ivory">Board Score Distribution</h3>
            <p className="mt-1 text-xs text-ash">Class 10 &amp; 12 Social Science / Humanities</p>
            <div className="mt-8 space-y-5">
              {distribution.map((d, i) => (
                <div key={d.band}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-mist/80">{d.band}</span>
                    <span className="font-medium text-gold">{d.pct}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold to-amber shadow-[0_0_12px_rgba(229,169,60,0.5)]"
                      style={{ width: `${d.pct}%`, transitionDelay: `${i * 0.1}s`, transition: "width 1.4s cubic-bezier(.22,1,.36,1)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/5 p-4">
              <p className="font-display text-3xl font-semibold text-gold-gradient">72%</p>
              <p className="text-xs uppercase tracking-[0.2em] text-ash">of students score 90 or above</p>
            </div>
          </div>

          {/* Toppers */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {toppers.map((t, i) => (
              <div
                key={t.name}
                className="glass-card reveal relative overflow-hidden rounded-3xl p-6"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-lg font-semibold text-ivory">{t.name}</p>
                    <p className="text-xs text-ash">{t.cls}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-4xl font-semibold text-gold-gradient">{t.score}</p>
                    <p className="text-[10px] uppercase tracking-widest text-ash">/ 100</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-mist/70">{t.note}</p>
                <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-gold/50 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.who}
              className="reveal glass rounded-3xl p-7"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-mist/80">“{t.quote}”</blockquote>
              <figcaption className="mt-5">
                <p className="text-sm font-semibold text-ivory">{t.who}</p>
                <p className="text-xs text-ash">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
