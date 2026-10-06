'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, Download, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';
import { printInvoice } from '@/lib/pdf-generator';
import type { Invoice, InvoiceStatus } from '@/types/billing';

interface InvoiceTableProps {
  invoices?: Invoice[];
  onViewInvoice?: (invoice: Invoice) => void;
}

const defaultMockInvoices: Invoice[] = [
  {
    id: '1', invoiceNumber: 'STSH-2024-8891', clientId: 'c1', clientName: 'StashrNode',
    clientEmail: 'billing@stashrnode.co.uk', items: [], subtotal: 44.99, tax: 8.99,
    taxRate: 20, discount: 0, total: 44.99, currency: 'GBP', status: 'paid',
    issuedAt: '2024-11-01', dueAt: '2024-11-01', paidAt: '2024-11-01',
    paymentMethod: 'card', transactionId: 'TXN-8891', notes: '',
  },
  {
    id: '2', invoiceNumber: 'STSH-2024-8876', clientId: 'c1', clientName: 'StashrNode',
    clientEmail: 'billing@stashrnode.co.uk', items: [], subtotal: 24.99, tax: 4.99,
    taxRate: 20, discount: 0, total: 24.99, currency: 'GBP', status: 'pending',
    issuedAt: '2024-11-08', dueAt: '2024-11-15', paidAt: null,
    paymentMethod: null, transactionId: null, notes: '',
  },
  {
    id: '3', invoiceNumber: 'STSH-2024-8854', clientId: 'c1', clientName: 'StashrNode',
    clientEmail: 'billing@stashrnode.co.uk', items: [], subtotal: 14.99, tax: 2.99,
    taxRate: 20, discount: 0, total: 14.99, currency: 'GBP', status: 'overdue',
    issuedAt: '2024-10-01', dueAt: '2024-10-08', paidAt: null,
    paymentMethod: null, transactionId: null, notes: '',
  },
  {
    id: '4', invoiceNumber: 'STSH-2024-8831', clientId: 'c1', clientName: 'StashrNode',
    clientEmail: 'billing@stashrnode.co.uk', items: [], subtotal: 44.99, tax: 8.99,
    taxRate: 20, discount: 0, total: 44.99, currency: 'GBP', status: 'paid',
    issuedAt: '2024-10-01', dueAt: '2024-10-01', paidAt: '2024-10-01',
    paymentMethod: 'card', transactionId: 'TXN-8831', notes: '',
  },
  {
    id: '5', invoiceNumber: 'STSH-2024-8812', clientId: 'c1', clientName: 'StashrNode',
    clientEmail: 'billing@stashrnode.co.uk', items: [], subtotal: 24.99, tax: 4.99,
    taxRate: 20, discount: 5, total: 19.99, currency: 'GBP', status: 'cancelled',
    issuedAt: '2024-09-15', dueAt: '2024-09-22', paidAt: null,
    paymentMethod: null, transactionId: null, notes: '',
  },
];

export default function InvoiceTable({
  invoices = defaultMockInvoices,
}: InvoiceTableProps) {
  const [filter, setFilter] = useState<InvoiceStatus | 'all'>('all');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const filtered = (filter === 'all'
    ? invoices
    : invoices.filter((inv) => inv.status === filter)
  ).sort((a, b) => {
    return sortAsc
      ? a.invoiceNumber.localeCompare(b.invoiceNumber)
      : b.invoiceNumber.localeCompare(a.invoiceNumber);
  });

  const filters: { label: string; value: InvoiceStatus | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Paid', value: 'paid' },
    { label: 'Pending', value: 'pending' },
    { label: 'Overdue', value: 'overdue' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  const handleDownload = (e: React.MouseEvent, invoice: Invoice) => {
    e.stopPropagation();
    printInvoice(invoice);
  };

  return (
    <div className="glass-card overflow-hidden">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-stashr-border overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`
              px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 whitespace-nowrap
              ${filter === f.value
                ? 'bg-stashr-primary text-white shadow-glow-sm'
                : 'bg-stashr-surface-elevated text-stashr-text-muted hover:text-stashr-text-body hover:bg-stashr-surface-hover'
              }
            `}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stashr-border">
              <th className="text-left text-xs font-semibold text-stashr-text-dim uppercase tracking-wider px-6 py-3">
                <button
                  onClick={() => setSortAsc(!sortAsc)}
                  className="flex items-center gap-1 hover:text-stashr-text-body transition-colors"
                >
                  Invoice <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left text-xs font-semibold text-stashr-text-dim uppercase tracking-wider px-6 py-3">Date</th>
              <th className="text-left text-xs font-semibold text-stashr-text-dim uppercase tracking-wider px-6 py-3">Amount</th>
              <th className="text-left text-xs font-semibold text-stashr-text-dim uppercase tracking-wider px-6 py-3">Status</th>
              <th className="text-right text-xs font-semibold text-stashr-text-dim uppercase tracking-wider px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-stashr-border/50 hover:bg-stashr-surface-elevated/30 transition-colors duration-150 group cursor-pointer"
              >
                <td className="px-6 py-4">
                  <Link href={`/invoices/${invoice.id}`} className="block">
                    <p className="font-mono text-sm font-semibold text-stashr-text-heading group-hover:text-stashr-primary-light transition-colors">
                      {invoice.invoiceNumber}
                    </p>
                    <p className="text-xs text-stashr-text-dim mt-0.5 font-mono">
                      {invoice.transactionId || 'No payment'}
                    </p>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-stashr-text-body">{invoice.issuedAt}</p>
                  <p className="text-xs text-stashr-text-dim mt-0.5">Due: {invoice.dueAt}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-mono text-sm font-bold text-stashr-text-heading">
                    £{invoice.total.toFixed(2)}
                  </p>
                  {invoice.discount > 0 && (
                    <p className="text-xs text-stashr-status-paid mt-0.5 font-mono">
                      -£{invoice.discount.toFixed(2)} discount
                    </p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={invoice.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Link
                      href={`/invoices/${invoice.id}`}
                      className="p-2 rounded-lg hover:bg-stashr-surface-hover transition-colors duration-200"
                      aria-label="View invoice"
                    >
                      <Eye className="w-4 h-4 text-stashr-text-muted hover:text-white" />
                    </Link>
                    <button
                      onClick={(e) => handleDownload(e, invoice)}
                      className="p-2 rounded-lg hover:bg-stashr-surface-hover transition-colors duration-200"
                      aria-label="Download PDF"
                    >
                      <Download className="w-4 h-4 text-stashr-text-muted hover:text-white" />
                    </button>
                    <Link
                      href={`/invoices/${invoice.id}`}
                      className="p-2 rounded-lg hover:bg-stashr-surface-hover transition-colors duration-200"
                      aria-label="More options"
                    >
                      <MoreHorizontal className="w-4 h-4 text-stashr-text-muted hover:text-white" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-stashr-border">
        <p className="text-xs text-stashr-text-dim">
          Showing {filtered.length} of {invoices.length} invoices
        </p>
        <div className="flex items-center gap-2">
          <button className="btn-ghost text-xs">Previous</button>
          <button className="px-3 py-1.5 text-xs font-semibold bg-stashr-primary text-white rounded-md">1</button>
          <button className="btn-ghost text-xs">Next</button>
        </div>
      </div>
    </div>
  );
}
