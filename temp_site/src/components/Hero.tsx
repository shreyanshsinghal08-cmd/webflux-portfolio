import HeroCanvas from "./HeroCanvas";

const badges = [
  { icon: "🎓", label: "Classes 9–12" },
  { icon: "📘", label: "Board Exam Focus" },
  { icon: "💬", label: "1-on-1 Doubt Resolution" },
];

const subjects = ["History", "Geography", "Civics", "Economics"];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-obsidian pt-28 pb-16 sm:pt-32"
    >
      {/* Background layers */}
      <div className="grid-fade absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(212,175,55,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(229,169,60,0.05),transparent_50%)]" />

      {/* 3D canvas: sized to section, no layout shift */}
      <div className="absolute inset-0 lg:left-[32%]">
        <HeroCanvas />
      </div>

      {/* Edge fades so the globe blends */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent lg:w-3/5" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="anim-fade-up inline-flex items-center gap-3 rounded-full border border-gold/25 bg-gold/5 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
              New Batch Admissions Open · Mathura
            </span>
          </div>

          {/* Headline */}
          <h1 className="anim-fade-up delay-1 mt-7 font-display text-[2.5rem] leading-[1.08] font-semibold tracking-tight text-ivory sm:text-6xl lg:text-[4.2rem]">
            Mastering Social Science Through{" "}
            <em className="text-gold-gradient not-italic">Conceptual Clarity</em>{" "}
            &amp; <span className="italic font-medium">Historical Depth.</span>
          </h1>

          {/* Subtitle */}
          <p className="anim-fade-up delay-2 mt-6 max-w-xl text-base leading-relaxed text-mist/80 sm:text-lg">
            Mentorship by{" "}
            <span className="font-medium text-ivory">Ghanshyam Agarwal</span>{" "}
            <span className="text-gold">(9+ Years Experience)</span>
            <span className="mx-2 text-ash">|</span>
            Mathura, U.P.
          </p>

          {/* Badges */}
          <div className="anim-fade-up delay-3 mt-8 flex flex-wrap gap-2.5">
            {badges.map((b) => (
              <span
                key={b.label}
                className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-mist sm:text-sm"
              >
                <span aria-hidden>{b.icon}</span>
                {b.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="anim-fade-up delay-4 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contact" className="btn-gold px-7 py-4 text-sm sm:text-[15px]">
              Enroll for New Batch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="#classes" className="btn-ghost px-7 py-4 text-sm sm:text-[15px]">
              View Curriculum
            </a>
          </div>

          {/* Subject legend */}
          <div className="anim-fade-up delay-5 mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-ash">
            {subjects.map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rotate-45 bg-gold"
                  style={{ opacity: 0.5 + i * 0.15 }}
                />
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#overview"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ash transition hover:text-gold sm:flex"
      >
        Scroll
        <span className="h-10 w-px bg-gradient-to-b from-gold to-transparent" />
      </a>
    </section>
  );
}
