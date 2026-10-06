'use client';

import { ArrowUpRight, ArrowDownLeft, RotateCcw, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import type { Transaction } from '@/types/billing';
import { formatCurrency } from '@/lib/currency';
import { formatDateTime } from '@/lib/date-helpers';

interface TransactionRowProps {
  transaction: Transaction;
  onViewInvoice?: (invoiceId: string) => void;
}

const typeConfig = {
  charge: {
    icon: <ArrowUpRight className="w-4 h-4 text-stashr-status-overdue" />,
    bg: 'bg-stashr-status-overdue/10 border-stashr-status-overdue/20',
    prefix: '-',
    amountClass: 'text-stashr-text-heading',
  },
  debit: {
    icon: <ArrowUpRight className="w-4 h-4 text-stashr-status-overdue" />,
    bg: 'bg-stashr-status-overdue/10 border-stashr-status-overdue/20',
    prefix: '-',
    amountClass: 'text-stashr-text-heading',
  },
  credit: {
    icon: <ArrowDownLeft className="w-4 h-4 text-stashr-status-paid" />,
    bg: 'bg-stashr-status-paid/10 border-stashr-status-paid/20',
    prefix: '+',
    amountClass: 'text-stashr-status-paid',
  },
  refund: {
    icon: <RotateCcw className="w-4 h-4 text-stashr-status-info" />,
    bg: 'bg-stashr-status-info/10 border-stashr-status-info/20',
    prefix: '+',
    amountClass: 'text-stashr-status-info',
  },
};

const statusBadges = {
  completed: (
    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-stashr-status-paid bg-stashr-status-paid/10 border border-stashr-status-paid/20 px-2 py-0.5 rounded-full">
      <CheckCircle2 className="w-3 h-3" /> Settled
    </span>
  ),
  pending: (
    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-stashr-status-pending bg-stashr-status-pending/10 border border-stashr-status-pending/20 px-2 py-0.5 rounded-full">
      <Clock className="w-3 h-3" /> Clearing
    </span>
  ),
  failed: (
    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-stashr-status-overdue bg-stashr-status-overdue/10 border border-stashr-status-overdue/20 px-2 py-0.5 rounded-full">
      <AlertCircle className="w-3 h-3" /> Declined
    </span>
  ),
};

export default function TransactionRow({
  transaction,
  onViewInvoice,
}: TransactionRowProps) {
  const config = typeConfig[transaction.type] || typeConfig.charge;

  return (
    <tr className="border-b border-stashr-border/40 hover:bg-stashr-surface-elevated/30 transition-colors group">
      {/* Transaction ID & Type */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${config.bg}`}>
            {config.icon}
          </div>
          <div>
            <p className="font-mono text-sm font-semibold text-stashr-text-heading group-hover:text-stashr-primary-light transition-colors">
              {transaction.id}
            </p>
            <p className="text-xs text-stashr-text-dim capitalize">
              {transaction.type} via {transaction.paymentMethod}
            </p>
          </div>
        </div>
      </td>

      {/* Description */}
      <td className="px-6 py-4">
        <p className="text-sm font-medium text-stashr-text-body">{transaction.description}</p>
        {transaction.invoiceId && (
          <button
            onClick={() => onViewInvoice && onViewInvoice(transaction.invoiceId!)}
            className="text-xs text-stashr-primary-light hover:underline font-mono mt-0.5 block"
          >
            Invoice Ref: #{transaction.invoiceId}
          </button>
        )}
      </td>

      {/* Timestamp */}
      <td className="px-6 py-4">
        <span className="font-mono text-xs text-stashr-text-muted">
          {formatDateTime(transaction.createdAt)}
        </span>
      </td>

      {/* Amount */}
      <td className="px-6 py-4 text-right">
        <span className={`font-mono text-sm font-bold ${config.amountClass}`}>
          {config.prefix}{formatCurrency(transaction.amount, transaction.currency)}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4 text-right">
        {statusBadges[transaction.status]}
      </td>
    </tr>
  );
}
