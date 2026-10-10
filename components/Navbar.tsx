'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#portfolio' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#031130]/80 backdrop-blur-xl border-b border-[rgba(243,247,254,0.08)] py-3 shadow-[0_10px_30px_rgba(3,17,48,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#185DF1] to-[#2A6EF5] flex items-center justify-center shadow-[0_0_20px_rgba(24,93,241,0.5)] transition-transform duration-300 group-hover:scale-105">
              <span className="font-heading font-extrabold text-[#F3F7FE] text-lg tracking-tight">W</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-heading font-bold text-[#F3F7FE] tracking-tight group-hover:text-[#F3F7FE] transition-colors">
                WebFlux<span className="text-[#185DF1]">.</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[rgba(243,247,254,0.5)] -mt-1">
                Design Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 rounded-full px-4 py-1.5 bg-[rgba(3,17,48,0.6)] backdrop-blur-md border border-[rgba(243,247,254,0.08)]">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3.5 py-1.5 text-sm font-medium text-[rgba(243,247,254,0.75)] hover:text-[#F3F7FE] hover:bg-[rgba(24,93,241,0.15)] rounded-full transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="btn-primary text-xs uppercase tracking-wider py-2.5 px-5 group shadow-[0_0_20px_rgba(24,93,241,0.35)]"
            >
              <span>Get Demo Website</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[rgba(3,17,48,0.6)] border border-[rgba(243,247,254,0.1)] text-[#F3F7FE] hover:text-[#185DF1] transition-colors focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 pb-6 pt-2">
          <div className="rounded-2xl bg-[#031130]/95 backdrop-blur-2xl border border-[rgba(243,247,254,0.12)] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.8)] space-y-3">
            <div className="flex flex-col space-y-1">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-medium text-[rgba(243,247,254,0.85)] hover:text-[#F3F7FE] hover:bg-[rgba(24,93,241,0.2)] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="pt-3 border-t border-[rgba(243,247,254,0.08)]">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full btn-primary text-sm py-3 justify-center"
              >
                <span>Get Free Demo Website</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
