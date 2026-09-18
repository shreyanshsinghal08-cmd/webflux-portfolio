import { Award, CheckCircle2, FileCheck, QrCode, ShieldCheck } from 'lucide-react';
import { MOCK_CERTIFICATES } from '../data/coursesData';

interface GovtCertificationSectionProps {
  onOpenDemoBooking: () => void;
  onOpenVerifyModal: () => void;
}

const recognitionPoints = [
  {
    icon: Award,
    title: 'Quality-assured programs',
    description: 'Structured course delivery and lab evaluation aligned with ISO 9001:2015 processes.',
  },
  {
    icon: FileCheck,
    title: 'Employer-ready records',
    description: 'Clear student records with course, grade, completion date, and practical competencies.',
  },
  {
    icon: QrCode,
    title: 'Online verification',
    description: 'Recruiters can verify each certificate using its unique roll or registration number.',
  },
];

export function GovtCertificationSection({
  onOpenDemoBooking,
  onOpenVerifyModal,
}: GovtCertificationSectionProps) {
  const sample = MOCK_CERTIFICATES[0];

  return (
    <section id="certification" className="scroll-mt-24 border-b border-slate-200 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              <ShieldCheck className="h-4 w-4" />
              Recognized certification
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1E293B] sm:text-4xl">
              Credentials employers can verify with confidence
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              Every graduate receives a unique digital record that confirms the completed course,
              practical hours, grade, and issue date.
            </p>

            <div className="mt-8 space-y-6">
              {recognitionPoints.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onOpenVerifyModal}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                Verify a credential
              </button>
              <button
                type="button"
                onClick={onOpenDemoBooking}
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Book Free Demo
              </button>
            </div>
          </div>

          <div className="relative rounded-3xl bg-[#1E293B] p-4 shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:p-8">
            <div className="rounded-2xl bg-white p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">Digital certificate preview</p>
                  <h3 className="mt-2 text-xl font-extrabold text-slate-900">Smart Computer Training Institute</h3>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Award className="h-5 w-5" />
                </span>
              </div>

              <div className="py-7 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Awarded to</p>
                <p className="mt-2 text-2xl font-extrabold text-slate-900">{sample.studentName}</p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">{sample.courseName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-5 text-sm">
                <div>
                  <p className="text-xs text-slate-500">Certificate ID</p>
                  <p className="mt-1 font-mono font-bold text-slate-900">{sample.certificateId}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Status</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 font-bold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Verified and active
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}