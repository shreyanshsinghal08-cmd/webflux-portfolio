'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Receipt,
  CreditCard,
  Server,
  Wallet,
  ShieldCheck,
  Zap,
  ExternalLink,
  Activity,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/invoices', label: 'Invoices', icon: Receipt, badge: '2' },
  { href: '/checkout', label: 'Live Checkout', icon: CreditCard, badge: 'Live' },
  { href: '/services', label: 'Cloud Nodes', icon: Server },
  { href: '/wallet', label: 'Wallet & Credits', icon: Wallet },
];

export default function CyberSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#010D2A] border-r border-[#073E91] flex flex-col z-20 flex-shrink-0">
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-[#073E91]">
        <div className="w-9 h-9 rounded-lg bg-[#00B8FF] flex items-center justify-center text-[#171229] shadow-neon-glow flex-shrink-0">
          <Zap size={20} className="fill-current" />
        </div>
        <div>
          <h1 className="text-xl font-heading text-[#00B8FF] tracking-[-0.05em] leading-none">
            Stashr<span className="text-[#E0F9FF]">Node</span>
          </h1>
          <p className="text-[10px] text-[#8AB4F8] font-mono mt-0.5 tracking-wider uppercase">
            Billing Core
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <p className="text-[10px] font-mono uppercase tracking-wider text-[#8AB4F8]/60 px-3 py-1 font-semibold">
          Financial Management
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#171229] border border-[#00B8FF] text-[#00B8FF] shadow-neon'
                  : 'text-[#8AB4F8] hover:text-[#E0F9FF] hover:bg-[#073E91]/20 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={isActive ? 'text-[#00B8FF]' : 'text-[#8AB4F8]'} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    item.badge === 'Live'
                      ? 'bg-[#1BFF68]/20 text-[#1BFF68] border border-[#1BFF68]/40 animate-pulse'
                      : 'bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/40'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-6">
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#8AB4F8]/60 px-3 py-1 font-semibold">
            Security & Gateway
          </p>
          <div className="cyber-card p-3.5 mt-2 bg-[#171229]/60 border-[#073E91]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1BFF68]">
              <span className="w-2 h-2 rounded-full bg-[#1BFF68] animate-pulse" />
              PCI-DSS Tier 1 Encrypted
            </div>
            <p className="text-[11px] text-[#8AB4F8] mt-1.5 leading-relaxed">
              AES-256 live settlement pipeline with automated instant invoice reconciliation.
            </p>
          </div>
        </div>
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-[#073E91] bg-[#010D2A]/80">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1BFF68]" />
            <span className="text-[#8AB4F8] text-[11px]">System: Nominal</span>
          </div>
          <span className="font-mono text-[10px] text-[#00B8FF]">14ms // v2.4</span>
        </div>
      </div>
    </aside>
  );
}
