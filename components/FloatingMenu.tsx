'use client';

import { useState, useEffect } from 'react';
import {
  Menu,
  X,
  User,
  FolderGit2,
  Cpu,
  CreditCard,
  HelpCircle,
  Mail,
  ArrowRight,
  Compass,
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
  { id: 'about', num: '01', label: 'About', icon: User, tag: 'Studio & Architect' },
  { id: 'portfolio', num: '02', label: 'Portfolio', icon: FolderGit2, tag: 'Selected Works' },
  { id: 'services', num: '03', label: 'Services', icon: Cpu, tag: 'Engineering Systems' },
  { id: 'pricing', num: '04', label: 'Pricing', icon: CreditCard, tag: 'Transparent Tiers' },
  { id: 'faq', num: '05', label: 'FAQ', icon: HelpCircle, tag: 'Answers & Process' },
  { id: 'contact', num: '06', label: 'Contact', icon: Mail, tag: 'Live Demo Consultation' },
];

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  // Close on Escape key press
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
      const scrollPosition = window.scrollY + 200;
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
      {/* Dimmed backdrop blur when expanded for focus and click-away closing */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[4px] transition-opacity duration-300 animate-fade-in"
          aria-hidden="true"
        />
      )}

      {/* Floating Menu Container on the Bottom-Right */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end select-none">
        {/* Expanded Vertical Menu (Rotating / Scrolling reveal) */}
        <div
          className={`mb-4 w-72 sm:w-80 rounded-3xl bg-[#030712]/92 backdrop-blur-2xl border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(24,93,241,0.22)] p-3.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-right ${
            isOpen
              ? 'opacity-100 scale-100 rotate-0 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-90 rotate-[-8deg] translate-y-6 pointer-events-none'
          }`}
          style={{
            willChange: 'transform, opacity',
          }}
        >
          {/* Header Bar within Menu */}
          <div className="px-3 py-2 mb-2 flex items-center justify-between border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#185DF1] animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-300 font-semibold">
                WebFlux Navigation
              </span>
            </div>
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              6 Sections
            </span>
          </div>

          {/* Menu Items List */}
          <div className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    transitionDelay: isOpen ? `${index * 35}ms` : '0ms',
                  }}
                  className={`group w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white/[0.08] text-white border border-[#185DF1]/40 shadow-[0_0_20px_rgba(24,93,241,0.18)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.05] hover:border-white/10 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-blue-400/80 font-medium">
                      {item.num}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-heading font-semibold text-zinc-100 group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Icon
                      size={15}
                      className={`transition-colors ${
                        isActive
                          ? 'text-[#185DF1]'
                          : 'text-zinc-500 group-hover:text-blue-400'
                      }`}
                    />
                    <ArrowRight
                      size={13}
                      className="text-zinc-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white transition-all duration-200"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Consultation CTA inside Menu */}
          <div className="mt-3 pt-2.5 border-t border-white/[0.08]">
            <a
              href="https://wa.me/918302589297"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#185DF1] hover:bg-[#2A6EF5] text-white text-xs font-semibold tracking-wide uppercase transition-all duration-200 shadow-[0_0_20px_rgba(24,93,241,0.4)]"
            >
              <span>Get Free Demo Website</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>

        {/* Floating Circular Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#030712]/85 backdrop-blur-2xl border border-white/20 hover:border-[#185DF1]/70 text-white flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(24,93,241,0.35)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.95),0_0_35px_rgba(24,93,241,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none"
        >
          {/* Subtle outer breathing glow ring */}
          <span className="absolute inset-0 rounded-full border border-[#185DF1]/30 opacity-70 animate-pulse pointer-events-none" />

          {/* Inner smooth rotating icon container */}
          <div
            className={`transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen ? 'rotate-90 scale-90' : 'rotate-0 scale-100 group-hover:rotate-12'
            }`}
          >
            {isOpen ? (
              <X size={24} className="text-[#F3F7FE]" />
            ) : (
              <div className="flex flex-col items-center justify-center gap-1">
                <Compass size={22} className="text-[#F3F7FE] group-hover:text-blue-400 transition-colors" />
                <span className="text-[8px] font-mono tracking-widest uppercase font-bold text-blue-400 -mb-1">
                  MENU
                </span>
              </div>
            )}
          </div>
        </button>
      </div>
    </>
  );
}
