'use client';

import Link from 'next/link';
import { ArrowUpRight, ArrowDownLeft, RotateCcw, ArrowRight } from 'lucide-react';

interface Transaction {
  id: string;
  description: string;
  amount: string;
  type: 'charge' | 'credit' | 'refund';
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const transactions: Transaction[] = [
  { id: 'TXN-8891', description: 'Minecraft-Prod-01 — Monthly', amount: '-£44.99', type: 'charge', date: 'Nov 1, 2024', status: 'completed' },
  { id: 'TXN-8876', description: 'Wallet Top-Up', amount: '+£50.00', type: 'credit', date: 'Oct 28, 2024', status: 'completed' },
  { id: 'TXN-8854', description: 'VPS-London-02 — Monthly', amount: '-£24.99', type: 'charge', date: 'Oct 8, 2024', status: 'completed' },
  { id: 'TXN-8831', description: 'Refund — Duplicate Charge', amount: '+£14.99', type: 'refund', date: 'Oct 3, 2024', status: 'completed' },
  { id: 'TXN-8812', description: 'Discord-Bot-Host — Monthly', amount: '-£14.99', type: 'charge', date: 'Oct 1, 2024', status: 'completed' },
];

const typeIcons = {
  charge: <ArrowUpRight className="w-4 h-4 text-stashr-status-overdue" />,
  credit: <ArrowDownLeft className="w-4 h-4 text-stashr-status-paid" />,
  refund: <RotateCcw className="w-4 h-4 text-stashr-status-info" />,
};

const typeBg = {
  charge: 'bg-stashr-status-overdue/10 border-stashr-status-overdue/20',
  credit: 'bg-stashr-status-paid/10 border-stashr-status-paid/20',
  refund: 'bg-stashr-status-info/10 border-stashr-status-info/20',
};

export default function RecentTransactions() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="section-heading flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-stashr-primary-light" />
          Recent Transactions
        </h3>
        <Link
          href="/payments"
          className="text-xs text-stashr-primary-light hover:text-stashr-primary font-medium flex items-center gap-1 transition-colors duration-200"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-3.5 rounded-lg bg-stashr-surface-elevated/40 border border-stashr-border hover:bg-stashr-surface-elevated transition-all duration-200 group"
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${
                  typeBg[tx.type]
                }`}
              >
                {typeIcons[tx.type]}
              </div>
              <div>
                <p className="text-sm font-semibold text-stashr-text-heading">{tx.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-xs text-stashr-text-dim">{tx.id}</span>
                  <span className="text-[10px] text-stashr-text-dim">•</span>
                  <span className="text-xs text-stashr-text-muted">{tx.date}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p
                className={`font-mono text-sm font-bold ${
                  tx.type === 'credit' || tx.type === 'refund'
                    ? 'text-stashr-status-paid'
                    : 'text-stashr-text-heading'
                }`}
              >
                {tx.amount}
              </p>
              <span className="inline-block mt-0.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-stashr-surface-input border border-stashr-border text-stashr-text-dim">
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
