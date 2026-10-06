'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Bell, ChevronDown, Plus } from 'lucide-react';
import Breadcrumb from '../shared/Breadcrumb';

export default function TopHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 h-16 bg-panel-bg/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-6 lg:px-8">
      <Breadcrumb />
      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-txt-dim" />
          <input
            type="text"
            placeholder="Search invoices, clients..."
            className="w-64 bg-panel-input border border-border rounded-lg pl-9 pr-4 py-2 text-xs text-txt-body placeholder-txt-dim focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-txt-dim bg-panel-elevated px-1.5 py-0.5 rounded border border-border">
            ⌘K
          </kbd>
        </div>
        <Link
          href="/invoices/create"
          className="p-btn-primary text-xs h-9 cursor-pointer active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" /> New Invoice
        </Link>
        <button
          className="relative p-2 rounded-lg hover:bg-panel-elevated text-txt-muted hover:text-txt-body transition-all cursor-pointer active:scale-95"
          aria-label="Notifications"
          onClick={() => alert('No new unread billing alerts.')}
        >
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-status-overdue rounded-full animate-pulse" />
        </button>
        <Link
          href="/settings"
          className="flex items-center gap-2.5 pl-3 ml-1 border-l border-border hover:bg-panel-elevated/40 py-1 px-2 rounded-lg transition-colors cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-brand-cyan flex items-center justify-center text-xs font-bold text-white shadow-glow-purple">
            SN
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-txt-heading leading-tight group-hover:text-brand-light transition-colors">StashrNode</p>
            <p className="text-[10px] text-txt-muted">Administrator</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-txt-dim hidden lg:block" />
        </Link>
      </div>
    </header>
  );
}
