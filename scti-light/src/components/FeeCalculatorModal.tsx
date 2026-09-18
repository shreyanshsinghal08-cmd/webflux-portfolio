import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck
} from 'lucide-react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/coursesData';

interface FeeCalculatorModalProps {
  course: Course | null;
  onClose: () => void;
  onOpenDemoBooking: (course: Course) => void;
}

export const FeeCalculatorModal: React.FC<FeeCalculatorModalProps> = ({
  course: initialCourse,
  onClose,
  onOpenDemoBooking
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState(
    initialCourse ? initialCourse.id : COURSES_DATA[0].id
  );
  const [paymentPlan, setPaymentPlan] = useState<'full' | 'emi2' | 'emi3'>('full');
  const [includeHardcopyKit, setIncludeHardcopyKit] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState('Morning: 08:30 AM - 10:00 AM');

  const currentCourse = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];

  const basePrice = currentCourse.price;
  const upfrontDiscount = paymentPlan === 'full' ? Math.round(basePrice * 0.15) : 0;
  const addonKitPrice = includeHardcopyKit ? 350 : 0;
  const finalPayable = basePrice - upfrontDiscount + addonKitPrice;

  const installmentAmount = paymentPlan === 'emi2' 
    ? Math.round(finalPayable / 2) 
    : paymentPlan === 'emi3' 
      ? Math.round(finalPayable / 3) 
      : finalPayable;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="bg-[#1E293B] text-white p-6 sm:p-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">Transparent Fee & EMI Calculator</h3>
              <p className="text-xs text-slate-300">0% Interest Installments • No Hidden Charges</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Calculator Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[72vh] overflow-y-auto text-xs sm:text-sm">
          
          {/* Select Course */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 text-xs uppercase tracking-wider block">
              Selected Training Track
            </label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-[#F8FAFC] text-slate-800 font-semibold text-xs sm:text-sm focus:outline-none focus:border-blue-600"
            >
              {COURSES_DATA.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} - (₹{c.price.toLocaleString()} | {c.duration})
                </option>
              ))}
            </select>
          </div>

          {/* Payment Plan Options */}
          <div className="space-y-2">
            <label className="font-bold text-slate-800 text-xs uppercase tracking-wider block">
              Payment Schedule Option
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              
              <div
                onClick={() => setPaymentPlan('full')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  paymentPlan === 'full'
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-100'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 text-xs">One-Time Pay</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                      SAVE 15%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Upfront complete fee</p>
                </div>
                <div className="mt-3 text-sm font-extrabold text-blue-700">
                  ₹{(basePrice - upfrontDiscount).toLocaleString()}
                </div>
              </div>

              <div
                onClick={() => setPaymentPlan('emi2')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  paymentPlan === 'emi2'
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-100'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 text-xs">2 Installments</span>
                    <span className="text-[10px] font-mono text-slate-500">0% Int.</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Pay 50% now & 50% in 30 days</p>
                </div>
                <div className="mt-3 text-sm font-extrabold text-slate-800">
                  ₹{Math.round(basePrice / 2).toLocaleString()} <span className="text-[10px] font-normal text-slate-500">/ mo</span>
                </div>
              </div>

              <div
                onClick={() => setPaymentPlan('emi3')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  paymentPlan === 'emi3'
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-100'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 text-xs">3 Installments</span>
                    <span className="text-[10px] font-mono text-slate-500">0% Int.</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Spread across 3 months</p>
                </div>
                <div className="mt-3 text-sm font-extrabold text-slate-800">
                  ₹{Math.round(basePrice / 3).toLocaleString()} <span className="text-[10px] font-normal text-slate-500">/ mo</span>
                </div>
              </div>

            </div>
          </div>

          {/* Add-on Kit Toggle */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeHardcopyKit}
                  onChange={(e) => setIncludeHardcopyKit(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
                <span className="font-semibold text-xs text-slate-800">
                  Printed Lab Workbooks + Keyboard Shortcut Desk Mat Kit (+₹350)
                </span>
              </label>
              <span className="text-xs font-mono font-bold text-slate-600">₹350</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pl-6">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Govt. Exam QR Certificate & Lab Seat Allocation are 100% included in all plans.</span>
            </div>
          </div>

          {/* Batch Selector */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 text-xs uppercase tracking-wider block">
              Preferred Lab Timing Slot
            </label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none"
            >
              <option value="Morning: 08:30 AM - 10:00 AM">Morning: 08:30 AM - 10:00 AM (Mon - Fri)</option>
              <option value="Noon: 11:30 AM - 01:00 PM">Noon: 11:30 AM - 01:00 PM (Mon - Fri)</option>
              <option value="Evening: 05:30 PM - 07:00 PM">Evening: 05:30 PM - 07:00 PM (Mon - Fri)</option>
              <option value="Weekend Intensive: 10:00 AM - 02:00 PM">Weekend Intensive: 10:00 AM - 02:00 PM (Sat - Sun)</option>
            </select>
          </div>

          {/* Calculation Summary Box */}
          <div className="p-5 rounded-2xl bg-[#1E293B] text-white space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300 border-b border-slate-700/80 pb-2">
              <span>Original Standard Tuition</span>
              <span className="font-mono">₹{currentCourse.originalPrice.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Institute Subsidized Tuition</span>
              <span className="font-mono">₹{basePrice.toLocaleString()}</span>
            </div>

            {upfrontDiscount > 0 && (
              <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
                <span>15% Upfront Scholarship Concession</span>
                <span className="font-mono">-₹{upfrontDiscount.toLocaleString()}</span>
              </div>
            )}

            {includeHardcopyKit && (
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Hardcopy Lab Study Materials</span>
                <span className="font-mono">+₹{addonKitPrice}</span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-700 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 uppercase font-mono block">
                  {paymentPlan === 'full' ? 'Total Payable Fee' : 'First Installment Due Today'}
                </span>
                <span className="text-2xl font-black text-white">
                  ₹{installmentAmount.toLocaleString()}
                </span>
                {paymentPlan !== 'full' && (
                  <span className="text-[11px] text-slate-400 block font-normal mt-0.5">
                    (Total Course Package: ₹{finalPayable.toLocaleString()})
                  </span>
                )}
              </div>

              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Zero Admission Charges</span>
              </span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenDemoBooking(currentCourse);
            }}
            className="text-xs text-blue-600 hover:text-blue-800 font-bold underline cursor-pointer"
          >
            Want to test before paying? Book Free Demo
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            
            <button
              onClick={() => {
                onClose();
                onOpenDemoBooking(currentCourse);
              }}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Continue with Counselor</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
