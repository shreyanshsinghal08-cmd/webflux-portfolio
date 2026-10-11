'use client';

import { useState, useEffect } from 'react';
import {
  X,
  User,
  FolderGit2,
  Cpu,
  CreditCard,
  HelpCircle,
  Mail,
  ArrowRight,
  Compass,
  MessageCircle,
  LucideIcon,
} from 'lucide-react';

interface MenuItem {
  id: string;
  num: string;
  label: string;
  icon: LucideIcon;
  tag: string;
}

const menuItems: MenuItem[] = [
  { id: 'about', num: '01', label: 'About', icon: User, tag: 'Studio & Vision' },
  { id: 'portfolio', num: '02', label: 'Portfolio', icon: FolderGit2, tag: 'Selected Works' },
  { id: 'services', num: '03', label: 'Services', icon: Cpu, tag: 'High-Impact Systems' },
  { id: 'pricing', num: '04', label: 'Pricing', icon: CreditCard, tag: 'Milestone Plans' },
  { id: 'faq', num: '05', label: 'FAQ', icon: HelpCircle, tag: 'Answers & Process' },
  { id: 'contact', num: '06', label: 'Contact', icon: Mail, tag: 'Direct Consultation' },
];

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const item of menuItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Dimmed backdrop overlay when expanded */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[990] bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* 1. FLOATING MENU POPOVER WRAPPER: fixed bottom-36 right-8 z-[999] */}
      <div
        className={`fixed bottom-36 right-8 z-[999] flex flex-col items-end gap-2.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
          isOpen
            ? 'opacity-100 pointer-events-auto translate-y-0 scale-100 visible'
            : 'opacity-0 pointer-events-none translate-y-6 scale-95 invisible'
        }`}
        style={{ willChange: 'transform, opacity' }}
      >
        {/* COMPACT FROSTED GLASS CARD (Zero horizontal bleeding, strictly vertical stack) */}
        <div
          className="w-64 sm:w-72 rounded-[20px] p-4 sm:p-5 flex flex-col gap-2 origin-bottom-right"
          style={{
            background: 'rgba(10, 15, 30, 0.75)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-2.5 mb-1 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#F8FAFC] font-semibold">
                WebFlux Navigation
              </span>
            </div>
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              6 Sections
            </span>
          </div>

          {/* Clean Vertical Links List */}
          <div className="flex flex-col gap-1 w-full">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`group w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer text-left border ${
                    isActive
                      ? 'bg-cyan-500/15 border-cyan-400/40 text-[#F8FAFC] shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                      : 'bg-transparent border-transparent text-[#F8FAFC] hover:bg-white/[0.06] hover:border-cyan-400/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-zinc-400 group-hover:text-cyan-400 font-medium transition-colors">
                      {item.num}
                    </span>
                    <span className="font-sans font-semibold text-sm tracking-wide text-[#F8FAFC] group-hover:text-cyan-200 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all">
                      {item.label}
                    </span>
                  </div>
                  <ArrowRight
                    size={13}
                    className="text-zinc-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-cyan-400 transition-all duration-200"
                  />
                </button>
              );
            })}
          </div>

          {/* Bottom Free Demo CTA */}
          <div className="mt-1.5 pt-2 border-t border-white/[0.08] w-full">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white hover:bg-cyan-100 text-black text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
              <span>Get Free Demo Website</span>
              <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* 2. CIRCULAR COMPASS TOGGLE BUTTON: fixed bottom-16 right-8 z-[1000] */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        className="fixed bottom-16 right-8 z-[1000] group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#050505]/95 backdrop-blur-2xl border border-white/20 hover:border-cyan-400/60 text-white flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none select-none"
      >
        {/* Breathing cyan pulse ring */}
        <span className="absolute -inset-1 rounded-full border border-cyan-400/40 animate-pulse pointer-events-none" />
        <span className="absolute -inset-2.5 rounded-full border border-cyan-500/20 blur-[2px] animate-pulse pointer-events-none" />

        {/* Subtle outer specular ring */}
        <span className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />

        {/* Inner smooth rotating icon */}
        <div
          className={`transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? 'rotate-90 scale-90' : 'rotate-0 scale-100'
          }`}
        >
          {isOpen ? (
            <X size={20} className="text-white" />
          ) : (
            <div className="flex flex-col items-center justify-center gap-0.5">
              <Compass
                size={19}
                className="text-white transition-transform duration-500 ease-out group-hover:rotate-45"
              />
              <span className="text-[7px] sm:text-[8px] font-mono tracking-widest uppercase font-bold text-zinc-300">
                MENU
              </span>
            </div>
          )}
        </div>
      </button>

      {/* 3. FLOATING WHATSAPP BUTTON: fixed bottom-4 right-8 z-[998] */}
      <a
        href="https://wa.me/918302589297"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Consultation"
        className="fixed bottom-4 right-8 z-[998] group w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/20 hover:border-white/60 text-white flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95 transition-all duration-300 select-none"
      >
        <span className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
        <div className="flex flex-col items-center justify-center gap-0.5">
          <MessageCircle size={18} className="text-white group-hover:scale-110 transition-transform" />
          <span className="text-[7px] sm:text-[8px] font-mono tracking-widest uppercase font-bold text-zinc-400">
            CHAT
          </span>
        </div>
      </a>
    </>
  );
}
