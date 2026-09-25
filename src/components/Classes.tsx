import { useRef, type MouseEvent } from "react";

type Course = {
  grade: string;
  tag: string;
  board: string;
  subjects: string[];
  focus: string[];
  outcome: string;
  accent: string;
};

const courses: Course[] = [
  {
    grade: "9",
    tag: "Foundation",
    board: "CBSE / UP Board",
    subjects: ["India & Contemporary World I", "Contemporary India I", "Democratic Politics I", "Economics"],
    focus: ["Map Work", "NCERT Line-by-Line Analysis", "Chapter-wise Mock Tests"],
    outcome: "Build strong conceptual roots & exam habits early.",
    accent: "from-gold/20",
  },
  {
    grade: "10",
    tag: "Board Year",
    board: "CBSE / UP Board",
    subjects: ["Nationalism & Globalisation", "Resources & Development", "Power Sharing & Federalism", "Development & Sectors"],
    focus: ["Board Answer-Writing Techniques", "Map Work", "Chapter-wise Mock Tests", "NCERT Line-by-Line Analysis"],
    outcome: "Target 95+ with examiner-aligned answer frameworks.",
    accent: "from-amber/25",
  },
  {
    grade: "11",
    tag: "Humanities",
    board: "CBSE / State Board",
    subjects: ["History: Themes in World History", "Political Science: Theory & Constitution", "Geography: Fundamentals", "Economics: Statistics & Indian Eco."],
    focus: ["NCERT Line-by-Line Analysis", "Long-Answer Structuring", "Chapter-wise Mock Tests"],
    outcome: "Transition smoothly into senior-secondary depth.",
    accent: "from-gold/20",
  },
  {
    grade: "12",
    tag: "Board + Entrance",
    board: "CBSE / State Board",
    subjects: ["History: Themes in Indian History I–III", "Political Science: World & Indian Politics", "Geography: Human & Indian", "Macro & Indian Economic Dev."],
    focus: ["Board Answer-Writing Techniques", "Map Work", "Source-Based Questions", "Chapter-wise Mock Tests"],
    outcome: "Board excellence & CUET-ready Humanities depth.",
    accent: "from-amber/25",
  },
];

function TiltCard({ course, index }: { course: Course; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 6}deg) translateY(-6px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="glass-card reveal group relative flex flex-col overflow-hidden rounded-3xl p-6 sm:p-7"
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      {/* cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(212,175,55,0.12), transparent 45%)",
        }}
      />
      <div className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${course.accent} to-transparent blur-2xl`} />

      <div className="relative flex items-start justify-between">
        <div>
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold">{course.tag}</span>
          <h3 className="mt-1 font-display text-4xl font-semibold text-ivory sm:text-5xl">
            Class <span className="text-gold-gradient">{course.grade}</span>
            <sup className="ml-0.5 text-lg text-ash">th</sup>
          </h3>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-ash">
          {course.board}
        </span>
      </div>

      <ul className="relative mt-6 space-y-1.5 text-[13px] text-mist/70">
        {course.subjects.map((s) => (
          <li key={s} className="flex gap-2">
            <span className="mt-[7px] h-1 w-1 shrink-0 rotate-45 bg-gold/60" />
            {s}
          </li>
        ))}
      </ul>

      <div className="relative mt-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-ash">Key focus</p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {course.focus.map((f) => (
            <span
              key={f}
              className="rounded-lg border border-gold/15 bg-gold/5 px-2.5 py-1 text-[11px] font-medium text-gold/90 transition group-hover:border-gold/35"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-auto pt-7">
        <div className="h-px w-full bg-gradient-to-r from-gold/40 via-white/5 to-transparent" />
        <p className="mt-4 text-sm italic leading-relaxed text-mist/80">{course.outcome}</p>
        <a
          href="#contact"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold transition group-hover:gap-3"
        >
          Join this batch
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function Classes() {
  return (
    <section id="classes" className="relative overflow-hidden bg-obsidian py-20 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.08),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">Courses &amp; Grade Modules</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ivory sm:text-4xl lg:text-5xl">
            Programs for <span className="text-gold-gradient">Classes 9, 10, 11 &amp; 12</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mist/70">
            Each module is designed around the official syllabus with weekly targets, structured notes,
            and consistent evaluation — so parents see progress, not promises.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {courses.map((c, i) => (
            <TiltCard key={c.grade} course={c} index={i} />
          ))}
        </div>

        {/* Common feature strip */}
        <div className="reveal glass mt-10 grid gap-6 rounded-3xl p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
          {[
            { icon: "🗺️", t: "Map Work", d: "Weekly drills for History & Geography map questions." },
            { icon: "✍️", t: "Board Answer-Writing", d: "Value-point method for 3, 5 & 8 markers." },
            { icon: "📖", t: "NCERT Line-by-Line", d: "Every line decoded — nothing left to chance." },
            { icon: "🧪", t: "Chapter-wise Mock Tests", d: "Timed tests with personal feedback sheets." },
          ].map((f) => (
            <div key={f.t} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/5 text-lg">
                {f.icon}
              </span>
              <div>
                <h4 className="text-sm font-semibold text-ivory">{f.t}</h4>
                <p className="mt-1 text-xs leading-relaxed text-mist/65">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
