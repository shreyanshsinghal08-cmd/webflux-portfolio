import React from 'react';
import { 
  X, 
  Clock, 
  Award, 
  CheckCircle2, 
  Download, 
  Calendar, 
  Laptop, 
  Briefcase, 
  ArrowRight
} from 'lucide-react';
import { Course } from '../types';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onOpenDemoBooking: (course: Course) => void;
  onOpenFeeCalculator: (course: Course) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
  onOpenDemoBooking,
  onOpenFeeCalculator
}) => {
  if (!course) return null;

  const handleDownloadSyllabus = () => {
    const modules = course.syllabus
      .map((module) => {
        const topics = module.topics.map((topic) => `  - ${topic}`).join('\n');
        return `Module ${module.moduleNumber}: ${module.title} (${module.duration})\n${topics}\n  Practical project: ${module.handsOnProject}`;
      })
      .join('\n\n');
    const content = `${course.title}\n${course.subtitle}\n\nDuration: ${course.duration}\nPractical training: ${course.totalHours}\nCertification: ${course.certificateType}\n\n${modules}`;
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${course.id}-syllabus.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header Bar */}
        <div className="bg-[#1E293B] text-white p-6 sm:p-8 flex items-start justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-600/40 text-blue-300 border border-blue-400/30">
                {course.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {course.certificateType}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {course.title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {course.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-8">
          
          {/* Key Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/80 text-xs">
            <div>
              <span className="text-slate-400 font-mono text-[10px] uppercase block">Total Duration</span>
              <span className="font-bold text-slate-900 mt-0.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                {course.duration}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-mono text-[10px] uppercase block">Lab Practicum</span>
              <span className="font-bold text-slate-900 mt-0.5 flex items-center gap-1">
                <Laptop className="w-3.5 h-3.5 text-emerald-600" />
                {course.totalHours}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-mono text-[10px] uppercase block">Course Fee</span>
              <span className="font-bold text-slate-900 mt-0.5">
                ₹{course.price.toLocaleString()} <span className="text-slate-400 font-normal line-through text-[11px]">₹{course.originalPrice.toLocaleString()}</span>
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-mono text-[10px] uppercase block">Accreditation</span>
              <span className="font-bold text-blue-600 mt-0.5 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                ISO 9001:2015
              </span>
            </div>
          </div>

          {/* Course Overview Narrative */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Program Description & Pedagogy
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Module-by-Module Detailed Syllabus */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Complete Curriculum Breakdown ({course.syllabus.length} Modules)
              </h4>
              <button
                onClick={handleDownloadSyllabus}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download syllabus</span>
              </button>
            </div>

            <div className="space-y-4">
              {course.syllabus.map((mod) => (
                <div
                  key={mod.moduleNumber}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 text-xs font-mono font-bold flex items-center justify-center border border-blue-200">
                        {mod.moduleNumber}
                      </span>
                      <h5 className="font-bold text-sm text-slate-900">{mod.title}</h5>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {mod.duration}
                    </span>
                  </div>

                  <ul className="space-y-1.5 mb-3 text-xs text-slate-600 pl-8 list-disc">
                    {mod.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="leading-relaxed">{topic}</li>
                    ))}
                  </ul>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl">
                    <span className="font-mono text-[11px] text-slate-500 font-semibold">
                      Hands-on Lab Capstone:
                    </span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {mod.handsOnProject}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Career Outcomes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-200/80">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Software Tools Mastered
              </h4>
              <div className="flex flex-wrap gap-2">
                {course.tools.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-semibold border border-slate-200"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Target Career Roles
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {course.careerOpportunities.map((career, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 text-xs font-medium border border-blue-100"
                  >
                    <Briefcase className="w-3 h-3 text-blue-600" />
                    <span>{career}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Batch Slots Available */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs">
            <h5 className="font-bold text-amber-900 mb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-700" />
              <span>Available Lab Batch Timings</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-amber-900 font-mono text-[11px]">
              {course.scheduleOptions.map((opt, i) => (
                <div key={i} className="bg-white/80 p-2 rounded border border-amber-200/80">
                  • {opt}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => {
              onClose();
              onOpenFeeCalculator(course);
            }}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer"
          >
            Calculate Installments / EMI
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-bold"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenDemoBooking(course);
              }}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Book Free 1-Hour Lab Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
