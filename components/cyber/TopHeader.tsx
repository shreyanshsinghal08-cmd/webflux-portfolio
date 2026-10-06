'use client';

import Link from 'next/link';
import { CreditCard, Bell, Shield, ArrowUpRight, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TopHeader() {
  const [balance, setBalance] = useState(1240.0);

  useEffect(() => {
    fetch('/api/invoices')
      .then((res) => res.json())
      .then((data) => {
        if (data.balance !== undefined) setBalance(data.balance);
      })
      .catch(() => {});
  }, []);

  return (
    <header className="h-16 bg-[#010D2A] border-b border-[#073E91] px-8 flex items-center justify-between z-10 flex-shrink-0">
      <div className="flex items-center gap-4">
        <span className="text-xs font-mono text-[#8AB4F8]">
          ENVIRONMENT: <span className="text-[#00B8FF] font-bold">PRODUCTION // HIGH-AVAILABILITY</span>
        </span>
        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#073E91]" />
        <span className="hidden sm:inline-block text-xs font-mono text-[#8AB4F8]/70">
          NODE NETWORK: <span className="text-[#1BFF68]">ACTIVE (100% HEALTH)</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Wallet Balance Chip */}
        <Link
          href="/wallet"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#171229] border border-[#073E91] hover:border-[#00B8FF] transition-all text-xs font-mono"
        >
          <span className="text-[#8AB4F8]">Balance:</span>
          <span className="text-[#1BFF68] font-bold">${balance.toFixed(2)}</span>
          <ArrowUpRight size={14} className="text-[#00B8FF]" />
        </Link>

        {/* Quick Checkout Trigger */}
        <Link
          href="/checkout?invoice=INV-2024-8891&amount=45.00"
          className="hidden md:flex cyber-btn !px-3.5 !py-1.5 text-xs font-heading font-semibold uppercase tracking-wider"
        >
          <CreditCard size={14} />
          <span>Pay $45.00 Due</span>
        </Link>

        <div className="w-8 h-8 rounded-lg bg-[#171229] border border-[#073E91] flex items-center justify-center text-[#8AB4F8] hover:text-[#00B8FF] transition-colors relative cursor-pointer">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00B8FF] animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00B8FF]" />
        </div>
      </div>
    </header>
  );
}
