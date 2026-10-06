'use client';

import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, XCircle, FileEdit, RotateCcw } from 'lucide-react';

type Status = 'paid' | 'pending' | 'overdue' | 'draft' | 'cancelled' | 'refunded' | 'active' | 'suspended' | 'open' | 'closed' | 'answered' | 'customer_reply';

const config: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
  paid: { label: 'Paid', cls: 'p-badge-paid', icon: <CheckCircle2 className="w-3 h-3" /> },
  pending: { label: 'Pending', cls: 'p-badge-pending', icon: <Clock className="w-3 h-3" /> },
  overdue: { label: 'Overdue', cls: 'p-badge-overdue', icon: <AlertTriangle className="w-3 h-3" /> },
  draft: { label: 'Draft', cls: 'p-badge-draft', icon: <FileEdit className="w-3 h-3" /> },
  cancelled: { label: 'Cancelled', cls: 'p-badge-cancelled', icon: <XCircle className="w-3 h-3" /> },
  refunded: { label: 'Refunded', cls: 'p-badge bg-status-info/10 text-status-info border-status-info/20', icon: <RotateCcw className="w-3 h-3" /> },
  active: { label: 'Active', cls: 'p-badge-active', icon: <CheckCircle2 className="w-3 h-3" /> },
  suspended: { label: 'Suspended', cls: 'p-badge bg-status-suspended/10 text-status-suspended border-status-suspended/20', icon: <AlertTriangle className="w-3 h-3" /> },
  open: { label: 'Open', cls: 'p-badge-pending', icon: <Clock className="w-3 h-3" /> },
  closed: { label: 'Closed', cls: 'p-badge-draft', icon: <XCircle className="w-3 h-3" /> },
  answered: { label: 'Answered', cls: 'p-badge-paid', icon: <CheckCircle2 className="w-3 h-3" /> },
  customer_reply: { label: 'Reply', cls: 'p-badge bg-status-info/10 text-status-info border-status-info/20', icon: <Clock className="w-3 h-3" /> },
};

export default function StatusBadge({ status }: { status: Status }) {
  const c = config[status] || config.draft;
  return <span className={c.cls}>{c.icon}{c.label}</span>;
}
