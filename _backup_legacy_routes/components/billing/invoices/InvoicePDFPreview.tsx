'use client';

import { X, Printer, Download, CheckCircle2 } from 'lucide-react';
import type { Invoice } from '@/types/billing';
import { formatCurrency } from '@/lib/currency';
import { formatReadableDate } from '@/lib/date-helpers';
import { printInvoice } from '@/lib/pdf-generator';

interface InvoicePDFPreviewProps {
  invoice: Invoice;
  isOpen: boolean;
  onClose: () => void;
}

export default function InvoicePDFPreview({
  invoice,
  isOpen,
  onClose,
}: InvoicePDFPreviewProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stashr-bg/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="glass-card max-w-3xl w-full p-8 my-8 border border-stashr-border shadow-2xl animate-slide-up relative bg-stashr-surface">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-stashr-border">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-semibold text-stashr-text-dim">
              PREVIEW: {invoice.invoiceNumber}.pdf
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => printInvoice(invoice)}
              className="btn-secondary text-xs flex items-center gap-1.5 py-2 px-3"
            >
              <Printer className="w-4 h-4" /> Print Document
            </button>
            <button
              onClick={() => printInvoice(invoice)}
              className="btn-primary text-xs flex items-center gap-1.5 py-2 px-3"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-stashr-surface-elevated text-stashr-text-dim hover:text-white transition-colors"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Paper Document Body */}
        <div className="bg-stashr-surface-elevated/40 border border-stashr-border rounded-xl p-8 space-y-8">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                Stashr<span className="text-stashr-primary-light">Node</span>
              </h2>
              <p className="text-xs text-stashr-text-muted mt-1">High-Throughput Cloud & Dedicated Bare-Metal</p>
              <p className="text-xs text-stashr-text-dim mt-0.5 font-mono">VAT ID: GB 982 4410 22</p>
            </div>
            <div className="text-right">
              <div className="inline-block px-3 py-1 rounded-full border text-xs font-mono font-semibold uppercase bg-stashr-primary/10 text-stashr-primary-light border-stashr-primary/20">
                {invoice.status}
              </div>
              <h3 className="font-mono text-xl font-bold text-stashr-text-heading mt-2">
                {invoice.invoiceNumber}
              </h3>
            </div>
          </div>

          {/* Client & Date Information */}
          <div className="grid grid-cols-2 gap-8 text-sm pt-4 border-t border-stashr-border/60">
            <div>
              <p className="text-xs uppercase text-stashr-text-dim font-semibold mb-1">Billed To</p>
              <p className="font-semibold text-stashr-text-heading">{invoice.clientName}</p>
              <p className="text-xs text-stashr-text-muted mt-0.5">{invoice.clientEmail}</p>
              <p className="text-xs text-stashr-text-dim mt-0.5 font-mono">Client ID: {invoice.clientId}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase text-stashr-text-dim font-semibold mb-1">Payment Schedule</p>
              <p className="text-xs text-stashr-text-muted">
                Issue Date: <span className="font-mono text-stashr-text-heading">{formatReadableDate(invoice.issuedAt)}</span>
              </p>
              <p className="text-xs text-stashr-text-muted mt-1">
                Due Date: <span className="font-mono text-stashr-text-heading">{formatReadableDate(invoice.dueAt)}</span>
              </p>
              {invoice.paidAt && (
                <p className="text-xs text-stashr-status-paid mt-1 flex items-center justify-end gap-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Paid: {formatReadableDate(invoice.paidAt)}
                </p>
              )}
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-stashr-border rounded-lg overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-stashr-surface-input border-b border-stashr-border text-xs uppercase text-stashr-text-dim">
                <tr>
                  <th className="px-4 py-2.5">Item Description</th>
                  <th className="px-4 py-2.5 text-center">Qty</th>
                  <th className="px-4 py-2.5 text-right">Unit Price</th>
                  <th className="px-4 py-2.5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stashr-border/40">
                {invoice.items.length > 0 ? (
                  invoice.items.map((item) => (
                    <tr key={item.id} className="text-xs">
                      <td className="px-4 py-3">
                        <span className="font-semibold text-stashr-text-heading block">{item.description}</span>
                        {item.metadata?.nodeSpec && (
                          <span className="font-mono text-[11px] text-stashr-text-dim">
                            {item.metadata.nodeSpec} • Region: {item.metadata.region || 'LON-01'}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-stashr-text-body">{item.quantity}</td>
                      <td className="px-4 py-3 text-right font-mono text-stashr-text-body">
                        {formatCurrency(item.unitPrice, invoice.currency)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-stashr-text-heading">
                        {formatCurrency(item.total, invoice.currency)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-xs">
                    <td className="px-4 py-3">
                      <span className="font-semibold text-stashr-text-heading">Standard Cloud Instance Allocation</span>
                    </td>
                    <td className="px-4 py-3 text-center font-mono">1</td>
                    <td className="px-4 py-3 text-right font-mono">{formatCurrency(invoice.subtotal, invoice.currency)}</td>
                    <td className="px-4 py-3 text-right font-mono font-bold">{formatCurrency(invoice.subtotal, invoice.currency)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-stashr-text-muted">
                <span>Subtotal:</span>
                <span className="font-mono text-stashr-text-body">{formatCurrency(invoice.subtotal, invoice.currency)}</span>
              </div>
              <div className="flex justify-between text-stashr-text-muted">
                <span>VAT ({invoice.taxRate}%):</span>
                <span className="font-mono text-stashr-text-body">{formatCurrency(invoice.tax, invoice.currency)}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between text-stashr-status-paid">
                  <span>Discount Applied:</span>
                  <span className="font-mono">-{formatCurrency(invoice.discount, invoice.currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-stashr-text-heading pt-2 border-t border-stashr-border">
                <span>Total Amount:</span>
                <span className="font-mono text-base">{formatCurrency(invoice.total, invoice.currency)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="p-3 bg-stashr-surface-input border border-stashr-border rounded-lg text-xs text-stashr-text-dim">
              <strong className="text-stashr-text-muted">Notice:</strong> {invoice.notes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
