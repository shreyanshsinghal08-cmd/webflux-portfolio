'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer, Download, CreditCard, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';

interface InvoiceDetail {
  id: string;
  number: string;
  status: 'paid' | 'pending' | 'overdue' | 'draft' | 'cancelled';
  issueDate: string;
  dueDate: string;
  company: {
    name: string;
    address: string;
    vat: string;
    email: string;
  };
  client: {
    name: string;
    address: string;
    email: string;
  };
  items: {
    desc: string;
    qty: number;
    price: number;
  }[];
  subtotal: number;
  taxRate: number;
  tax: number;
  total: number;
}

const mockInvoices: Record<string, InvoiceDetail> = {
  '1': {
    id: '1',
    number: 'INV-0891',
    status: 'paid',
    issueDate: '01 Nov 2024',
    dueDate: '08 Nov 2024',
    company: {
      name: 'StashrNode Cloud Ltd',
      address: '130 Old Street, Suite 402\nLondon, EC1V 9BD\nUnited Kingdom',
      vat: 'GB 948 1029 44',
      email: 'billing@stashrnode.com',
    },
    client: {
      name: 'Alex Thompson',
      address: 'Hyperion Gaming Studios Ltd\n72 Great Eastern Street\nLondon, EC2A 3JL',
      email: 'alex.thompson@hyperion-games.io',
    },
    items: [
      { desc: 'Ryzen 9 7950X Dedicated Thread Node (LHR-01)', qty: 1, price: 37.49 },
      { desc: 'Anti-DDoS Shield Tier-1 (Tbps Level Edge Mitigation)', qty: 1, price: 7.50 },
    ],
    subtotal: 44.99,
    taxRate: 20,
    tax: 9.00,
    total: 53.99,
  },
  '2': {
    id: '2',
    number: 'INV-0890',
    status: 'pending',
    issueDate: '28 Oct 2024',
    dueDate: '04 Nov 2024',
    company: {
      name: 'StashrNode Cloud Ltd',
      address: '130 Old Street, Suite 402\nLondon, EC1V 9BD\nUnited Kingdom',
      vat: 'GB 948 1029 44',
      email: 'billing@stashrnode.com',
    },
    client: {
      name: 'Sarah Chen',
      address: 'Chen Technologies BV\nKeizersgracht 421\n1016 EK Amsterdam, Netherlands',
      email: 'sarah@chentechnologies.com',
    },
    items: [
      { desc: 'EPYC 9454 Cloud VPS - 8 vCPU / 32GB RAM (AMS-01)', qty: 1, price: 24.99 },
    ],
    subtotal: 24.99,
    taxRate: 20,
    tax: 5.00,
    total: 29.99,
  },
  '3': {
    id: '3',
    number: 'INV-0889',
    status: 'overdue',
    issueDate: '15 Oct 2024',
    dueDate: '22 Oct 2024',
    company: {
      name: 'StashrNode Cloud Ltd',
      address: '130 Old Street, Suite 402\nLondon, EC1V 9BD\nUnited Kingdom',
      vat: 'GB 948 1029 44',
      email: 'billing@stashrnode.com',
    },
    client: {
      name: 'Marcus Webb',
      address: 'Nexus Cube Media Ltd\nMainzer Landstraße 180\n60327 Frankfurt am Main, Germany',
      email: 'marcus.webb@nexuscube.org',
    },
    items: [
      { desc: 'Dedicated Server FRA-Backup-01 (AMD EPYC 7443P 256GB RAM)', qty: 1, price: 89.99 },
    ],
    subtotal: 89.99,
    taxRate: 20,
    tax: 18.00,
    total: 107.99,
  },
};

export default function InvoiceDetailView({ id }: { id: string }) {
  const [isPaid, setIsPaid] = useState(false);

  // Look up by ID or normalize invoice string like INV-0891
  const normalizedId = id.replace('INV-0', '').replace('INV-', '');
  const invoice = mockInvoices[id] || mockInvoices[normalizedId] || {
    id,
    number: id.startsWith('INV-') ? id : `INV-089${id}`,
    status: 'paid' as const,
    issueDate: '01 Nov 2024',
    dueDate: '08 Nov 2024',
    company: {
      name: 'StashrNode Cloud Ltd',
      address: '130 Old Street, Suite 402\nLondon, EC1V 9BD\nUnited Kingdom',
      vat: 'GB 948 1029 44',
      email: 'billing@stashrnode.com',
    },
    client: {
      name: 'Alex Thompson',
      address: 'Hyperion Gaming Studios Ltd\n72 Great Eastern Street\nLondon, EC2A 3JL',
      email: 'alex.thompson@hyperion-games.io',
    },
    items: [
      { desc: 'High-Performance Dedicated Cloud Compute Node', qty: 1, price: 44.99 },
    ],
    subtotal: 44.99,
    taxRate: 20,
    tax: 9.00,
    total: 53.99,
  };

  const currentStatus = isPaid ? 'paid' : invoice.status;

  const handlePrint = () => {
    window.print();
  };

  const handlePay = () => {
    setIsPaid(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/invoices"
          className="p-btn-ghost text-xs self-start"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Invoices
        </Link>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handlePrint}
            className="p-btn-secondary text-xs"
          >
            <Printer className="w-3.5 h-3.5" /> Print / PDF
          </button>
          {currentStatus !== 'paid' && (
            <button
              onClick={handlePay}
              className="p-btn-primary text-xs shadow-glow-purple"
            >
              <CreditCard className="w-3.5 h-3.5" /> Pay Now (£{invoice.total.toFixed(2)})
            </button>
          )}
          {currentStatus === 'paid' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-status-paid bg-status-paid/10 border border-status-paid/20">
              <CheckCircle2 className="w-3.5 h-3.5" /> Settled in Full
            </span>
          )}
        </div>
      </div>

      {/* Invoice Printable Sheet */}
      <div className="p-card overflow-hidden shadow-card border border-border">
        <div className="p-8 sm:p-12">
          {/* Header & Meta */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-8 border-b border-border">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-brand-cyan flex items-center justify-center shadow-glow-purple">
                  <span className="font-bold text-white text-xs">SN</span>
                </div>
                <h2 className="text-lg font-bold text-txt-heading">{invoice.company.name}</h2>
              </div>
              <p className="text-sm text-txt-muted whitespace-pre-line mt-1">{invoice.company.address}</p>
              <p className="text-sm text-txt-muted mt-1">VAT: {invoice.company.vat}</p>
              <p className="text-sm text-txt-muted mt-1">{invoice.company.email}</p>
            </div>
            <div className="text-left sm:text-right">
              <h1 className="text-3xl font-bold text-txt-heading font-mono">{invoice.number}</h1>
              <div className="mt-3 inline-block">
                <StatusBadge status={currentStatus} />
              </div>
              <div className="mt-4 space-y-1 text-sm">
                <p>
                  <span className="text-txt-muted">Issue Date:</span>{' '}
                  <span className="font-mono text-txt-body">{invoice.issueDate}</span>
                </p>
                <p>
                  <span className="text-txt-muted">Due Date:</span>{' '}
                  <span className="font-mono text-txt-body">{invoice.dueDate}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Client Info */}
          <div className="py-8 border-b border-border">
            <h3 className="text-xs font-semibold text-txt-dim uppercase tracking-wider mb-3">Billed To</h3>
            <h2 className="text-base font-bold text-txt-heading">{invoice.client.name}</h2>
            <p className="text-sm text-txt-muted whitespace-pre-line mt-1">{invoice.client.address}</p>
            <p className="text-sm text-txt-muted mt-1">{invoice.client.email}</p>
          </div>

          {/* Items Table */}
          <div className="py-8">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-txt-muted">
                  <th className="py-2 font-medium">Description</th>
                  <th className="py-2 font-medium text-center">Qty</th>
                  <th className="py-2 font-medium text-right">Unit Price</th>
                  <th className="py-2 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {invoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-4 text-txt-body">{item.desc}</td>
                    <td className="py-4 text-txt-body text-center">{item.qty}</td>
                    <td className="py-4 text-txt-body font-mono text-right">£{item.price.toFixed(2)}</td>
                    <td className="py-4 text-txt-heading font-mono font-medium text-right">
                      £{(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end pt-4">
            <div className="w-full max-w-sm space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-txt-muted">Subtotal</span>
                <span className="font-mono text-txt-body">£{invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-txt-muted">VAT ({invoice.taxRate}%)</span>
                <span className="font-mono text-txt-body">£{invoice.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-border pt-3 mt-3">
                <span className="font-bold text-txt-heading">Total Due</span>
                <span className="font-mono text-2xl font-bold text-brand-light">£{invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-16 pt-8 border-t border-border text-center">
            <p className="text-xs text-txt-dim">
              Thank you for choosing StashrNode Cloud Infrastructure. <br />
              Please process payment within 7 days to avoid service interruption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
