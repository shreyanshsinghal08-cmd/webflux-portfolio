import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Clock3, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { MintButton } from "./ui";

const assurances = [
  { icon: Clock3, label: "30-minute session" },
  { icon: ShieldCheck, label: "Zero commitment" },
  { icon: Sparkles, label: "Free career roadmap" },
];

export function BookCTA() {
  return (
    <section id="book" className="relative py-28 lg:py-32">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.015] px-8 py-14 backdrop-blur-xl sm:px-14 lg:px-20 lg:py-20">
            {/* décor */}
            <div className="pointer-events-none absolute inset-0 bg-grid-lines opacity-60 [mask-image:radial-gradient(ellipse_60%_80%_at_70%_50%,black,transparent)]" />
            <div className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-mint/15 blur-[130px]" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-[120px]" />

            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="glass pointer-events-auto absolute right-10 top-10 hidden h-12 w-12 place-items-center rounded-2xl lg:grid"
            >
              <CalendarCheck size={20} strokeWidth={1.25} className="text-mint-2" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="glass pointer-events-auto absolute bottom-10 right-40 hidden h-10 w-10 place-items-center rounded-xl lg:grid"
            >
              <Sparkles size={16} strokeWidth={1.25} className="text-mint-2/80" />
            </motion.div>

            <div className="relative flex flex-wrap items-center justify-between gap-10">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-mint/25 bg-mint/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-mint-2">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint-2" />
                  Limited seats per batch
                </div>
                <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.02em] text-frost">
                  Book your free
                  <br />
                  demo class{" "}
                  <span className="bg-gradient-to-r from-mint-2 to-mint bg-clip-text text-transparent">
                    today
                  </span>
                  .
                </h2>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mist">
                  Sit in on a real class, meet your mentor and get a personal
                  roadmap — before you spend a single rupee.
                </p>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                  {assurances.map((a) => (
                    <span
                      key={a.label}
                      className="inline-flex items-center gap-2 text-[12.5px] font-medium text-mist"
                    >
                      <a.icon size={14} strokeWidth={1.8} className="text-mint-2" />
                      {a.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start gap-5 sm:items-end">
                <MintButton large className="px-10 py-[18px] text-base">
                  Book Free Demo Class
                  <ArrowRight
                    size={19}
                    strokeWidth={2.5}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </MintButton>
                <a
                  href="tel:+919876543210"
                  className="group inline-flex items-center gap-2.5 text-[13.5px] font-medium text-mist transition-colors hover:text-mint-2"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-mint-2 transition-colors group-hover:border-mint/40">
                    <Phone size={13} strokeWidth={1.8} />
                  </span>
                  or call us —{" "}
                  <span className="font-semibold text-frost group-hover:text-mint-2">
                    +91 98765 43210
                  </span>
                </a>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-mist/50">
                  Avg. response time · under 2 minutes
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
