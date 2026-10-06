'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  Receipt,
  Server,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { InvoiceItem } from '@/lib/invoicesData';

export default function DashboardPage() {
  const [balance, setBalance] = useState<number>(1240.0);
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/invoices')
      .then((res) => res.json())
      .then((data) => {
        if (data.invoices) setInvoices(data.invoices);
        if (data.balance !== undefined) setBalance(data.balance);
      })
      .catch((err) => {
        console.error('Error fetching invoices:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const pendingInvoices = invoices.filter(
    (inv) => inv.status === 'Pending' || inv.status === 'Overdue'
  );
  const pendingTotal = pendingInvoices.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h2 className="text-[38px] leading-[42px] font-heading text-[#E0F9FF] tracking-[-1.14px]">
          Billing Overview
        </h2>
        <p className="text-sm text-[#8AB4F8] mt-1">Real-time revenue metrics & live server node telemetry.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="cyber-card">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-[#8AB4F8]">Total Revenue</span>
            <DollarSign size={18} className="text-[#00B8FF]" />
          </div>
          <p className="text-3xl font-heading font-bold text-[#E0F9FF]">$14,890.50</p>
          <p className="text-[11px] text-[#1BFF68] flex items-center gap-1 mt-2">
            <ArrowUpRight size={12} /> +14.2% this month
          </p>
        </div>

        <div className="cyber-card">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-[#8AB4F8]">Account Balance</span>
            <DollarSign size={18} className="text-[#1BFF68]" />
          </div>
          <p className="text-3xl font-heading font-bold text-[#1BFF68]">${balance.toFixed(2)}</p>
          <p className="text-[11px] text-[#8AB4F8] mt-2">Auto-deduct active</p>
        </div>

        <div className="cyber-card">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-[#8AB4F8]">Unpaid Invoices</span>
            <Receipt size={18} className="text-[#00B8FF]" />
          </div>
          <p className="text-3xl font-heading font-bold text-[#E0F9FF]">
            {pendingInvoices.length > 0 ? `${pendingInvoices.length} Pending` : '0 Pending'}
          </p>
          <p className="text-[11px] text-[#8AB4F8] mt-2">
            Total Due: ${pendingTotal > 0 ? pendingTotal.toFixed(2) : '0.00'}
          </p>
        </div>

        <div className="cyber-card">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-[#8AB4F8]">Active Nodes</span>
            <Server size={18} className="text-[#0AD3C5]" />
          </div>
          <p className="text-3xl font-heading font-bold text-[#0AD3C5]">8 Online</p>
          <p className="text-[11px] text-[#1BFF68] mt-2">99.99% Uptime</p>
        </div>
      </div>

      {/* Action Banner */}
      <div className="cyber-card border-[#00B8FF]/40 bg-gradient-to-r from-[#010D2A] to-[#171229] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-heading text-[#E0F9FF]">
            Instant Invoice Payment Required
          </h3>
          <p className="text-sm text-[#8AB4F8] mt-1">Invoice #INV-2024-8891 ($45.00) is awaiting settlement.</p>
        </div>
        <Link href="/checkout?invoice=INV-2024-8891&amount=45.00" className="cyber-btn whitespace-nowrap">
          Pay Invoice Now ($45.00)
        </Link>
      </div>

      {/* Invoices List Preview */}
      <div className="cyber-card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-[#073E91] flex items-center justify-between">
          <h3 className="text-lg font-heading text-[#E0F9FF]">Recent Invoices</h3>
          <Link href="/invoices" className="text-xs text-[#00B8FF] hover:underline">View All →</Link>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#171229] text-[#8AB4F8] text-xs font-mono uppercase border-b border-[#073E91]">
              <th className="p-4">Invoice ID</th>
              <th className="p-4">Service</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#073E91]/50 text-sm">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[#8AB4F8] font-mono">
                  Loading invoices...
                </td>
              </tr>
            ) : (
              invoices.slice(0, 5).map((inv) => (
                <tr key={inv.id} className="hover:bg-[#073E91]/20 transition-colors">
                  <td className="p-4 font-mono text-[#00B8FF]">#{inv.id}</td>
                  <td className="p-4 text-[#E0F9FF]">{inv.service}</td>
                  <td className="p-4 font-mono font-bold text-[#E0F9FF]">${inv.amount.toFixed(2)}</td>
                  <td className="p-4">
                    {inv.status === 'Paid' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1BFF68]/10 text-[#1BFF68] border border-[#1BFF68]/30">
                        <CheckCircle2 size={12} />
                        Paid
                      </span>
                    ) : inv.status === 'Pending' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        <Clock size={12} />
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30">
                        <AlertCircle size={12} />
                        Overdue
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {inv.status === 'Paid' ? (
                      <Link
                        href={`/invoices/${inv.id}`}
                        className="cyber-btn-secondary text-xs !py-1 !px-3 font-mono inline-flex"
                      >
                        Receipt
                      </Link>
                    ) : (
                      <Link
                        href={`/checkout?invoice=${inv.id}&amount=${inv.amount.toFixed(2)}`}
                        className="cyber-btn text-xs !py-1 !px-3 font-heading uppercase inline-flex"
                      >
                        Pay Now
                      </Link>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
