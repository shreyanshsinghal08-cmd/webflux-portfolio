'use client';

import { PoundSterling, CalendarClock, Wallet, Server } from 'lucide-react';
import DataCard from '../shared/DataCard';

interface SpendOverviewProps {
  totalSpent?: string;
  amountDue?: string;
  walletBalance?: string;
  activeSubscriptions?: string;
}

export default function SpendOverview({
  totalSpent = '£2,847.50',
  amountDue = '£89.98',
  walletBalance = '£24.50',
  activeSubscriptions = '3',
}: SpendOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      <DataCard
        title="Total Spent (All Time)"
        value={totalSpent}
        subtitle="Since Jan 2024"
        icon={<PoundSterling className="w-5 h-5" />}
        trend={{ value: '12.5%', positive: true }}
        accentColor="violet"
      />
      <DataCard
        title="Amount Due"
        value={amountDue}
        subtitle="2 invoices pending"
        icon={<CalendarClock className="w-5 h-5" />}
        accentColor="amber"
      />
      <DataCard
        title="Wallet Balance"
        value={walletBalance}
        subtitle="Auto-pay enabled"
        icon={<Wallet className="w-5 h-5" />}
        accentColor="cyan"
      />
      <DataCard
        title="Active Subscriptions"
        value={activeSubscriptions}
        subtitle="Next renewal: Dec 1"
        icon={<Server className="w-5 h-5" />}
        accentColor="green"
      />
    </div>
  );
}
