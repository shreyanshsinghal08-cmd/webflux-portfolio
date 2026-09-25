const marqueeItems = [
  "NCERT Line-by-Line",
  "Map Work Mastery",
  "Board Answer Writing",
  "Chapter-wise Mock Tests",
  "History · Geography · Civics · Economics",
  "CBSE & State Board",
  "Classes 9th to 12th",
  "Mathura, Uttar Pradesh",
];

const pillars = [
  {
    n: "01",
    title: "Concept before Content",
    text: "Every chapter begins with the 'why'. Students understand causes, consequences and connections — not isolated facts.",
  },
  {
    n: "02",
    title: "Board-Calibrated Writing",
    text: "Marking-scheme aligned answer frameworks: keywords, structure, and presentation that examiners reward.",
  },
  {
    n: "03",
    title: "Relentless Revision Cycles",
    text: "Spaced repetition through weekly tests, map drills and rapid-fire sessions ensures nothing is forgotten by March.",
  },
];

export default function Overview() {
  return (
    <section id="overview" className="relative bg-charcoal">
      {/* Marquee band */}
      <div className="relative overflow-hidden border-y border-white/5 bg-obsidian py-4">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-10 text-xs uppercase tracking-[0.25em] text-ash">
              {item}
              <span className="h-1 w-1 rotate-45 bg-gold/70" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">Overview</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ivory sm:text-4xl lg:text-[2.75rem]">
              A structured path from{" "}
              <span className="text-gold-gradient">Class 9 foundations</span> to{" "}
              <span className="italic">Class 12 mastery.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-mist/75">
              Agarwal Classes for Social Science is a focused, single-subject institute in Mathura.
              We teach one thing exceptionally well — Social Science &amp; Humanities — so that every
              student walks into the board exam with clarity, confidence and a proven writing method.
            </p>
            <div className="gold-line mt-8 w-32" />
            <div className="mt-8 flex items-center gap-5">
              <div className="flex -space-x-3">
                {["GA", "SS", "9+", "★"].map((t, i) => (
                  <span
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-charcoal bg-gradient-to-br from-charcoal-3 to-graphite text-[11px] font-semibold text-gold"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-sm text-ash">
                Trusted by families across <span className="text-mist">Mathura &amp; Vrindavan</span>
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:col-span-7">
            {pillars.map((p, i) => (
              <div
                key={p.n}
                className="glass-card reveal flex gap-5 rounded-2xl p-6 sm:p-7"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span className="font-display text-2xl font-semibold text-gold/60">{p.n}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-ivory">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist/70">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
