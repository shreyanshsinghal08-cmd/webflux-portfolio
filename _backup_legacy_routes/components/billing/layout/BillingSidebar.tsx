'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Server,
  CreditCard,
  Wallet,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  ArrowLeft,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Invoices', href: '/invoices', icon: <FileText className="w-5 h-5" />, badge: '3' },
  { label: 'Subscriptions', href: '/subscriptions', icon: <Server className="w-5 h-5" /> },
  { label: 'Payments', href: '/payments', icon: <CreditCard className="w-5 h-5" /> },
  { label: 'Wallet', href: '/wallet', icon: <Wallet className="w-5 h-5" /> },
  { label: 'Settings', href: '/settings', icon: <Settings className="w-5 h-5" /> },
];

export default function BillingSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        fixed left-0 top-0 bottom-0 z-40 flex flex-col
        bg-stashr-surface/80 backdrop-blur-[16px] border-r border-stashr-border
        transition-all duration-300 ease-out
        ${collapsed ? 'w-[72px]' : 'w-[260px]'}
      `}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-stashr-border">
        <div className="w-9 h-9 rounded-lg bg-gradient-brand flex items-center justify-center flex-shrink-0 shadow-glow-sm">
          <Zap className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-base font-bold text-stashr-text-heading tracking-tight">
              StashrNode
            </h1>
            <p className="text-[11px] text-stashr-text-dim font-medium">Billing Portal</p>
          </div>
        )}
      </div>

      {/* Back to Main */}
      <div className="px-3 pt-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-stashr-text-dim hover:text-stashr-text-body hover:bg-stashr-surface-elevated transition-all duration-200 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {!collapsed && <span>Back to Main Site</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-200 relative
                ${isActive
                  ? 'bg-stashr-primary/10 text-stashr-primary-light border border-stashr-primary/20'
                  : 'text-stashr-text-muted hover:text-stashr-text-body hover:bg-stashr-surface-elevated'
                }
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-stashr-primary rounded-r-full" />
              )}
              <span className={`flex-shrink-0 ${isActive ? 'text-stashr-primary-light' : ''}`}>
                {item.icon}
              </span>
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-stashr-status-overdue/15 text-stashr-status-overdue rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="px-3 py-4 border-t border-stashr-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-stashr-text-dim hover:text-stashr-text-body hover:bg-stashr-surface-elevated transition-all duration-200"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
