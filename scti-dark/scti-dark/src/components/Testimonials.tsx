import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { EASE, Reveal } from "./Reveal";
import { SectionHeader } from "./ui";

type Review = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  tint: string;
};

const reviews: Review[] = [
  {
    quote:
      "I joined right after 12th grade with zero coding knowledge. Eight months later I signed my first offer as a React developer. The mentors genuinely don't let you fall behind.",
    name: "Aarav Mehta",
    role: "Placed as React Developer",
    initials: "AM",
    tint: "#34d399",
  },
  {
    quote:
      "The design track rebuilt my portfolio from scratch — real client briefs, weekly critiques, mock interviews. I now freelance full-time and earn more than my old job.",
    name: "Sneha Kulkarni",
    role: "Freelance UI/UX Designer",
    initials: "SK",
    tint: "#7dd3fc",
  },
  {
    quote:
      "Weekend batches made it possible alongside my B.Com. The placement cell scheduled five interviews for me — I cleared three. Best decision of my career so far.",
    name: "Rahul Verma",
    role: "Data Analyst, First Job",
    initials: "RV",
    tint: "#c4b5fd",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="relative py-28 lg:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            index="04"
            label="Reviews"
            title={
              <>
                Loved by{" "}
                <span className="bg-gradient-to-r from-mint-2 to-mint bg-clip-text text-transparent">
                  thousands
                </span>{" "}
                of learners.
              </>
            }
            right={
              <div className="glass flex items-center gap-3 rounded-full py-2.5 pl-4 pr-5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className="fill-mint-2 text-mint-2" />
                  ))}
                </div>
                <span className="text-[13px] font-semibold text-frost">
                  4.9<span className="text-mist/70"> / 5 · 2,300+ reviews</span>
                </span>
              </div>
            }
          />
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              variants={{
                hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.9, ease: EASE, delay: i * 0.11 },
                },
              }}
              className="group relative flex flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-mint/25 hover:shadow-[0_30px_80px_-30px_rgba(16,185,129,0.25)]"
            >
              <Quote size={22} strokeWidth={1.25} className="text-mint/50" />
              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={12} className="fill-mint-2 text-mint-2" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[14px] leading-relaxed text-frost/85">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3.5 border-t border-white/6 pt-5">
                <span
                  className="grid h-10 w-10 place-items-center rounded-full font-display text-[11px] font-bold text-ink"
                  style={{
                    background: `linear-gradient(135deg, ${r.tint}, #10b981)`,
                  }}
                >
                  {r.initials}
                </span>
                <span>
                  <span className="block text-[13.5px] font-semibold text-frost">
                    {r.name}
                  </span>
                  <span className="mt-0.5 block text-[11.5px] text-mist">{r.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
