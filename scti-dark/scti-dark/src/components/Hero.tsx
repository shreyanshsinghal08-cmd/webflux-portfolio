import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  CalendarCheck,
  Code2,
  Cpu,
  Database,
  Globe,
  ShieldCheck,
} from "lucide-react";
import type { MouseEvent } from "react";
import { EASE } from "./Reveal";
import { GhostButton, MintButton } from "./ui";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: EASE },
  },
};

const stats = [
  { k: "12k+", v: "Students trained" },
  { k: "40+", v: "Career courses" },
  { k: "96%", v: "Placement rate" },
  { k: "4.9/5", v: "Learner rating" },
];

type Token = { t: string; c?: string };

const LINES: Token[][] = [
  [{ t: "// my-future.ts — smart institute", c: "text-slate-500" }],
  [
    { t: "const ", c: "text-sky-300" },
    { t: "student", c: "text-frost" },
    { t: " = ", c: "text-mist" },
    { t: "await ", c: "text-violet-300" },
    { t: "institute", c: "text-frost" },
    { t: ".", c: "text-mist" },
    { t: "enroll", c: "text-mint-2" },
    { t: "(", c: "text-mist" },
    { t: '"you"', c: "text-amber-300" },
    { t: ");", c: "text-mist" },
  ],
  [],
  [
    { t: "student", c: "text-frost" },
    { t: ".", c: "text-mist" },
    { t: "learn", c: "text-mint-2" },
    { t: "([", c: "text-mist" },
    { t: '"code"', c: "text-amber-300" },
    { t: ", ", c: "text-mist" },
    { t: '"design"', c: "text-amber-300" },
    { t: ", ", c: "text-mist" },
    { t: '"data"', c: "text-amber-300" },
    { t: "]);", c: "text-mist" },
  ],
  [
    { t: "while", c: "text-sky-300" },
    { t: " (student", c: "text-frost" },
    { t: ".", c: "text-mist" },
    { t: "practicing", c: "text-frost" },
    { t: ") {", c: "text-mist" },
  ],
  [
    { t: "  career", c: "text-frost" },
    { t: ".", c: "text-mist" },
    { t: "shipProject", c: "text-mint-2" },
    { t: "(student);", c: "text-mist" },
  ],
  [{ t: "}", c: "text-mist" }],
  [],
  [
    { t: "const ", c: "text-sky-300" },
    { t: "offer", c: "text-frost" },
    { t: " = ", c: "text-mist" },
    { t: "await ", c: "text-violet-300" },
    { t: "career", c: "text-frost" },
    { t: ".", c: "text-mist" },
    { t: "place", c: "text-mint-2" },
    { t: "(student);", c: "text-mist" },
  ],
  [
    { t: "console", c: "text-frost" },
    { t: ".", c: "text-mist" },
    { t: "log", c: "text-mint-2" },
    { t: "(", c: "text-mist" },
    { t: '"hired — see you at the top"', c: "text-amber-300" },
    { t: ");", c: "text-mist" },
  ],
];

const orbitIcons = [
  { Icon: Globe, className: "left-[4%] top-[10%]", delay: 0 },
  { Icon: Code2, className: "right-[8%] top-[6%]", delay: 1.4 },
  { Icon: Database, className: "right-[0%] top-[56%]", delay: 0.7 },
  { Icon: Cpu, className: "left-[0%] bottom-[18%]", delay: 2 },
  { Icon: ShieldCheck, className: "bottom-[1%] left-[42%]", delay: 1 },
];

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 16 });
  const sy = useSpring(my, { stiffness: 55, damping: 16 });
  const chipX = useTransform(sx, (v) => v * -0.65);
  const chipY = useTransform(sy, (v) => v * -0.65);

  const onMove = (e: MouseEvent) => {
    mx.set((e.clientX / window.innerWidth - 0.5) * 24);
    my.set((e.clientY / window.innerHeight - 0.5) * 16);
  };

  return (
    <section id="top" onMouseMove={onMove} className="relative overflow-hidden">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_75%_62%_at_50%_32%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-44 right-[-8%] h-[580px] w-[580px] rounded-full bg-mint/15 blur-[160px]" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-indigo-500/8 blur-[140px]" />

      <div className="container-x relative grid min-h-[100svh] items-center gap-16 pb-24 pt-36 lg:grid-cols-[1.02fr_0.98fr] lg:pt-32">
        {/* ————— Copy ————— */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-2 pl-3.5 pr-4 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint-2" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-mist">
              Admissions open · 2026 batches
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 font-display text-[clamp(3rem,5.6vw,5.1rem)] font-bold leading-[1.02] tracking-[-0.03em] text-frost"
          >
            Build your{" "}
            <span className="bg-gradient-to-r from-mint-2 via-mint to-mint-2 bg-clip-text text-transparent">
              future
            </span>
            <br />
            in <span className="text-outline">tech</span>
            <span className="text-mint-2">.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-mist"
          >
            Job-focused computer training with live projects, expert mentors and
            end-to-end placement support — from your first{" "}
            <span className="font-mono text-[13.5px] text-mint-2">hello world</span> to
            your first offer letter.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <MintButton large>
              Book Free Demo Class
              <ArrowRight
                size={17}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </MintButton>
            <GhostButton className="px-7 py-4">
              Explore Courses
              <ArrowDown size={15} className="text-mint-2" />
            </GhostButton>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-8 border-t border-white/5 pt-8 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.v}>
                <div className="font-display text-[26px] font-bold tracking-tight text-frost">
                  {s.k}
                </div>
                <div className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.16em] text-mist/70">
                  {s.v}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ————— Visual composition ————— */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
          className="relative hidden h-[560px] lg:block"
        >
          <motion.div style={{ x: sx, y: sy }} className="absolute inset-0">
            {/* glow core */}
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint/20 blur-[110px]" />

            {/* orbit rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/8"
            >
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-mint/15"
            >
              <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-mint-2/80" />
            </motion.div>

            {/* wireframe icons */}
            {orbitIcons.map(({ Icon, className, delay }) => (
              <motion.div
                key={className}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
                className={`glass absolute grid h-12 w-12 place-items-center rounded-2xl ${className}`}
              >
                <Icon size={21} strokeWidth={1.25} className="text-mint-2" />
              </motion.div>
            ))}

            {/* code window */}
            <div className="glass absolute inset-x-0 top-14 mx-auto w-[450px] max-w-[94%] overflow-hidden rounded-2xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between border-b border-white/6 px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-mint/70" />
                </div>
                <span className="font-mono text-[11px] text-mist/60">my-future.ts</span>
                <span className="flex items-center gap-1.5 rounded-full border border-mint/25 bg-mint/10 px-2.5 py-1 text-[9.5px] font-bold tracking-[0.14em] text-mint-2">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" />
                  LIVE
                </span>
              </div>
              <div className="px-5 py-5 font-mono text-[11.5px] leading-[2.1]">
                {LINES.map((line, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="w-4 select-none text-right text-[10px] leading-[2.4] text-white/10">
                      {i + 1}
                    </span>
                    <span className="whitespace-pre">
                      {line.length === 0 ? (
                        <span>&nbsp;</span>
                      ) : (
                        line.map((tok, j) => (
                          <span key={j} className={tok.c}>
                            {tok.t}
                          </span>
                        ))
                      )}
                    </span>
                  </div>
                ))}
                <div className="flex gap-4">
                  <span className="w-4 select-none text-right text-[10px] leading-[2.4] text-white/10">
                    {LINES.length + 1}
                  </span>
                  <span className="mt-1.5 inline-block h-4 w-[7px] animate-pulse bg-mint" />
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/6 px-5 py-2.5 font-mono text-[9.5px] text-mist/50">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" />
                  compiled successfully
                </span>
                <span>0 errors · 0 warnings</span>
              </div>
            </div>
          </motion.div>

          {/* floating chips — counter parallax */}
          <motion.div
            style={{ x: chipX, y: chipY }}
            className="absolute right-2 top-8 w-40"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="glass rounded-2xl p-4"
            >
              <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-mist/60">
                Placement rate
              </div>
              <div className="mt-1 font-display text-[26px] font-bold tracking-tight text-frost">
                96<span className="text-mint-2">%</span>
              </div>
              <svg viewBox="0 0 88 30" className="mt-2 w-full">
                <polyline
                  points="0,24 12,20 24,22 36,12 48,16 60,8 72,11 86,2"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="86" cy="2" r="2.6" fill="#34d399" />
              </svg>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ x: chipX, y: chipY }}
            className="absolute bottom-6 left-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1 }}
          >
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="glass flex items-center gap-3.5 rounded-2xl p-4 pr-5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-mint/25 bg-mint/10">
                <CalendarCheck size={17} strokeWidth={1.6} className="text-mint-2" />
              </span>
              <span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-mist/60">
                  Next batch
                </span>
                <span className="mt-0.5 block text-[13.5px] font-semibold text-frost">
                  Monday · 9:00 AM
                </span>
                <span className="block text-[11px] font-medium text-mint-2">
                  6 seats left
                </span>
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
