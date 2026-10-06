'use client';

import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, XCircle, RotateCcw } from 'lucide-react';
import type { InvoiceStatus } from '@/types/billing';

interface StatusBadgeProps {
  status: InvoiceStatus;
}

const statusConfig: Record<InvoiceStatus, { label: string; className: string; icon: React.ReactNode }> = {
  paid: {
    label: 'Paid',
    className: 'status-paid',
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  pending: {
    label: 'Pending',
    className: 'status-pending',
    icon: <Clock className="w-3 h-3" />,
  },
  overdue: {
    label: 'Overdue',
    className: 'status-overdue',
    icon: <AlertTriangle className="w-3 h-3" />,
  },
  cancelled: {
    label: 'Cancelled',
    className: 'status-cancelled',
    icon: <XCircle className="w-3 h-3" />,
  },
  refunded: {
    label: 'Refunded',
    className: 'status-badge bg-stashr-status-info/10 text-stashr-status-info border-stashr-status-info/20',
    icon: <RotateCcw className="w-3 h-3" />,
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={config.className}>
      {config.icon}
      {config.label}
    </span>
  );
}
