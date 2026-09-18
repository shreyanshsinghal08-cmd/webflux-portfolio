import React from 'react';
import { 
  Star, 
  Quote, 
  ShieldCheck, 
  Award, 
  Sparkles,
  Building 
} from 'lucide-react';
import { TESTIMONIALS } from '../data/coursesData';

interface TestimonialsSectionProps {
  onOpenVerifyModal: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenVerifyModal
}) => {
  const hiringPartners = [
    'TCS iON Network',
    'Infosys BPM',
    'Wipro Technologies',
    'Tech Mahindra',
    'State Urban Infra',
    'Creative Craft Studio',
    'Apex Financial Hub'
  ];

  return (
    <section id="placements" className="scroll-mt-24 py-16 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>Alumni Placement Success</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E293B]">
            Empowering Careers in Tech, Design & Administration
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Read authentic reviews from certified graduates who transformed their careers through our 1:1 computer lab training.
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 soft-hover-shadow"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300" />
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/70">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.name}</h4>
                      <span title="Verified SCTI Alumni">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{item.role} • <strong className="text-slate-700 font-medium">{item.company}</strong></p>
                    <p className="text-[10px] text-blue-600 font-mono mt-0.5">{item.course}</p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Hiring Partners Strip */}
        <div className="rounded-2xl bg-[#1E293B] text-white p-6 sm:p-8">
          <div className="text-center mb-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block">
              Where Our Certified Graduates Get Placed
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white mt-1">
              85+ Corporate, IT & Public Sector Recruitment Partners
            </h4>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {hiringPartners.map((partner, idx) => (
              <div
                key={idx}
                className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2"
              >
                <Building className="w-3.5 h-3.5 text-blue-400" />
                <span>{partner}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={onOpenVerifyModal}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>Are you a recruiter? Verify prospective candidate roll numbers online</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
