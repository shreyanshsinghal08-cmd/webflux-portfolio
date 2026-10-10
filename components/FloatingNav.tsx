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
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Floating Menu Controller positioned at bottom-36 / bottom-40 right-8 (SAFELY ABOVE WHATSAPP) */}
      <div className="fixed bottom-36 right-8 sm:bottom-40 sm:right-8 z-50 flex flex-col items-end select-none">
        {/* Expanded Vertical Menu (Spring-like smooth tactile motion) */}
        <div
          className={`mb-4 w-72 sm:w-80 rounded-2xl bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.1)] p-3 menu-spring-panel origin-bottom-right ${
            isOpen
              ? 'opacity-100 scale-100 rotate-0 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-90 rotate-[-6deg] translate-y-6 pointer-events-none'
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Header Bar */}
          <div className="px-3 py-2 mb-2 flex items-center justify-between border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-soft-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-white font-semibold">
                WebFlux Navigation
              </span>
            </div>
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              6 Sections
            </span>
          </div>

          {/* Menu Items List with Staggered Entrance */}
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
                  className={`group w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-300 cursor-pointer ${
                    isOpen ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
                  } ${
                    isActive
                      ? 'bg-white/10 text-white border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.05] hover:border-white/10 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-zinc-500 group-hover:text-zinc-300 font-medium transition-colors">
                      {item.num}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-heading font-semibold text-white group-hover:text-white transition-colors">
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
                      className={`transition-all duration-300 group-hover:scale-110 ${
                        isActive ? 'text-white animate-soft-pulse' : 'text-zinc-500 group-hover:text-white'
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

          {/* Consultation Link */}
          <div className="mt-2.5 pt-2 border-t border-white/[0.08]">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:scale-[1.02]"
            >
              <span>Get Free Demo Website</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>

        {/* Circular Floating Trigger Button with Pulsing Glow */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#050505]/90 backdrop-blur-2xl border border-white/20 hover:border-white/50 text-white flex items-center justify-center btn-menu-pulse hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none"
        >
          {/* Subtle outer specular ring */}
          <span className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />

          {/* Inner smooth rotating icon */}
          <div
            className={`transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen ? 'rotate-90 scale-90' : 'rotate-0 scale-100 group-hover:rotate-12'
            }`}
          >
            {isOpen ? (
              <X size={22} className="text-white" />
            ) : (
              <div className="flex flex-col items-center justify-center gap-0.5">
                <Compass size={20} className="text-white" />
                <span className="text-[8px] font-mono tracking-widest uppercase font-bold text-zinc-400">
                  MENU
                </span>
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Floating WhatsApp Widget at bottom-8 right-8 (SAFELY BELOW FLOATING NAV) */}
      <a
        href="https://wa.me/918302589297"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Consultation"
        className="fixed bottom-8 right-8 z-40 group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/20 hover:border-white/60 text-white flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
        <div className="flex flex-col items-center justify-center gap-0.5">
          <MessageCircle size={20} className="text-white group-hover:scale-110 transition-transform" />
          <span className="text-[8px] font-mono tracking-widest uppercase font-bold text-zinc-400">
            CHAT
          </span>
        </div>
      </a>
    </>
  );
}
