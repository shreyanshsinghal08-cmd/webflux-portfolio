import { FormEvent, useEffect, useState } from 'react';
import { Award, CheckCircle2, Search, ShieldCheck, X } from 'lucide-react';
import { MOCK_CERTIFICATES } from '../data/coursesData';
import { StudentCertificate } from '../types';

interface CredentialVerificationModalProps {
  onClose: () => void;
}

const SAMPLE_ROLL_NUMBER = MOCK_CERTIFICATES[0].certificateId;

export function CredentialVerificationModal({ onClose }: CredentialVerificationModalProps) {
  const [rollNumber, setRollNumber] = useState(SAMPLE_ROLL_NUMBER);
  const [result, setResult] = useState<StudentCertificate | null>(MOCK_CERTIFICATES[0]);
  const [error, setError] = useState('');
  const [isSample, setIsSample] = useState(true);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  const verifyCredential = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = rollNumber.trim().toUpperCase();
    const match = MOCK_CERTIFICATES.find(
      (certificate) =>
        certificate.certificateId.toUpperCase() === query ||
        certificate.regNumber.toUpperCase() === query,
    );

    if (!match) {
      setResult(null);
      setIsSample(false);
      setError(`No record found for "${rollNumber.trim()}". Try the sample roll number.`);
      return;
    }

    setResult(match);
    setIsSample(false);
    setError('');
  };

  const loadSample = () => {
    setRollNumber(SAMPLE_ROLL_NUMBER);
    setResult(MOCK_CERTIFICATES[0]);
    setError('');
    setIsSample(true);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="verify-modal-title"
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5 sm:px-7">
          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h2 id="verify-modal-title" className="text-xl font-extrabold tracking-tight text-slate-900">
                Verify online credentials
              </h2>
              <p className="mt-1 text-sm text-slate-500">Enter a roll or certificate number to check the student record.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close credential verification"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-6 sm:px-7">
          <form onSubmit={verifyCredential} className="flex flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">Roll number</span>
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                autoFocus
                type="text"
                value={rollNumber}
                onChange={(event) => setRollNumber(event.target.value)}
                placeholder="Enter roll number"
                className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 font-mono text-sm uppercase text-slate-900 outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              Verify ID
            </button>
          </form>

          <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
            <span>Sample: <strong className="font-mono text-slate-700">{SAMPLE_ROLL_NUMBER}</strong></span>
            <button type="button" onClick={loadSample} className="font-bold text-blue-600 transition hover:text-blue-800">
              Load sample record
            </button>
          </div>

          {error && (
            <div role="alert" className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E293B] text-white">
                    <Award className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
                      {isSample ? 'Sample verification preview' : 'Verified student record'}
                    </p>
                    <h3 className="mt-1 text-lg font-extrabold text-slate-900">{result.studentName}</h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Verified
                </span>
              </div>

              <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold text-slate-500">Course</dt>
                  <dd className="mt-1 font-bold text-slate-900">{result.courseName}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-slate-500">Grade</dt>
                  <dd className="mt-1 font-bold text-slate-900">{result.grade}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-slate-500">Certificate ID</dt>
                  <dd className="mt-1 font-mono font-bold text-slate-900">{result.certificateId}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-slate-500">Issue date</dt>
                  <dd className="mt-1 font-bold text-slate-900">{result.issueDate}</dd>
                </div>
              </dl>

              <p className="mt-5 flex items-center gap-2 rounded-xl bg-white p-3 text-xs font-semibold text-emerald-700 ring-1 ring-slate-200">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                This credential is active and matches the institute academic register.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}