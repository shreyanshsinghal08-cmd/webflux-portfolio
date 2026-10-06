'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Wallet,
  CreditCard,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { getTransactions, PaymentTransaction } from '@/lib/invoicesData';

export default function WalletPage() {
  const [balance, setBalance] = useState(1240.0);
  const [topUpAmount, setTopUpAmount] = useState('100.00');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [autoRenew, setAutoRenew] = useState(true);

  const fetchBalance = () => {
    fetch('/api/invoices')
      .then((res) => res.json())
      .then((data) => {
        if (data.balance !== undefined) setBalance(data.balance);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleQuickTopUp = async (amt: number) => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId: 'WALLET-TOPUP',
          amount: amt,
          paymentMethod: 'Credit Card (Instant Topup)',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg(`Successfully credited $${amt.toFixed(2)} to your wallet balance.`);
        fetchBalance();
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[38px] leading-[42px] font-heading font-bold text-[#E0F9FF]">
            Wallet & Account Credits
          </h2>
          <p className="text-sm text-[#8AB4F8] mt-1 font-body">
            Pre-fund your infrastructure balance for uninterrupted zero-latency compute uptime.
          </p>
        </div>

        <Link
          href={`/checkout?invoice=WALLET-TOPUP&amount=${topUpAmount}`}
          className="cyber-btn font-heading text-xs uppercase tracking-wider !py-3"
        >
          <CreditCard size={16} />
          <span>Checkout Top-Up</span>
        </Link>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-[#1BFF68]/15 border border-[#1BFF68]/40 text-[#1BFF68] flex items-center gap-3 text-sm font-mono animate-fadeIn">
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Balances & Quick Topup */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="cyber-card p-6 border-[#00B8FF] relative overflow-hidden flex flex-col justify-between shadow-neon">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono uppercase text-[#8AB4F8]">Available Balance</span>
              <Wallet size={20} className="text-[#1BFF68]" />
            </div>
            <p className="text-4xl font-heading font-bold text-[#1BFF68] mt-2">
              ${balance.toFixed(2)}
            </p>
            <p className="text-xs text-[#8AB4F8] mt-2 leading-relaxed">
              Funds are held in segregated, liquid trust reserves and usable across any global cloud region.
            </p>
          </div>

          <div className="pt-6 border-t border-[#073E91] mt-6 flex items-center justify-between">
            <span className="text-xs font-mono text-[#8AB4F8]">AUTO-DEBIT:</span>
            <button
              onClick={() => setAutoRenew(!autoRenew)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                autoRenew
                  ? 'bg-[#1BFF68]/20 text-[#1BFF68] border border-[#1BFF68]/40'
                  : 'bg-[#171229] text-[#8AB4F8] border border-[#073E91]'
              }`}
            >
              {autoRenew ? 'ACTIVE (99.99% PROTECT)' : 'DISABLED'}
            </button>
          </div>
        </div>

        {/* Instant Deposit Presets */}
        <div className="cyber-card p-6 lg:col-span-2 space-y-5">
          <div>
            <h3 className="text-lg font-heading font-bold text-[#E0F9FF]">
              Instant Deposit & Credit Top-Up
            </h3>
            <p className="text-xs text-[#8AB4F8] mt-1">
              Select an instant tier to credit your account immediately via test gateway:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[50, 100, 250, 500].map((amt) => (
              <button
                key={amt}
                type="button"
                disabled={loading}
                onClick={() => handleQuickTopUp(amt)}
                className="p-4 rounded-xl bg-[#171229] border border-[#073E91] hover:border-[#00B8FF] hover:bg-[#073E91]/20 transition-all text-center group cursor-pointer"
              >
                <span className="text-xs font-mono text-[#8AB4F8]">Quick Add</span>
                <p className="text-xl font-heading font-bold text-[#00B8FF] mt-1 group-hover:scale-105 transition-transform">
                  +${amt}
                </p>
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#073E91] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8AB4F8]">
              <ShieldCheck size={16} className="text-[#1BFF68]" />
              <span>Instant settle via 3D Secure / Wire / Crypto</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-mono text-[#8AB4F8]">Custom:</span>
              <input
                type="number"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                className="cyber-input !py-1.5 !px-3 w-28 text-xs font-mono"
              />
              <Link
                href={`/checkout?invoice=WALLET-TOPUP&amount=${topUpAmount}`}
                className="cyber-btn !py-1.5 !px-4 text-xs font-heading uppercase"
              >
                Proceed
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Transactions Ledger */}
      <div className="cyber-card p-0 overflow-hidden border border-[#073E91]">
        <div className="px-6 py-4 border-b border-[#073E91] bg-[#010D2A] flex items-center justify-between">
          <h3 className="text-lg font-heading text-[#E0F9FF]">Wallet Transaction Ledger</h3>
          <span className="text-xs font-mono text-[#1BFF68]">AUDITED LIVE</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#171229] border-b border-[#073E91] text-xs font-mono uppercase text-[#8AB4F8]">
                <th className="p-4 px-6">Transaction ID</th>
                <th className="p-4">Type / Description</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Amount</th>
                <th className="p-4 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#073E91]/40 text-sm">
              <tr className="hover:bg-[#073E91]/20 transition-colors">
                <td className="p-4 px-6 font-mono text-[#00B8FF] font-semibold">TXN-982314-NW</td>
                <td className="p-4">
                  <p className="font-medium text-[#E0F9FF]">Invoice Settlement #INV-2024-8889</p>
                  <p className="text-xs text-[#8AB4F8]">Intel Xeon Platinum 8480+ Cloud Instance</p>
                </td>
                <td className="p-4 font-mono text-xs text-[#8AB4F8]">Credit Card (Stripe)</td>
                <td className="p-4 font-mono font-bold text-[#E0F9FF]">-$107.99</td>
                <td className="p-4 px-6 text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1BFF68]/15 text-[#1BFF68] border border-[#1BFF68]/30">
                    <CheckCircle2 size={12} /> Settled
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#073E91]/20 transition-colors">
                <td className="p-4 px-6 font-mono text-[#00B8FF] font-semibold">TXN-441209-ZH</td>
                <td className="p-4">
                  <p className="font-medium text-[#E0F9FF]">Invoice Settlement #INV-2024-8888</p>
                  <p className="text-xs text-[#8AB4F8]">Global Anycast Edge DDoS Proxy</p>
                </td>
                <td className="p-4 font-mono text-xs text-[#8AB4F8]">Account Balance Auto-Debit</td>
                <td className="p-4 font-mono font-bold text-[#E0F9FF]">-$14.99</td>
                <td className="p-4 px-6 text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1BFF68]/15 text-[#1BFF68] border border-[#1BFF68]/30">
                    <CheckCircle2 size={12} /> Settled
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#073E91]/20 transition-colors">
                <td className="p-4 px-6 font-mono text-[#00B8FF] font-semibold">TXN-INIT-FUND</td>
                <td className="p-4">
                  <p className="font-medium text-[#E0F9FF]">Account Balance Provisioning</p>
                  <p className="text-xs text-[#8AB4F8]">Initial enterprise credit deposit</p>
                </td>
                <td className="p-4 font-mono text-xs text-[#8AB4F8]">Fedwire / SEPA Transfer</td>
                <td className="p-4 font-mono font-bold text-[#1BFF68]">+$1,240.00</td>
                <td className="p-4 px-6 text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1BFF68]/15 text-[#1BFF68] border border-[#1BFF68]/30">
                    <CheckCircle2 size={12} /> Credited
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
