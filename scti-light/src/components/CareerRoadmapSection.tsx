import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Code, 
  Award, 
  Briefcase 
} from 'lucide-react';

export const CareerRoadmapSection: React.FC = () => {
  const steps = [
    {
      stepNumber: '01',
      title: 'Foundational Diagnostics & 1:1 Lab Setup',
      subtitle: 'Days 1 - 15',
      icon: Layers,
      description: 'Individual PC assignment, IDE/software configuration, touch typing baseline benchmark, and conceptual OS architecture.',
      badge: 'Zero Experience Needed'
    },
    {
      stepNumber: '02',
      title: 'Intensive Practical Drills & Code/Design Labs',
      subtitle: 'Months 1 - 2',
      icon: Code,
      description: 'Hands-on project sprints daily. Writing modular Python scripts, designing brand systems in Illustrator/Figma, or modeling Excel payroll sheets.',
      badge: '70% Pure Practicum'
    },
    {
      stepNumber: '03',
      title: 'Govt. Accredited Evaluation & Portfolio Defense',
      subtitle: 'Month 3',
      icon: Award,
      description: 'Practical project jury presentation, speed typing test under exam conditions, and issuance of ISO 9001:2015 QR-authenticated diploma.',
      badge: 'ISO 9001:2015 Validated'
    },
    {
      stepNumber: '04',
      title: 'Career Placement Cell & Technical Interviews',
      subtitle: 'Post Graduation',
      icon: Briefcase,
      description: 'Resume optimization, LinkedIn profile review, mock technical interviews, and direct forwarding to 85+ partner recruitment agencies.',
      badge: '98.4% Placement Success'
    }
  ];

  return (
    <section id="about" className="scroll-mt-24 py-16 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Structured Career Progression</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E293B]">
            From Day 1 Beginner to Job-Ready Professional
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Our progressive Scandinavian curriculum ensures clear milestones, continuous feedback, and tangible project deliverables at every stage.
          </p>
        </div>

        {/* 4 Steps Scandinavian Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col justify-between p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 soft-hover-shadow group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-slate-300 group-hover:text-blue-600 transition-colors">
                      {step.stepNumber}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60">
                      {step.subtitle}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#1E293B] group-hover:text-blue-600 group-hover:border-blue-200 flex items-center justify-center mb-4 transition-all shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/70 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{step.badge}</span>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
