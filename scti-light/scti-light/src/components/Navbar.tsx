import { useState } from 'react';
import { Calendar, Menu, Monitor, Phone, ShieldCheck, X } from 'lucide-react';

interface NavbarProps {
  onOpenDemoModal: () => void;
  onOpenVerifyModal: () => void;
}

const navLinks = [
  { label: 'Courses', href: '#courses' },
  { label: 'About', href: '#about' },
  { label: 'Certification', href: '#certification' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onOpenDemoModal, onOpenVerifyModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-[#1E293B] px-4 py-2 text-xs text-slate-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <p className="truncate">Admissions open for 2026 | New batches start every Monday</p>
          <div className="flex shrink-0 items-center gap-4">
            <button
              type="button"
              onClick={onOpenVerifyModal}
              className="hidden items-center gap-1.5 font-semibold transition hover:text-white sm:inline-flex"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Verify ID
            </button>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-1.5 font-semibold text-white transition hover:text-blue-300"
              aria-label="Call Smart Computer Training Institute"
            >
              <Phone className="h-3.5 w-3.5 text-blue-400" />
              <span>+91 98765 43210</span>
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="group flex items-center gap-3" aria-label="Smart Institute home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E293B] text-blue-300 transition group-hover:bg-blue-600 group-hover:text-white">
              <Monitor className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-lg font-extrabold leading-none tracking-tight text-[#1E293B]">SMART</span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                Computer Training Institute
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <Phone className="h-3.5 w-3.5" />
              Call
            </a>
            <button
              type="button"
              onClick={onOpenDemoModal}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Calendar className="h-3.5 w-3.5" />
              Book Free Demo
            </button>
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={onOpenDemoModal}
              className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white"
            >
              Free Demo
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-lg sm:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVerifyModal();
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Verify Student Credential
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}