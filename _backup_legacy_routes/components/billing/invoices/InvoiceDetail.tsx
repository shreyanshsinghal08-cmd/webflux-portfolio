'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  CreditCard,
  Printer,
  Calendar,
  Building,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Server,
} from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';
import InvoicePDFPreview from './InvoicePDFPreview';
import PaymentCheckout from './PaymentCheckout';
import { formatCurrency } from '@/lib/currency';
import { formatReadableDate } from '@/lib/date-helpers';
import { printInvoice } from '@/lib/pdf-generator';
import type { Invoice } from '@/types/billing';

interface InvoiceDetailProps {
  invoice: Invoice;
  onInvoicePaid?: (updatedInvoice: Invoice) => void;
}

export default function InvoiceDetail({
  invoice: initialInvoice,
  onInvoicePaid,
}: InvoiceDetailProps) {
  const [invoice, setInvoice] = useState<Invoice>(initialInvoice);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState<string | null>(null);

  const handlePaymentSuccess = (transactionId: string) => {
    const updated: Invoice = {
      ...invoice,
      status: 'paid',
      paidAt: new Date().toISOString().split('T')[0],
      paymentMethod: 'card',
      transactionId,
    };
    setInvoice(updated);
    setShowCheckout(false);
    setPaymentSuccessMsg(`Invoice ${invoice.invoiceNumber} was successfully paid via ${transactionId}.`);
    if (onInvoicePaid) {
      onInvoicePaid(updated);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/invoices"
          className="inline-flex items-center gap-2 text-sm text-stashr-text-dim hover:text-stashr-text-body transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Invoices</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPrintModal(true)}
            className="btn-secondary text-xs flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Print Preview
          </button>
          <button
            onClick={() => printInvoice(invoice)}
            className="btn-secondary text-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> PDF
          </button>
          {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
            <button
              onClick={() => setShowCheckout(!showCheckout)}
              className="btn-primary text-xs flex items-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" /> Pay Now ({formatCurrency(invoice.total, invoice.currency)})
            </button>
          )}
        </div>
      </div>

      {paymentSuccessMsg && (
        <div className="p-4 rounded-xl bg-stashr-status-paid/10 border border-stashr-status-paid/30 flex items-center gap-3 text-sm text-stashr-status-paid animate-fade-in">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{paymentSuccessMsg}</span>
        </div>
      )}

      {/* Checkout Drawer when Pay Now is active */}
      {showCheckout && (
        <div className="animate-slide-up">
          <PaymentCheckout
            invoice={invoice}
            onPaymentSuccess={handlePaymentSuccess}
            onCancel={() => setShowCheckout(false)}
          />
        </div>
      )}

      {/* Main Invoice Card */}
      <div className="glass-card p-8 space-y-8">
        {/* Invoice Summary Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-stashr-border">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xl font-bold text-stashr-text-heading">
                {invoice.invoiceNumber}
              </span>
              <StatusBadge status={invoice.status} />
            </div>
            <p className="text-xs text-stashr-text-dim font-mono">
              Transaction Ref: {invoice.transactionId || 'Awaiting Settlement'}
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs text-stashr-text-dim">Amount Due</span>
            <p className="font-mono text-3xl font-extrabold text-stashr-text-heading tracking-tight mt-0.5">
              {formatCurrency(invoice.total, invoice.currency)}
            </p>
            <p className="text-xs text-stashr-text-muted mt-1">
              Due on {formatReadableDate(invoice.dueAt)}
            </p>
          </div>
        </div>

        {/* Client & Vendor Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-xl bg-stashr-surface-elevated/40 border border-stashr-border text-xs">
          <div>
            <span className="text-stashr-text-dim uppercase font-semibold flex items-center gap-1.5 mb-2">
              <Building className="w-3.5 h-3.5 text-stashr-primary-light" /> Issuer
            </span>
            <p className="font-bold text-stashr-text-heading text-sm">StashrNode Infrastructure</p>
            <p className="text-stashr-text-muted mt-0.5">128 Infrastructure Way</p>
            <p className="text-stashr-text-muted">London, EC2A 4NE, UK</p>
            <p className="text-stashr-text-dim font-mono mt-1">VAT: GB 982 4410 22</p>
          </div>

          <div>
            <span className="text-stashr-text-dim uppercase font-semibold flex items-center gap-1.5 mb-2">
              <Receipt className="w-3.5 h-3.5 text-stashr-primary-cyan" /> Billed To
            </span>
            <p className="font-bold text-stashr-text-heading text-sm">{invoice.clientName}</p>
            <p className="text-stashr-text-muted mt-0.5">{invoice.clientEmail}</p>
            <p className="text-stashr-text-dim font-mono mt-1">Client ID: {invoice.clientId}</p>
          </div>

          <div>
            <span className="text-stashr-text-dim uppercase font-semibold flex items-center gap-1.5 mb-2">
              <Calendar className="w-3.5 h-3.5 text-stashr-status-pending" /> Schedule
            </span>
            <div className="space-y-1 text-stashr-text-muted">
              <p>Issued: <span className="font-mono text-stashr-text-body font-semibold">{formatReadableDate(invoice.issuedAt)}</span></p>
              <p>Due: <span className="font-mono text-stashr-text-body font-semibold">{formatReadableDate(invoice.dueAt)}</span></p>
              <p>
                Paid: {invoice.paidAt ? (
                  <span className="font-mono text-stashr-status-paid font-semibold">{formatReadableDate(invoice.paidAt)}</span>
                ) : (
                  <span className="font-mono text-stashr-status-pending">Pending</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="border border-stashr-border rounded-xl overflow-hidden">
          <div className="px-6 py-3 bg-stashr-surface-input border-b border-stashr-border flex justify-between items-center">
            <span className="text-xs uppercase font-semibold text-stashr-text-dim tracking-wider">
              Itemized Infrastructure Services
            </span>
            <span className="text-xs font-mono text-stashr-text-dim">
              {invoice.items.length || 1} Line Item(s)
            </span>
          </div>

          <table className="w-full text-left">
            <thead className="border-b border-stashr-border/60 text-xs text-stashr-text-dim uppercase">
              <tr>
                <th className="px-6 py-3">Description & Specifications</th>
                <th className="px-6 py-3 text-center">Qty</th>
                <th className="px-6 py-3 text-right">Unit Price</th>
                <th className="px-6 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stashr-border/30 text-sm">
              {invoice.items.length > 0 ? (
                invoice.items.map((item) => (
                  <tr key={item.id} className="hover:bg-stashr-surface-elevated/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2.5">
                        <Server className="w-4 h-4 text-stashr-primary-light mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-stashr-text-heading">{item.description}</p>
                          {item.metadata && (
                            <p className="text-xs text-stashr-text-dim font-mono mt-0.5">
                              {item.metadata.nodeSpec || 'Dedicated Instance'} • Region: {item.metadata.region || 'LON-01'}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-stashr-text-body">{item.quantity}</td>
                    <td className="px-6 py-4 text-right font-mono text-stashr-text-body">
                      {formatCurrency(item.unitPrice, invoice.currency)}
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-stashr-text-heading">
                      {formatCurrency(item.total, invoice.currency)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2.5">
                      <Server className="w-4 h-4 text-stashr-primary-light mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-stashr-text-heading">Cloud Node Resource Allocation</p>
                        <p className="text-xs text-stashr-text-dim font-mono mt-0.5">Tier 1 Cloud Compute • LON-01</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-mono">1</td>
                  <td className="px-6 py-4 text-right font-mono">{formatCurrency(invoice.subtotal, invoice.currency)}</td>
                  <td className="px-6 py-4 text-right font-mono font-bold">{formatCurrency(invoice.subtotal, invoice.currency)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Calculation Totals */}
        <div className="flex justify-end pt-2">
          <div className="w-full sm:w-80 space-y-2.5 p-5 rounded-xl bg-stashr-surface-elevated/50 border border-stashr-border text-xs">
            <div className="flex justify-between text-stashr-text-muted">
              <span>Subtotal:</span>
              <span className="font-mono text-stashr-text-body">{formatCurrency(invoice.subtotal, invoice.currency)}</span>
            </div>
            <div className="flex justify-between text-stashr-text-muted">
              <span>Standard VAT ({invoice.taxRate}%):</span>
              <span className="font-mono text-stashr-text-body">{formatCurrency(invoice.tax, invoice.currency)}</span>
            </div>
            {invoice.discount > 0 && (
              <div className="flex justify-between text-stashr-status-paid font-medium">
                <span>Promotional Discount:</span>
                <span className="font-mono">-{formatCurrency(invoice.discount, invoice.currency)}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm font-bold text-stashr-text-heading pt-3 border-t border-stashr-border">
              <span>Grand Total:</span>
              <span className="font-mono text-lg text-white font-extrabold">
                {formatCurrency(invoice.total, invoice.currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes / Terms */}
        <div className="p-4 rounded-xl bg-stashr-surface-input border border-stashr-border text-xs text-stashr-text-dim leading-relaxed">
          <strong className="text-stashr-text-body block mb-1">Billing Policy & Terms:</strong>
          All dedicated bare-metal nodes and virtual servers are billed in advance per billing cycle. Overdue accounts past 7 days are automatically soft-paused to protect node state. For wire transfers or manual PO settlements, contact billing@stashrnode.co.uk.
        </div>
      </div>

      {/* PDF Print Preview Modal */}
      <InvoicePDFPreview
        invoice={invoice}
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
      />
    </div>
  );
}
