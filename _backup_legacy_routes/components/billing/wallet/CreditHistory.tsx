'use client';

import { ArrowDownLeft, ArrowUpRight, History } from 'lucide-react';
import type { WalletTransaction } from '@/types/billing';
import { formatGBP } from '@/lib/currency';
import { formatDateTime } from '@/lib/date-helpers';
import EmptyState from '../shared/EmptyState';

interface CreditHistoryProps {
  transactions: WalletTransaction[];
}

export default function CreditHistory({ transactions }: CreditHistoryProps) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={<History className="w-6 h-6" />}
        title="No Credit Ledger Entries"
        description="Your wallet transaction history will appear here once deposits or automated invoice deductions occur."
      />
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="px-6 py-4 border-b border-stashr-border flex items-center justify-between">
        <h3 className="section-heading text-base flex items-center gap-2">
          <History className="w-4 h-4 text-stashr-primary-cyan" />
          Wallet Activity Audit Ledger
        </h3>
        <span className="text-xs font-mono text-stashr-text-dim">
          {transactions.length} Recorded Entries
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-stashr-border text-xs uppercase text-stashr-text-dim bg-stashr-surface-input">
              <th className="px-6 py-3">Movement Type</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Reference</th>
              <th className="px-6 py-3">Timestamp</th>
              <th className="px-6 py-3 text-right">Credit Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stashr-border/40 text-xs">
            {transactions.map((tx) => {
              const isCredit = tx.type === 'credit';

              return (
                <tr key={tx.id} className="hover:bg-stashr-surface-elevated/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                          isCredit
                            ? 'bg-stashr-status-paid/10 border-stashr-status-paid/20 text-stashr-status-paid'
                            : 'bg-stashr-status-overdue/10 border-stashr-status-overdue/20 text-stashr-status-overdue'
                        }`}
                      >
                        {isCredit ? (
                          <ArrowDownLeft className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <span className="font-semibold uppercase tracking-wider font-mono text-[11px] text-stashr-text-heading">
                        {tx.type}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-medium text-stashr-text-body">{tx.description}</p>
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-mono text-stashr-text-dim">{tx.reference}</span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-mono text-stashr-text-muted">
                      {formatDateTime(tx.createdAt)}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right font-mono font-bold text-sm">
                    <span
                      className={
                        isCredit ? 'text-stashr-status-paid' : 'text-stashr-status-overdue'
                      }
                    >
                      {isCredit ? '+' : '-'}{formatGBP(tx.amount)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
