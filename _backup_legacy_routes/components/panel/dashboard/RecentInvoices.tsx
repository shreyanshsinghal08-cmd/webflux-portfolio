'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';

const invoices = [
  { id: 'INV-0891', routeId: '1', client: 'Alex Thompson', amount: '£44.99', status: 'paid' as const, date: '2 hours ago' },
  { id: 'INV-0890', routeId: '2', client: 'Sarah Chen', amount: '£24.99', status: 'pending' as const, date: '5 hours ago' },
  { id: 'INV-0889', routeId: '3', client: 'Marcus Webb', amount: '£89.99', status: 'overdue' as const, date: '1 day ago' },
  { id: 'INV-0888', routeId: '4', client: 'Priya Patel', amount: '£14.99', status: 'paid' as const, date: '2 days ago' },
  { id: 'INV-0887', routeId: '5', client: "James O'Brien", amount: '£59.99', status: 'draft' as const, date: '3 days ago' },
];

export default function RecentInvoices() {
  const router = useRouter();

  return (
    <div className="p-card">
      <div className="p-card-header">
        <h3 className="text-sm font-semibold text-txt-heading">Recent Invoices</h3>
        <Link
          href="/invoices"
          className="text-xs text-brand-light hover:text-brand font-medium flex items-center gap-1 transition-colors"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="divide-y divide-border">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            onClick={() => {
              router.push(`/invoices/${inv.routeId}`);
            }}
            className="flex items-center justify-between px-6 py-3.5 hover:bg-white/[0.02] transition-colors cursor-pointer group"
          >
            <div>
              <p className="text-sm font-medium text-txt-heading font-mono group-hover:text-brand-light transition-colors">
                {inv.id}
              </p>
              <p className="text-xs text-txt-muted">
                {inv.client} • {inv.date}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm font-semibold text-txt-heading">{inv.amount}</span>
              <StatusBadge status={inv.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
