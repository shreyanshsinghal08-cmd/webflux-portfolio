import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Clock3,
  GraduationCap,
  Rocket,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { EASE, Reveal } from "./Reveal";
import { Eyebrow, MintButton } from "./ui";

type Feature = { icon: LucideIcon; title: string; desc: string };

const features: Feature[] = [
  {
    icon: GraduationCap,
    title: "Expert mentors, not tutors",
    desc: "Learn directly from engineers and designers with 10+ years shipping in the industry.",
  },
  {
    icon: Rocket,
    title: "Live, project-first curriculum",
    desc: "No passive video dumps. Every module ends with a real project for your portfolio.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Dedicated placement cell",
    desc: "Resume builds, unlimited mock interviews and 300+ hiring partners across India.",
  },
  {
    icon: Award,
    title: "Recognised certification",
    desc: "ISO 9001-certified institute with course certificates employers actually value.",
  },
  {
    icon: Clock3,
    title: "Batches that fit your life",
    desc: "Morning, evening and weekend tracks — for school students and working pros alike.",
  },
  {
    icon: Wallet,
    title: "Honest, affordable fees",
    desc: "Easy EMIs and merit scholarships. Premium training without the premium price.",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="relative py-28 lg:py-32">
      <div className="container-x grid gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24">
        {/* sticky intro */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Eyebrow index="02" label="Why Smart Institute" />
            <h2 className="mt-5 font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.06] tracking-[-0.02em] text-frost">
              An institute engineered
              <br />
              around{" "}
              <span className="bg-gradient-to-r from-mint-2 to-mint bg-clip-text text-transparent">
                outcomes
              </span>
              .
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mist">
              Anyone can sell a course. We obsess over what happens after it —
              your portfolio, your confidence in interviews, your first
              payslip.
            </p>
            <div className="mt-8 flex items-center gap-5">
              <MintButton>
                Book Free Demo
                <ArrowRight
                  size={15}
                  strokeWidth={2.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </MintButton>
              <a
                href="#process"
                className="text-[13.5px] font-medium text-mist underline decoration-mint/40 underline-offset-8 transition-colors hover:text-mint-2"
              >
                See how it works
              </a>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {["AK", "SR", "RV", "NJ"].map((n, i) => (
                  <span
                    key={n}
                    className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink font-display text-[10px] font-bold text-ink"
                    style={{
                      background: `linear-gradient(135deg, ${
                        ["#34d399", "#7dd3fc", "#c4b5fd", "#fbbf24"][i]
                      }, #10b981)`,
                    }}
                  >
                    {n}
                  </span>
                ))}
              </div>
              <p className="text-[12.5px] leading-snug text-mist">
                Joined by <span className="font-semibold text-frost">12,000+ alumni</span>
                <br />
                across 40+ cities
              </p>
            </div>
          </Reveal>
        </div>

        {/* feature rows */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="border-t border-white/6"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={{
                hidden: { opacity: 0, x: 32 },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.85, ease: EASE, delay: i * 0.07 },
                },
              }}
              className="group flex items-start gap-5 border-b border-white/6 py-7 transition-colors duration-300 hover:border-mint/25 sm:gap-6"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-mint-2 transition-all duration-300 group-hover:border-mint/35 group-hover:bg-mint/10">
                <f.icon size={18} strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-display text-[16px] font-semibold tracking-tight text-frost">
                  {f.title}
                </h3>
                <p className="mt-1.5 max-w-lg text-[13.5px] leading-relaxed text-mist">
                  {f.desc}
                </p>
              </div>
              <span className="ml-auto mt-1 font-mono text-[11px] text-white/15 transition-colors duration-300 group-hover:text-mint-2/70">
                0{i + 1}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
