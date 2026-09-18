import { FormEvent, useEffect, useState } from 'react';
import { Calendar, X } from 'lucide-react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/coursesData';

interface DemoBookingModalProps {
  initialCourse?: Course | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function DemoBookingModal({
  initialCourse,
  onClose,
  onSuccess,
}: DemoBookingModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [courseId, setCourseId] = useState(initialCourse?.id ?? COURSES_DATA[0].id);
  const [error, setError] = useState('');

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const phoneDigits = phone.replace(/\D/g, '');

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (phoneDigits.length < 10) {
      setError('Please enter a valid phone number.');
      return;
    }

    setError('');
    onSuccess();
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
        aria-labelledby="demo-modal-title"
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5 sm:px-7">
          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Calendar className="h-5 w-5" />
            </span>
            <div>
              <h2 id="demo-modal-title" className="text-xl font-extrabold tracking-tight text-slate-900">
                Book a free demo class
              </h2>
              <p className="mt-1 text-sm text-slate-500">Share your details and choose the course you want to explore.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close demo booking"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submitBooking} className="space-y-5 px-6 py-6 sm:px-7">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-800">Name</span>
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your full name"
              autoComplete="name"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-800">Phone number</span>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Enter your 10-digit phone number"
              autoComplete="tel"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-800">Course</span>
            <select
              value={courseId}
              onChange={(event) => setCourseId(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              {COURSES_DATA.map((course) => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>
          </label>

          {error && <p role="alert" className="text-sm font-semibold text-rose-600">{error}</p>}

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}