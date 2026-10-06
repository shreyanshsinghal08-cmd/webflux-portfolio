'use client';

import { Bell, Search, ChevronDown } from 'lucide-react';

interface BillingHeaderProps {
  pageTitle: string;
  pageSubtitle?: string;
  walletBalance?: number;
}

export default function BillingHeader({
  pageTitle,
  pageSubtitle,
  walletBalance = 24.50,
}: BillingHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-stashr-bg/80 backdrop-blur-[14px] border-b border-stashr-border">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left: Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-stashr-text-heading tracking-tight">
            {pageTitle}
          </h1>
          {pageSubtitle && (
            <p className="text-sm text-stashr-text-muted mt-0.5">{pageSubtitle}</p>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stashr-text-dim" />
            <input
              type="text"
              placeholder="Search invoices..."
              className="glass-input pl-10 pr-4 py-2 w-64 text-sm"
            />
          </div>

          {/* Wallet Balance */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stashr-surface-elevated border border-stashr-border">
            <span className="text-xs text-stashr-text-muted">Balance</span>
            <span className="font-mono text-sm font-bold text-stashr-status-paid">
              £{walletBalance.toFixed(2)}
            </span>
          </div>

          {/* Notifications */}
          <button className="relative p-2.5 rounded-lg bg-stashr-surface-elevated border border-stashr-border hover:bg-stashr-surface-hover transition-all duration-200 active:scale-[0.97]">
            <Bell className="w-4 h-4 text-stashr-text-muted" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-stashr-status-overdue rounded-full text-[9px] font-bold text-white flex items-center justify-center">
              2
            </span>
          </button>

          {/* User Avatar */}
          <button className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-lg hover:bg-stashr-surface-elevated transition-all duration-200">
            <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center text-xs font-bold text-white">
              SN
            </div>
            <span className="text-sm font-medium text-stashr-text-body hidden lg:block">
              StashrNode
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-stashr-text-dim" />
          </button>
        </div>
      </div>
    </header>
  );
}
