import React, { useState } from 'react';
import { 
  Cpu, 
  Monitor, 
  Wifi, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { LAB_FEATURES } from '../data/coursesData';

interface LabInfrastructureSectionProps {
  onOpenDemoBooking: () => void;
}

export const LabInfrastructureSection: React.FC<LabInfrastructureSectionProps> = ({
  onOpenDemoBooking
}) => {
  const [selectedFeatureIdx, setSelectedFeatureIdx] = useState(0);
  const activeFeature = LAB_FEATURES[selectedFeatureIdx];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-blue-600" />;
      case 'Monitor': return <Monitor className="w-5 h-5 text-indigo-600" />;
      case 'Wifi': return <Wifi className="w-5 h-5 text-emerald-600" />;
      default: return <Sparkles className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <section id="infrastructure" className="scroll-mt-24 py-16 md:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>1:1 Dedicated PC Guarantee</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E293B]">
              World-Class Smart Computer Labs
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              No workstation sharing. Every student sits at their dedicated Intel Core i7 rig equipped with dual screens, ergonomic seating, and high-speed fiber internet.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200/90 shadow-xs text-xs font-semibold text-slate-700 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Daily 2-Hour Extra Practice Free For All Students</span>
          </div>
        </div>

        {/* Interactive Lab Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Selector Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {LAB_FEATURES.map((feature, idx) => (
              <div
                key={feature.id}
                onClick={() => setSelectedFeatureIdx(idx)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedFeatureIdx === idx
                    ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-100'
                    : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`p-2.5 rounded-xl ${
                    selectedFeatureIdx === idx ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {getIcon(feature.icon)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{feature.title}</h4>
                      {selectedFeatureIdx === idx && (
                        <span className="text-[10px] font-mono font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded">
                          Active Spec
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-2 text-[11px] font-mono text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60 inline-block">
                      {feature.spec}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Visual Tour (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative flex-1 rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-white min-h-[380px] flex flex-col justify-between">
              
              {/* Photo Background */}
              <img
                src={activeFeature.image}
                alt={activeFeature.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

              {/* Top Tag */}
              <div className="relative z-10 p-5 flex items-center justify-between text-white">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-mono font-semibold border border-white/30">
                  Smart Lab Campus #104
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-semibold bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Live Operational
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="relative z-10 p-6 sm:p-8 text-white space-y-2">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-mono uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{activeFeature.title}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {activeFeature.description}
                </h3>
                <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300 font-mono">
                  <span className="bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-700">
                    {activeFeature.spec}
                  </span>
                  <button
                    onClick={onOpenDemoBooking}
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold transition-all cursor-pointer"
                  >
                    Tour Lab in Person
                  </button>
                </div>
              </div>

            </div>

            {/* Lab Rules / Quality Guarantee */}
            <div className="grid grid-cols-3 gap-3 mt-4 text-center text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <p className="font-bold text-slate-800">Max 12 Students</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Per Batch / Instructor</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <p className="font-bold text-slate-800">No Double Booking</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Assigned PC All Term</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <p className="font-bold text-slate-800">Zero Lag Setup</p>
                <p className="text-[11px] text-slate-500 mt-0.5">NVMe SSD + Gigabit</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
