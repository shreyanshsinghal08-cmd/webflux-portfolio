'use client';

import PanelShell from '@/components/panel/layout/PanelShell';
import StatsGrid from '@/components/panel/dashboard/StatsGrid';
import RevenueChart from '@/components/panel/dashboard/RevenueChart';
import RecentInvoices from '@/components/panel/dashboard/RecentInvoices';
import ActivityFeed from '@/components/panel/dashboard/ActivityFeed';
import LiveMetricsBar from '@/components/panel/dashboard/LiveMetricsBar';
import LiveServerStatus from '@/components/panel/dashboard/LiveServerStatus';

export default function DashboardPage() {
  return (
    <PanelShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-txt-heading">Dashboard</h1>
            <p className="text-sm text-txt-muted mt-0.5">Real-time billing & infrastructure overview</p>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-txt-dim">
            <span className="w-2 h-2 rounded-full bg-status-paid animate-pulse" />
            Connected to StashrNode API
          </div>
        </div>

        <StatsGrid />

        <LiveMetricsBar />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>
          <ActivityFeed />
        </div>

        <LiveServerStatus />

        <RecentInvoices />
      </div>
    </PanelShell>
  );
}
