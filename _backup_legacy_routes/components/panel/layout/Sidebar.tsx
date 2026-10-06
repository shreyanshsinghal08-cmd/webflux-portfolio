'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Users, Package, ShoppingCart, MessageSquare, CreditCard, Settings, ChevronLeft, ChevronRight, Zap, HelpCircle } from 'lucide-react';

interface NavItem { label: string; href: string; icon: React.ReactNode; badge?: number; section: string; }

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-[18px] h-[18px]" />, section: 'Main' },
  { label: 'Invoices', href: '/invoices', icon: <FileText className="w-[18px] h-[18px]" />, badge: 3, section: 'Billing' },
  { label: 'Clients', href: '/clients', icon: <Users className="w-[18px] h-[18px]" />, section: 'Billing' },
  { label: 'Products', href: '/products', icon: <Package className="w-[18px] h-[18px]" />, section: 'Billing' },
  { label: 'Orders', href: '/orders', icon: <ShoppingCart className="w-[18px] h-[18px]" />, badge: 1, section: 'Billing' },
  { label: 'Tickets', href: '/tickets', icon: <MessageSquare className="w-[18px] h-[18px]" />, badge: 5, section: 'Support' },
  { label: 'Payments', href: '/payments', icon: <CreditCard className="w-[18px] h-[18px]" />, section: 'Finance' },
  { label: 'Settings', href: '/settings', icon: <Settings className="w-[18px] h-[18px]" />, section: 'System' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const sections = [...new Set(navItems.map(n => n.section))];

  return (
    <aside className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-panel-sidebar border-r border-border transition-all duration-200 ease-out ${collapsed ? 'w-[72px]' : 'w-[256px]'}`}>
      <div className="flex items-center gap-3 px-5 h-16 border-b border-border flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-brand-cyan flex items-center justify-center flex-shrink-0 shadow-glow-purple">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <span className="text-sm font-bold text-txt-heading tracking-tight">StashrNode</span>
            <span className="text-[10px] text-txt-muted font-mono ml-1.5">Billing</span>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {sections.map(section => (
          <div key={section}>
            {!collapsed && <p className="text-[10px] font-semibold text-txt-dim uppercase tracking-widest px-3 mb-2">{section}</p>}
            <div className="space-y-0.5">
              {navItems.filter(n => n.section === section).map(item => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link key={item.href} href={item.href} title={collapsed ? item.label : undefined}
                    className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 relative ${isActive ? 'bg-brand/10 text-brand-light' : 'text-txt-secondary hover:text-txt-body hover:bg-panel-elevated'}`}>
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-brand rounded-r-full" />}
                    <span className={`flex-shrink-0 ${isActive ? 'text-brand-light' : 'text-txt-muted group-hover:text-txt-body'}`}>{item.icon}</span>
                    {!collapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && <span className="min-w-[20px] h-5 flex items-center justify-center px-1.5 text-[10px] font-bold font-mono rounded-full bg-brand/15 text-brand-light">{item.badge}</span>}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-border p-3 space-y-1 flex-shrink-0">
        {!collapsed && (
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-txt-muted hover:text-txt-body hover:bg-panel-elevated transition-all">
            <HelpCircle className="w-[18px] h-[18px]" /> Help & Docs
          </Link>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-txt-muted hover:text-txt-body hover:bg-panel-elevated transition-all text-xs" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
}
