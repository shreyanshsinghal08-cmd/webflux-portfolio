import React, { useState } from 'react';
import { 
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Calculator, 
  Sparkles, 
  Laptop,
  Layers,
  Code2,
  Palette,
  FileSpreadsheet
} from 'lucide-react';
import { Course } from '../types';

interface CourseGridProps {
  courses: Course[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenSyllabus: (course: Course) => void;
  onOpenFeeCalculator: (course: Course) => void;
  onOpenDemoBooking: (course?: Course) => void;
}

export const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  selectedCategory,
  onSelectCategory,
  onOpenSyllabus,
  onOpenFeeCalculator,
  onOpenDemoBooking
}) => {
  const [viewMode, setViewMode] = useState<'featured3' | 'all'>('featured3');

  // Filter courses based on active selection
  const displayedCourses = selectedCategory !== 'All'
    ? courses.filter((course) => course.category === selectedCategory)
    : viewMode === 'featured3'
      ? courses.filter((course) => course.featured)
      : courses;

  const getCourseIcon = (id: string) => {
    switch(id) {
      case 'basic-computing':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
      case 'python-coding':
        return <Code2 className="w-5 h-5 text-blue-600" />;
      case 'graphic-design':
        return <Palette className="w-5 h-5 text-indigo-600" />;
      default:
        return <Laptop className="w-5 h-5 text-slate-700" />;
    }
  };

  return (
    <section id="courses" className="scroll-mt-24 py-16 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Job-Ready Flagship Curriculum</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E293B]">
              Core Professional Training Programs
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Designed according to modern Scandinavian pedagogical standards: 70% practical lab work, 30% conceptual mastery, and verified government accreditation.
            </p>
          </div>

          {/* View Mode & Filter Controls */}
          <div className="flex items-center gap-2 shrink-0 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => {
                setViewMode('featured3');
                onSelectCategory('All');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'featured3'
                  ? 'bg-white text-[#1E293B] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3 Core Flagship Tracks
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'all'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              View Full Catalog ({courses.length})
            </button>
          </div>
        </div>

        {/* 3-Column Minimalist Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedCourses.map((course, index) => (
            <div
              key={course.id}
              className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 soft-hover-shadow overflow-hidden transition-all duration-300"
            >
              
              {/* Top Accent Line */}
              <div className={`h-1.5 w-full ${
                index === 0 ? 'bg-emerald-500' :
                index === 1 ? 'bg-blue-600' :
                index === 2 ? 'bg-indigo-600' : 'bg-slate-700'
              }`} />

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                
                {/* Card Meta & Badges */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
                        {getCourseIcon(course.id)}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        {course.category}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                      <Award className="w-3 h-3 text-blue-600" />
                      {course.badge || 'Govt. Certified'}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-xl font-bold text-[#1E293B] group-hover:text-blue-600 transition-colors leading-snug">
                    {course.title}
                  </h3>

                  {/* Subtitle / Narrative */}
                  <p className="mt-2 text-xs font-medium text-slate-500 line-clamp-2 leading-relaxed">
                    {course.subtitle}
                  </p>

                  {/* Key Specifications Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-5 py-3.5 px-3.5 bg-[#F8FAFC] rounded-xl border border-slate-200/70 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-mono">Duration</p>
                        <p className="font-semibold text-slate-800">{course.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 border-l border-slate-200/80 pl-3">
                      <Laptop className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-mono">Training Mode</p>
                        <p className="font-semibold text-slate-800">1:1 Lab Practicum</p>
                      </div>
                    </div>
                  </div>

                  {/* Hairline Divider */}
                  <div className="my-5 border-t border-slate-100" />

                  {/* Course Curriculum Highlights */}
                  <div className="space-y-2 mb-5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Core Syllabus Modules:
                    </p>
                    {course.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="leading-tight">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Software & Tools Tags */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-1.5">
                      {course.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-mono border border-slate-200/60"
                        >
                          {tool.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Pricing & Action Section */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Course Fee & Exam</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-[#1E293B]">₹{course.price.toLocaleString()}</span>
                        <span className="text-xs text-slate-400 line-through">₹{course.originalPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenFeeCalculator(course)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md border border-blue-200/60 transition-colors cursor-pointer"
                    >
                      <Calculator className="w-3 h-3" />
                      <span>EMI Calculator</span>
                    </button>
                  </div>

                  {/* Batch Schedule Pill */}
                  <div className="text-[11px] text-slate-500 mb-4 bg-amber-50/70 border border-amber-200/60 px-2.5 py-1.5 rounded-lg flex items-center justify-between">
                    <span className="font-medium text-amber-900">{course.nextBatchDate}</span>
                    <span className="text-[10px] uppercase font-mono text-amber-700">Limited Seats</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenSyllabus(course)}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                      <span>View Syllabus</span>
                    </button>

                    <button
                      onClick={() => onOpenDemoBooking(course)}
                      className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer group/btn"
                    >
                      <span>Enroll / Demo</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 rounded-2xl bg-[#1E293B] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Not sure which course matches your background?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Take our 5-minute Free Career Counseling & Skill Diagnostic with our Senior Academic Mentor.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onOpenDemoBooking()}
              className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-white text-[#1E293B] hover:bg-slate-100 text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Book Free 1-on-1 Consultation
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
