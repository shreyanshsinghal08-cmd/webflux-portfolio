import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-black mt-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white font-heading font-black text-sm">
                W
              </div>
              <span className="text-base font-heading font-extrabold text-white tracking-tight">
                WebFlux<span className="text-zinc-500">.</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              Ultra-minimal web engineering studio. Crafting 60fps kinetic websites and digital ecosystems for elite institutions and brands.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
              <ShieldCheck size={13} className="text-white" />
              <span>Proprietary Client Armor &bull; Sub-Second Latency</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-[11px] uppercase font-mono tracking-wider text-zinc-400 font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="#about" className="text-zinc-500 hover:text-white transition-colors">
                  About Studio
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-zinc-500 hover:text-white transition-colors">
                  Selected Works
                </a>
              </li>
              <li>
                <a href="#services" className="text-zinc-500 hover:text-white transition-colors">
                  Engineering Systems
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-zinc-500 hover:text-white transition-colors">
                  Milestone Tiers
                </a>
              </li>
              <li>
                <a href="#faq" className="text-zinc-500 hover:text-white transition-colors">
                  FAQ &bull; Process
                </a>
              </li>
              <li>
                <a href="#contact" className="text-zinc-500 hover:text-white transition-colors">
                  Direct Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-[11px] uppercase font-mono tracking-wider text-zinc-400 font-semibold mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="#services" className="text-zinc-500 hover:text-white transition-colors">
                  School Web Portals
                </a>
              </li>
              <li>
                <a href="#services" className="text-zinc-500 hover:text-white transition-colors">
                  Coaching Institute Funnels
                </a>
              </li>
              <li>
                <a href="#services" className="text-zinc-500 hover:text-white transition-colors">
                  Luxury Architectural Showcases
                </a>
              </li>
              <li>
                <a href="#services" className="text-zinc-500 hover:text-white transition-colors">
                  Creator Media Kits &amp; Portals
                </a>
              </li>
              <li>
                <a href="#services" className="text-zinc-500 hover:text-white transition-colors">
                  High-Converting Landing Pages
                </a>
              </li>
              <li>
                <a href="#services" className="text-zinc-500 hover:text-white transition-colors">
                  Client-Side Security Armor
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Verified Contact (Strictly Zero Social Icons) */}
          <div>
            <h4 className="text-[11px] uppercase font-mono tracking-wider text-zinc-400 font-semibold mb-4">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href="https://wa.me/918302589297"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.06] transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <Phone size={13} />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-mono">WhatsApp Priority</div>
                  <div className="text-xs font-semibold text-white group-hover:text-zinc-200 transition-colors">+91 8302589297</div>
                </div>
                <ArrowUpRight size={13} className="ml-auto text-zinc-600 group-hover:text-white transition-colors" />
              </a>

              <a
                href="mailto:shreyanshsinghal08@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.06] transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <Mail size={13} />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-mono">Primary Email</div>
                  <div className="text-xs font-semibold text-white group-hover:text-zinc-200 transition-colors truncate max-w-[150px]">
                    shreyanshsinghal08@gmail.com
                  </div>
                </div>
                <ArrowUpRight size={13} className="ml-auto text-zinc-600 group-hover:text-white transition-colors" />
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <MapPin size={13} />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-mono">Headquarters</div>
                  <div className="text-xs font-semibold text-white">Rajasthan, India &bull; Serving Worldwide</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Line */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} WebFlux Design Studio. Lead Architect Shreyansh Singhal.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              60fps GPU Kinetic Rendering
            </span>
            <span>Ultra-Minimal Monolith Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
