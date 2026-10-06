'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Printer,
  Download,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  Zap,
  Server,
  ShieldCheck,
} from 'lucide-react';
import { InvoiceItem } from '@/lib/invoicesData';

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [invoice, setInvoice] = useState<InvoiceItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/invoices?id=${encodeURIComponent(id)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Invoice not found');
        return res.json();
      })
      .then((data) => setInvoice(data))
      .catch((err) => {
        console.error('Failed to load invoice:', err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-[#8AB4F8] font-mono text-sm animate-pulse">
        Fetching cryptographic invoice ledger #{id}...
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="cyber-card text-center py-12 space-y-4">
        <AlertCircle size={40} className="text-red-400 mx-auto" />
        <h2 className="text-xl font-heading text-[#E0F9FF]">Invoice Not Located</h2>
        <p className="text-sm text-[#8AB4F8]">
          The requested invoice identifier <strong className="text-[#00B8FF]">#{id}</strong> does not exist in the active ledger.
        </p>
        <Link href="/invoices" className="cyber-btn inline-flex text-xs">
          Return to All Invoices
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Top navigation actions */}
      <div className="flex items-center justify-between no-print">
        <Link
          href="/invoices"
          className="flex items-center gap-2 text-sm text-[#8AB4F8] hover:text-[#00B8FF] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Invoices</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="cyber-btn-secondary text-xs font-mono"
          >
            <Printer size={14} />
            <span>Print / PDF</span>
          </button>

          {invoice.status !== 'Paid' && (
            <Link
              href={`/checkout?invoice=${invoice.id}&amount=${invoice.amount.toFixed(2)}`}
              className="cyber-btn text-xs font-heading uppercase tracking-wider"
            >
              <CreditCard size={14} />
              <span>Pay Now (${invoice.amount.toFixed(2)})</span>
            </Link>
          )}
        </div>
      </div>

      {/* Official Tax Invoice Container */}
      <div className="cyber-card p-8 md:p-12 relative overflow-hidden border border-[#073E91] bg-[#010D2A]">
        {/* Paid Stamp Watermark */}
        {invoice.status === 'Paid' && (
          <div className="absolute right-8 top-28 border-4 border-[#1BFF68]/40 text-[#1BFF68] font-heading font-extrabold text-2xl uppercase tracking-widest px-6 py-2 rounded-xl rotate-[-12deg] pointer-events-none select-none bg-[#1BFF68]/5 shadow-neon">
            PAID IN FULL
          </div>
        )}

        {/* Invoice Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-[#073E91] pb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#00B8FF] flex items-center justify-center text-[#171229]">
                <Zap size={22} className="fill-current" />
              </div>
              <h1 className="text-2xl font-heading font-bold text-[#00B8FF]">
                Stashr<span className="text-[#E0F9FF]">Node</span>
              </h1>
            </div>
            <p className="text-xs text-[#8AB4F8] mt-2 font-mono leading-relaxed">
              StashrNode Infrastructure Networks Inc.<br />
              100 Cybernetic Way, Level 44<br />
              London, EC2A 4NE, United Kingdom<br />
              Tax / VAT ID: GB-982-341-902
            </p>
          </div>

          <div className="text-left md:text-right">
            <h2 className="text-3xl font-heading font-bold text-[#E0F9FF]">INVOICE</h2>
            <p className="text-sm font-mono text-[#00B8FF] mt-1 font-semibold">#{invoice.id}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono border">
              {invoice.status === 'Paid' ? (
                <span className="bg-[#1BFF68]/20 text-[#1BFF68] border-[#1BFF68]/40 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Settled & Paid
                </span>
              ) : invoice.status === 'Pending' ? (
                <span className="bg-amber-500/20 text-amber-400 border-amber-500/40 flex items-center gap-1">
                  <Clock size={12} /> Payment Pending
                </span>
              ) : (
                <span className="bg-red-500/20 text-red-400 border-red-500/40 flex items-center gap-1">
                  <AlertCircle size={12} /> Overdue Notice
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Invoice Metadata Meta Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6 border-b border-[#073E91]">
          <div>
            <p className="text-xs font-mono uppercase text-[#8AB4F8]">Billed To</p>
            <p className="text-sm font-semibold text-[#E0F9FF] mt-1">{invoice.client}</p>
            <p className="text-xs text-[#8AB4F8]/80 font-mono mt-0.5">{invoice.email}</p>
          </div>

          <div>
            <p className="text-xs font-mono uppercase text-[#8AB4F8]">Issue Date</p>
            <p className="text-sm font-mono text-[#E0F9FF] mt-1">{invoice.date}</p>
            <p className="text-xs font-mono uppercase text-[#8AB4F8] mt-3">Due Date</p>
            <p className="text-sm font-mono text-amber-400 mt-0.5">{invoice.dueDate}</p>
          </div>

          <div>
            <p className="text-xs font-mono uppercase text-[#8AB4F8]">Settlement Status</p>
            {invoice.status === 'Paid' ? (
              <div className="mt-1">
                <p className="text-xs font-mono text-[#1BFF68]">Transaction Ref:</p>
                <p className="text-xs font-mono text-[#E0F9FF]">{invoice.transactionId || 'TXN-SETTLED'}</p>
                <p className="text-[10px] text-[#8AB4F8] mt-1 font-mono">
                  {invoice.paidAt ? new Date(invoice.paidAt).toUTCString() : 'Confirmed on Gateway'}
                </p>
              </div>
            ) : (
              <div className="mt-1">
                <p className="text-xs text-amber-400 font-medium">Unsettled Balance</p>
                <p className="text-xl font-heading font-bold text-[#E0F9FF] mt-0.5">
                  ${invoice.amount.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Node Specs / Hardware Details */}
        {invoice.nodeSpecs && (
          <div className="my-6 p-4 rounded-lg bg-[#171229] border border-[#073E91]">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#0AD3C5]">
              <Server size={14} />
              <span>Assigned Infrastructure Node Specifications</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-[#8AB4F8]">Processor:</span>
                <p className="font-mono text-[#E0F9FF] font-semibold">{invoice.nodeSpecs.cpu}</p>
              </div>
              <div>
                <span className="text-[#8AB4F8]">Memory:</span>
                <p className="font-mono text-[#E0F9FF] font-semibold">{invoice.nodeSpecs.ram}</p>
              </div>
              <div>
                <span className="text-[#8AB4F8]">Location:</span>
                <p className="font-mono text-[#E0F9FF] font-semibold">{invoice.nodeSpecs.location}</p>
              </div>
              <div>
                <span className="text-[#8AB4F8]">Assigned IP:</span>
                <p className="font-mono text-[#00B8FF] font-semibold">{invoice.nodeSpecs.ip}</p>
              </div>
            </div>
          </div>
        )}

        {/* Itemized Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#073E91] text-xs font-mono uppercase text-[#8AB4F8]">
                <th className="py-3">Description & Compute Tier</th>
                <th className="py-3 text-center">Qty / Period</th>
                <th className="py-3 text-right">Unit Price</th>
                <th className="py-3 text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#073E91]/40 text-sm">
              <tr>
                <td className="py-4">
                  <p className="font-medium text-[#E0F9FF]">{invoice.service}</p>
                  <p className="text-xs text-[#8AB4F8] mt-1">{invoice.description}</p>
                </td>
                <td className="py-4 text-center font-mono text-[#8AB4F8]">1 Month</td>
                <td className="py-4 text-right font-mono text-[#E0F9FF]">${invoice.amount.toFixed(2)}</td>
                <td className="py-4 text-right font-mono font-bold text-[#E0F9FF]">${invoice.amount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="mt-6 pt-6 border-t border-[#073E91] flex flex-col items-end">
          <div className="w-full sm:w-72 space-y-2 text-sm">
            <div className="flex justify-between text-[#8AB4F8]">
              <span>Subtotal:</span>
              <span className="font-mono text-[#E0F9FF]">${invoice.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#8AB4F8]">
              <span>Reverse Charge VAT (0%):</span>
              <span className="font-mono text-[#E0F9FF]">$0.00</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#00B8FF] pt-2 border-t border-[#073E91]">
              <span className="font-heading">Total Amount Due:</span>
              <span className="font-mono text-xl">${invoice.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment CTA for unpaid invoices */}
        {invoice.status !== 'Paid' && (
          <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-[#171229] to-[#010D2A] border border-[#00B8FF]/40 flex flex-col sm:flex-row items-center justify-between gap-4 no-print shadow-neon">
            <div>
              <p className="font-heading font-bold text-[#E0F9FF]">Ready to finalize this settlement?</p>
              <p className="text-xs text-[#8AB4F8] mt-0.5">
                Instant confirmation via Credit Card, Wallet Balance, or Decentralized Crypto.
              </p>
            </div>
            <Link
              href={`/checkout?invoice=${invoice.id}&amount=${invoice.amount.toFixed(2)}`}
              className="cyber-btn whitespace-nowrap shadow-neon-glow"
            >
              Pay ${invoice.amount.toFixed(2)} Now →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
