import { FormEvent, useState } from 'react';
import { ArrowRight, Calendar, CheckCircle2, Mail, MapPin, Monitor, Phone, ShieldCheck } from 'lucide-react';
import { Course } from '../types';

interface FooterProps {
  onOpenVerifyModal: () => void;
  onOpenDemoBooking: (course?: Course) => void;
}

export function Footer({ onOpenVerifyModal, onOpenDemoBooking }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer id="contact" className="scroll-mt-24 bg-[#1E293B] pb-10 pt-16 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-slate-700/70 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#top" className="flex items-center gap-3" aria-label="Back to top">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Monitor className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-lg font-extrabold leading-none text-white">SMART</span>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Computer Training Institute
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              Practical digital training with dedicated workstations, experienced instructors,
              and verifiable student credentials.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpenVerifyModal}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-4 py-2.5 text-xs font-bold text-white transition hover:border-blue-400 hover:bg-slate-800"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Verify ID
              </button>
              <button
                type="button"
                onClick={() => onOpenDemoBooking()}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-500"
              >
                <Calendar className="h-4 w-4" />
                Free Demo
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Explore</h2>
            <nav className="mt-5 flex flex-col gap-3 text-sm" aria-label="Footer navigation">
              <a href="#courses" className="transition hover:text-white">Courses</a>
              <a href="#about" className="transition hover:text-white">About</a>
              <a href="#infrastructure" className="transition hover:text-white">Training labs</a>
              <a href="#certification" className="transition hover:text-white">Certification</a>
              <a href="#faqs" className="transition hover:text-white">FAQs</a>
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Contact</h2>
            <address className="mt-5 space-y-4 text-sm not-italic text-slate-400">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                Sector 14 Educational Complex, IT Park Avenue, New Delhi 110001
              </p>
              <a href="tel:+919876543210" className="flex items-center gap-2.5 transition hover:text-white">
                <Phone className="h-4 w-4 text-blue-400" />
                +91 98765 43210
              </a>
              <a href="mailto:admissions@smartinstitute.edu" className="flex items-center gap-2.5 break-all transition hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-blue-400" />
                admissions@smartinstitute.edu
              </a>
            </address>

            <form onSubmit={subscribe} className="mt-6">
              <label htmlFor="newsletter" className="text-xs font-bold text-white">Course and batch updates</label>
              <div className="mt-2 flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setSubscribed(false);
                  }}
                  placeholder="Email address"
                  className="min-w-0 flex-1 rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-xs text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                />
                <button type="submit" aria-label="Subscribe" className="rounded-xl bg-blue-600 px-3 text-white transition hover:bg-blue-500">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              {subscribed && (
                <p role="status" className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Subscription confirmed.
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} Smart Computer Training Institute. All rights reserved.</p>
          <p>ISO 9001:2015 quality processes | Verifiable digital credentials</p>
        </div>
      </div>
    </footer>
  );
}