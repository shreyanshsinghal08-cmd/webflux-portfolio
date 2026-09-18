import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Clock3,
  CloudCog,
  Code2,
  PenTool,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { EASE, Reveal } from "./Reveal";
import { SectionHeader } from "./ui";

type Course = {
  icon: LucideIcon;
  title: string;
  desc: string;
  weeks: string;
  lessons: string;
  level: string;
  tag?: string;
};

const courses: Course[] = [
  {
    icon: Code2,
    title: "Full-Stack Web Development",
    desc: "HTML, CSS, JavaScript, React & Node — design, build and deploy real products end-to-end.",
    weeks: "24 weeks",
    lessons: "96 lessons",
    level: "Beginner friendly",
    tag: "Most popular",
  },
  {
    icon: BrainCircuit,
    title: "Python, Data Science & AI",
    desc: "From Python basics to machine learning — analytics notebooks, models and AI mini-projects.",
    weeks: "28 weeks",
    lessons: "104 lessons",
    level: "Intermediate",
    tag: "High demand",
  },
  {
    icon: PenTool,
    title: "UI/UX & Graphic Design",
    desc: "Figma, Photoshop & Illustrator — craft interfaces, brand systems and a hire-ready portfolio.",
    weeks: "16 weeks",
    lessons: "64 lessons",
    level: "Beginner friendly",
  },
  {
    icon: ShieldCheck,
    title: "Cyber Security & Hacking",
    desc: "Networks, Linux & ethical hacking labs — learn to think like an attacker, defend like a pro.",
    weeks: "20 weeks",
    lessons: "80 lessons",
    level: "Intermediate",
  },
  {
    icon: CloudCog,
    title: "Cloud & DevOps",
    desc: "AWS, Docker & CI/CD pipelines — ship and scale applications the way modern teams do.",
    weeks: "18 weeks",
    lessons: "72 lessons",
    level: "Advanced",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing & SEO",
    desc: "SEO, ads & analytics — run real campaigns with budgets, dashboards and growth reports.",
    weeks: "12 weeks",
    lessons: "48 lessons",
    level: "Beginner friendly",
  },
];

export function Courses() {
  return (
    <section id="courses" className="relative py-28 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-mint/6 blur-[160px]" />

      <div className="container-x relative">
        <Reveal>
          <SectionHeader
            index="01"
            label="Programs"
            title={
              <>
                Course categories built
                <br className="hidden sm:block" /> for the{" "}
                <span className="bg-gradient-to-r from-mint-2 to-mint bg-clip-text text-transparent">
                  industry
                </span>
                .
              </>
            }
            copy="Six career tracks, one promise — every hour you spend here moves you closer to a job offer."
            right={
              <a
                href="#book"
                className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-mist transition-colors hover:text-mint-2"
              >
                View full syllabus
                <ArrowRight
                  size={15}
                  className="text-mint-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            }
          />
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {courses.map((c, i) => (
            <motion.article
              key={c.title}
              variants={{
                hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.9, ease: EASE, delay: (i % 3) * 0.1 + Math.floor(i / 3) * 0.06 },
                },
              }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-mint/30 hover:bg-mint/[0.04] hover:shadow-[0_30px_80px_-30px_rgba(16,185,129,0.3)]"
            >
              {/* hover sheen */}
              <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[130%] -translate-x-1/2 rounded-full bg-mint/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-mint/25 bg-mint/10 text-mint-2 transition-all duration-500 group-hover:border-mint group-hover:bg-mint group-hover:text-ink group-hover:shadow-[0_0_24px_rgba(16,185,129,0.5)]">
                  <c.icon size={19} strokeWidth={1.5} />
                </span>
                {c.tag && (
                  <span className="rounded-full border border-mint/20 bg-mint/8 px-3 py-1 text-[9.5px] font-bold uppercase tracking-[0.16em] text-mint-2">
                    {c.tag}
                  </span>
                )}
              </div>

              <h3 className="relative mt-6 font-display text-[17.5px] font-semibold tracking-tight text-frost">
                {c.title}
              </h3>
              <p className="relative mt-2.5 flex-1 text-[13.5px] leading-relaxed text-mist">
                {c.desc}
              </p>

              <div className="relative mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/6 pt-5 text-[11.5px] font-medium text-mist/80">
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 size={13} className="text-mint-2/80" />
                  {c.weeks}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen size={13} className="text-mint-2/80" />
                  {c.lessons}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BarChart3 size={13} className="text-mint-2/80" />
                  {c.level}
                </span>
              </div>

              <div className="relative mt-5 flex items-center justify-between text-[13px] font-semibold">
                <span className="text-mist transition-colors duration-300 group-hover:text-mint-2">
                  Explore course
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-mint-2 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
