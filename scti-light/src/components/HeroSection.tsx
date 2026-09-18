import { ArrowRight, Calendar, CheckCircle2, Search, ShieldCheck } from 'lucide-react';
import { Course } from '../types';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectCourse: (course: Course) => void;
  courses: Course[];
  onOpenDemoModal: () => void;
  onOpenVerifyModal: () => void;
}

const categories = [
  { label: 'All courses', value: 'All' },
  { label: 'Basic Computing', value: 'Foundation' },
  { label: 'Python Coding', value: 'Programming' },
  { label: 'Graphic Design', value: 'Design' },
];

export function HeroSection({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onSelectCourse,
  courses,
  onOpenDemoModal,
  onOpenVerifyModal,
}: HeroSectionProps) {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchResults = normalizedQuery
    ? courses.filter(
        (course) =>
          course.title.toLowerCase().includes(normalizedQuery) ||
          course.subtitle.toLowerCase().includes(normalizedQuery) ||
          course.tools.some((tool) => tool.name.toLowerCase().includes(normalizedQuery)),
      )
    : [];

  return (
    <section id="top" className="relative isolate flex min-h-[720px] items-center overflow-hidden bg-slate-950">
      <img
        src="https://images.pexels.com/photos/5530478/pexels-photo-5530478.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800"
        alt="Students learning practical computer skills in a modern training lab"
        className="hero-image-settle absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/92 to-slate-950/35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="hero-reveal max-w-3xl">
          <p className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
            Smart Computer Training Institute
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-100 backdrop-blur-md">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            Govt. recognized certification | ISO 9001:2015
          </div>

          <h1 className="mt-7 text-5xl font-extrabold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
            Master Digital & IT Skills
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
            Build job-ready skills through practical, instructor-led training in computing,
            Python, and visual design. Every learner gets a dedicated workstation.
          </p>

          <div className="relative mt-9 max-w-2xl">
            <div className="flex items-center rounded-2xl border border-white/20 bg-white p-2 shadow-2xl shadow-slate-950/30 focus-within:ring-4 focus-within:ring-blue-500/20">
              <Search className="ml-2 h-5 w-5 shrink-0 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search Python, Excel, Photoshop or a course"
                aria-label="Search courses"
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
              />
              <a
                href="#courses"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"
              >
                Find courses
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                {searchResults.map((course) => (
                  <button
                    type="button"
                    key={course.id}
                    onClick={() => {
                      onSelectCourse(course);
                      onSearchChange('');
                    }}
                    className="flex w-full items-center justify-between gap-4 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50"
                  >
                    <span>
                      <span className="block text-sm font-bold text-slate-900">{course.title}</span>
                      <span className="mt-0.5 block text-xs text-slate-500">{course.duration} | {course.level}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-blue-600" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                type="button"
                key={category.value}
                onClick={() => onSelectCategory(category.value)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  selectedCategory === category.value
                    ? 'border-white bg-white text-slate-900'
                    : 'border-white/20 bg-white/10 text-slate-200 hover:bg-white/15'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onOpenDemoModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              <Calendar className="h-4 w-4" />
              Book Free Demo
            </button>
            <button
              type="button"
              onClick={onOpenVerifyModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/15"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Verify Online Credentials
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}