'use client';

import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, ShieldCheck, Zap } from 'lucide-react';
import type { Wallet } from '@/types/billing';
import { formatGBP } from '@/lib/currency';

interface WalletBalanceProps {
  wallet: Wallet;
  onQuickTopUp?: (amount: number) => void;
}

export default function WalletBalance({
  wallet,
  onQuickTopUp,
}: WalletBalanceProps) {
  return (
    <div className="glass-card p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-stashr-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stashr-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stashr-primary-cyan uppercase tracking-wider mb-2">
            <WalletIcon className="w-4 h-4" /> Available Cloud Credit Reserve
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-5xl font-extrabold text-white tracking-tight">
              {formatGBP(wallet.balance)}
            </span>
            <span className="font-mono text-sm text-stashr-text-muted">GBP</span>
          </div>
          <p className="text-xs text-stashr-text-dim mt-2 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-stashr-status-paid" />
            Auto-deducted for upcoming bare-metal & VPS renewals before registered card
          </p>
        </div>

        {/* Quick Amount Pills */}
        <div className="flex flex-col sm:items-end gap-2">
          <span className="text-xs text-stashr-text-dim">Quick Top-Up Presets:</span>
          <div className="flex items-center gap-2">
            {[25, 50, 100].map((amt) => (
              <button
                key={amt}
                onClick={() => onQuickTopUp && onQuickTopUp(amt)}
                className="px-4 py-2 rounded-lg bg-stashr-surface-elevated border border-stashr-border hover:border-stashr-primary/40 hover:bg-stashr-surface-hover font-mono text-xs font-bold text-stashr-text-body transition-all duration-200 active:scale-[0.97]"
              >
                +£{amt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lifetime Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-xs">
        <div className="p-4 rounded-xl bg-stashr-surface-elevated/40 border border-stashr-border">
          <span className="text-stashr-text-dim uppercase font-semibold">Pending Clearances</span>
          <p className="font-mono text-lg font-bold text-stashr-text-heading mt-1">
            {formatGBP(wallet.pendingCredits)}
          </p>
          <p className="text-[11px] text-stashr-text-muted mt-0.5">Wire transfers in settlement</p>
        </div>

        <div className="p-4 rounded-xl bg-stashr-surface-elevated/40 border border-stashr-border">
          <span className="text-stashr-text-dim uppercase font-semibold">Total Credits Added</span>
          <p className="font-mono text-lg font-bold text-stashr-status-paid mt-1">
            +{formatGBP(wallet.totalCreditsAdded)}
          </p>
          <p className="text-[11px] text-stashr-text-muted mt-0.5">Lifetime deposit volume</p>
        </div>

        <div className="p-4 rounded-xl bg-stashr-surface-elevated/40 border border-stashr-border">
          <span className="text-stashr-text-dim uppercase font-semibold">Total Credits Consumed</span>
          <p className="font-mono text-lg font-bold text-stashr-status-overdue mt-1">
            -{formatGBP(wallet.totalCreditsUsed)}
          </p>
          <p className="text-[11px] text-stashr-text-muted mt-0.5">Applied to infrastructure invoices</p>
        </div>
      </div>
    </div>
  );
}
