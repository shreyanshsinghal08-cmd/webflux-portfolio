import { motion } from "framer-motion";
import { CalendarCheck, MonitorPlay, Rocket, type LucideIcon } from "lucide-react";
import { EASE, Reveal } from "./Reveal";
import { SectionHeader } from "./ui";

type Step = { icon: LucideIcon; num: string; title: string; desc: string };

const steps: Step[] = [
  {
    icon: CalendarCheck,
    num: "01",
    title: "Book your free demo",
    desc: "Pick a course and reserve a slot online or on call — it takes less than a minute.",
  },
  {
    icon: MonitorPlay,
    num: "02",
    title: "Attend the live session",
    desc: "Meet your mentor, experience a real class and get a personal learning roadmap.",
  },
  {
    icon: Rocket,
    num: "03",
    title: "Enroll & start building",
    desc: "Join a batch, ship projects every week and walk out placement-ready.",
  },
];

export function Steps() {
  return (
    <section id="process" className="relative py-28 lg:py-32">
      <div className="pointer-events-none absolute right-0 top-1/4 h-[380px] w-[380px] rounded-full bg-mint/6 blur-[140px]" />
      <div className="container-x relative">
        <Reveal>
          <SectionHeader
            index="03"
            label="How it works"
            title={
              <>
                From curious to{" "}
                <span className="bg-gradient-to-r from-mint-2 to-mint bg-clip-text text-transparent">
                  career-ready
                </span>{" "}
                in three steps.
              </>
            }
          />
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative mt-14 grid gap-5 md:grid-cols-3"
        >
          {/* connector */}
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-14 hidden border-t border-dashed border-white/10 md:block" />

          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              variants={{
                hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.9, ease: EASE, delay: i * 0.12 },
                },
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-mint/30 hover:shadow-[0_30px_80px_-30px_rgba(16,185,129,0.28)]"
            >
              <span className="pointer-events-none absolute -right-3 -top-5 font-display text-[92px] font-bold leading-none tracking-tighter text-white/[0.04] transition-colors duration-500 group-hover:text-mint/[0.08]">
                {s.num}
              </span>

              <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-mint/25 bg-mint/10 text-mint-2 transition-all duration-500 group-hover:bg-mint group-hover:text-ink group-hover:shadow-[0_0_26px_rgba(16,185,129,0.5)]">
                <s.icon size={20} strokeWidth={1.5} />
              </span>

              <div className="relative mt-16 flex items-center gap-3">
                <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-mint-2/80">
                  STEP {s.num}
                </span>
                <span className="h-px flex-1 bg-white/8" />
              </div>
              <h3 className="relative mt-3 font-display text-[19px] font-semibold tracking-tight text-frost">
                {s.title}
              </h3>
              <p className="relative mt-2.5 text-[13.5px] leading-relaxed text-mist">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
