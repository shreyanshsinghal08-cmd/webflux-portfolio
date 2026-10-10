import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[rgba(243,247,254,0.08)] bg-[#031130]/70 backdrop-blur-xl mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#185DF1] to-[#2A6EF5] flex items-center justify-center shadow-[0_0_15px_rgba(24,93,241,0.5)]">
                <span className="font-heading font-extrabold text-[#F3F7FE] text-base">W</span>
              </div>
              <span className="text-xl font-heading font-bold text-[#F3F7FE] tracking-tight">
                WebFlux<span className="text-[#185DF1]">.</span>
              </span>
            </Link>
            <p className="text-sm text-[rgba(243,247,254,0.6)] leading-relaxed">
              Premier web application engineering and digital design studio. Crafting 60fps kinetic experiences, educational ecosystems, and commercial landing pages.
            </p>
            <div className="flex items-center gap-2 text-xs text-[rgba(243,247,254,0.5)]">
              <ShieldCheck size={14} className="text-[#185DF1]" />
              <span>Proprietary Client Armor & Zero-Latency UI</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#F3F7FE] font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#services" className="text-[rgba(243,247,254,0.6)] hover:text-[#F3F7FE] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-[rgba(243,247,254,0.6)] hover:text-[#F3F7FE] transition-colors">
                  Portfolio Showcase
                </a>
              </li>
              <li>
                <a href="#why-us" className="text-[rgba(243,247,254,0.6)] hover:text-[#F3F7FE] transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-[rgba(243,247,254,0.6)] hover:text-[#F3F7FE] transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#about" className="text-[rgba(243,247,254,0.6)] hover:text-[#F3F7FE] transition-colors">
                  About Founder
                </a>
              </li>
              <li>
                <a href="#faq" className="text-[rgba(243,247,254,0.6)] hover:text-[#F3F7FE] transition-colors">
                  AEO & FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#F3F7FE] font-semibold mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#services" className="text-[rgba(243,247,254,0.6)] hover:text-[#F3F7FE] transition-colors">
                  School Web Portals
                </a>
              </li>
              <li>
                <a href="#services" className="text-[rgba(243,247,254,0.6)] hover:text-[#F3F7FE] transition-colors">
                  Coaching Institute Systems
                </a>
              </li>
              <li>
                <a href="#services" className="text-[rgba(243,247,254,0.6)] hover:text-[#F3F7FE] transition-colors">
                  Luxury Real Estate Showcases
                </a>
              </li>
              <li>
                <a href="#services" className="text-[rgba(243,247,254,0.6)] hover:text-[#F3F7FE] transition-colors">
                  Creator Sponsorship Media Kits
                </a>
              </li>
              <li>
                <a href="#services" className="text-[rgba(243,247,254,0.6)] hover:text-[#F3F7FE] transition-colors">
                  High-Converting Landing Pages
                </a>
              </li>
              <li>
                <a href="#services" className="text-[rgba(243,247,254,0.6)] hover:text-[#F3F7FE] transition-colors">
                  Enterprise Security Maintenance
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact (Strictly No Social Icons) */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#F3F7FE] font-semibold mb-4">
              Direct Inquiries
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href="https://wa.me/918302589297"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(3,17,48,0.5)] border border-[rgba(243,247,254,0.08)] hover:border-[#185DF1] hover:bg-[rgba(24,93,241,0.1)] transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#185DF1]/20 flex items-center justify-center text-[#185DF1]">
                  <Phone size={15} />
                </div>
                <div>
                  <div className="text-[11px] text-[rgba(243,247,254,0.5)] uppercase font-mono">WhatsApp Call / Chat</div>
                  <div className="text-xs font-semibold text-[#F3F7FE] group-hover:text-[#185DF1] transition-colors">+91 8302589297</div>
                </div>
                <ArrowUpRight size={14} className="ml-auto text-[rgba(243,247,254,0.4)] group-hover:text-[#185DF1] transition-colors" />
              </a>

              <a
                href="mailto:shreyanshsinghal08@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(3,17,48,0.5)] border border-[rgba(243,247,254,0.08)] hover:border-[#185DF1] hover:bg-[rgba(24,93,241,0.1)] transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#185DF1]/20 flex items-center justify-center text-[#185DF1]">
                  <Mail size={15} />
                </div>
                <div>
                  <div className="text-[11px] text-[rgba(243,247,254,0.5)] uppercase font-mono">Primary Email</div>
                  <div className="text-xs font-semibold text-[#F3F7FE] group-hover:text-[#185DF1] transition-colors truncate max-w-[170px]">
                    shreyanshsinghal08@gmail.com
                  </div>
                </div>
                <ArrowUpRight size={14} className="ml-auto text-[rgba(243,247,254,0.4)] group-hover:text-[#185DF1] transition-colors" />
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(3,17,48,0.5)] border border-[rgba(243,247,254,0.08)]">
                <div className="w-8 h-8 rounded-lg bg-[#185DF1]/20 flex items-center justify-center text-[#185DF1]">
                  <MapPin size={15} />
                </div>
                <div>
                  <div className="text-[11px] text-[rgba(243,247,254,0.5)] uppercase font-mono">Engineering Studio</div>
                  <div className="text-xs font-semibold text-[#F3F7FE]">Rajasthan, India • Serving Worldwide</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[rgba(243,247,254,0.08)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[rgba(243,247,254,0.5)]">
          <p>© {new Date().getFullYear()} WebFlux Design Studio. All rights reserved. Founded by Shreyansh Singhal.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#185DF1] animate-pulse"></span>
              60fps GPU Accelerated Kinetic UI
            </span>
            <span className="hover:text-[#F3F7FE] transition-colors cursor-default">
              Prussian Blue Aesthetic System
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
