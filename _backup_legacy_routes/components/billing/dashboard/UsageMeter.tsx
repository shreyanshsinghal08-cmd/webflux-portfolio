'use client';

import { Activity, Cpu, HardDrive, Wifi, ShieldCheck, Database } from 'lucide-react';

interface MetricItem {
  label: string;
  used: string;
  total: string;
  percentage: number;
  icon: React.ReactNode;
  color: string;
}

const metrics: MetricItem[] = [
  {
    label: 'Aggregate Bandwidth Quota',
    used: '742 GB',
    total: '2,500 GB',
    percentage: 29.6,
    icon: <Wifi className="w-4 h-4 text-stashr-primary-cyan" />,
    color: 'from-stashr-primary-cyan to-stashr-primary-blue',
  },
  {
    label: 'vCPU Compute Capacity',
    used: '26 Cores',
    total: '32 Cores',
    percentage: 81.25,
    icon: <Cpu className="w-4 h-4 text-stashr-primary-light" />,
    color: 'from-stashr-primary to-stashr-primary-light',
  },
  {
    label: 'High-Speed NVMe Storage',
    used: '480 GB',
    total: '1,000 GB',
    percentage: 48,
    icon: <HardDrive className="w-4 h-4 text-stashr-status-paid" />,
    color: 'from-stashr-status-paid to-stashr-primary-cyan',
  },
  {
    label: 'DDR5 Unified Memory',
    used: '56 GB',
    total: '64 GB',
    percentage: 87.5,
    icon: <Database className="w-4 h-4 text-stashr-status-pending" />,
    color: 'from-stashr-status-pending to-stashr-status-overdue',
  },
];

export default function UsageMeter() {
  return (
    <div className="glass-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-stashr-border gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-stashr-primary/10 flex items-center justify-center text-stashr-primary-light shadow-glow-sm">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="section-heading">Infrastructure Usage Telemetry</h3>
            <p className="section-subheading">Live cluster telemetry and active billing cycle quota</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stashr-surface-elevated border border-stashr-border text-xs">
            <ShieldCheck className="w-4 h-4 text-stashr-status-paid" />
            <span className="text-stashr-text-muted">Status:</span>
            <span className="font-mono font-semibold text-stashr-status-paid">NOMINAL</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-stashr-text-dim">Peak Throughput:</span>
            <p className="font-mono text-xs font-bold text-stashr-text-body">1.42 Gbps</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-stashr-surface-elevated/40 border border-stashr-border hover:bg-stashr-surface-elevated/70 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-stashr-surface-input border border-stashr-border">
                  {metric.icon}
                </div>
                <span className="text-sm font-semibold text-stashr-text-body">{metric.label}</span>
              </div>
              <span className="font-mono text-xs font-bold text-stashr-text-heading">
                {metric.percentage.toFixed(1)}%
              </span>
            </div>

            {/* Gauge Bar */}
            <div className="w-full h-2 rounded-full bg-stashr-surface-input overflow-hidden border border-stashr-border my-3">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${metric.color} transition-all duration-500`}
                style={{ width: `${Math.min(100, metric.percentage)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-stashr-text-dim">
              <span>Used: <strong className="text-stashr-text-body">{metric.used}</strong></span>
              <span>Quota: <strong className="text-stashr-text-muted">{metric.total}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
