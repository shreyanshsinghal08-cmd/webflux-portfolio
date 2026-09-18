import { Asterisk } from "lucide-react";

const items = [
  "Web Development",
  "React",
  "Python",
  "Data Science",
  "UI / UX Design",
  "Cyber Security",
  "Cloud & DevOps",
  "Java",
  "SQL & Databases",
  "Digital Marketing",
  "Machine Learning",
  "MS Office Pro",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((label) => (
        <div key={label} className="flex items-center">
          <span className="px-7 text-[12.5px] font-medium uppercase tracking-[0.3em] text-mist/55 transition-colors hover:text-mist">
            {label}
          </span>
          <Asterisk size={13} className="shrink-0 text-mint/60" />
        </div>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <section className="group relative overflow-hidden border-y border-white/5 bg-white/[0.015] py-5">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <Row />
        <Row />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink to-transparent" />
    </section>
  );
}
