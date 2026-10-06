'use client';

import { useState, useEffect } from 'react';
import { Cpu, HardDrive, Wifi, Database, Activity, Clock } from 'lucide-react';
import { generateServerMetrics } from '@/lib/live-data';

function GaugeBar({
  label,
  icon,
  value,
  unit,
  color,
  warnAt = 75,
}: {
  label: string;
  icon: React.ReactNode;
  value: number;
  unit: string;
  color: string;
  warnAt?: number;
}) {
  const isWarn = value >= warnAt;
  return (
    <div className="p-3 rounded-xl bg-panel-input border border-border/50">
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-1.5 text-[11px] text-txt-muted font-medium">
          {icon} {label}
        </span>
        <span className={`text-xs font-mono font-bold ${isWarn ? 'text-status-overdue' : color}`}>
          {value}{unit}
        </span>
      </div>
      <div className="w-full h-2 bg-panel-bg rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            isWarn ? 'bg-status-overdue' : color.replace('text-', 'bg-')
          }`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}

export default function LiveMetricsBar() {
  const [metrics, setMetrics] = useState(generateServerMetrics());
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const metricsInterval = setInterval(() => setMetrics(generateServerMetrics()), 2500);
    const clockInterval = setInterval(() => setClock(new Date()), 1000);
    return () => {
      clearInterval(metricsInterval);
      clearInterval(clockInterval);
    };
  }, []);

  return (
    <div className="p-card">
      <div className="p-card-header">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-cyan" />
          <h3 className="text-sm font-semibold text-txt-heading">Cluster Telemetry</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-txt-dim flex items-center gap-1">
            <Clock className="w-3 h-3" /> {clock.toLocaleTimeString('en-GB')}
          </span>
          <span className="text-[10px] font-mono text-status-paid bg-status-paid/10 px-2 py-0.5 rounded-full border border-status-paid/20">
            LHR-PRIMARY
          </span>
        </div>
      </div>
      <div className="p-card-body">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          <GaugeBar
            label="CPU"
            icon={<Cpu className="w-3.5 h-3.5 text-brand-light" />}
            value={metrics.cpu}
            unit="%"
            color="text-brand-light"
          />
          <GaugeBar
            label="RAM"
            icon={<HardDrive className="w-3.5 h-3.5 text-brand-cyan" />}
            value={metrics.ram}
            unit="%"
            color="text-brand-cyan"
          />
          <GaugeBar
            label="Disk I/O"
            icon={<Database className="w-3.5 h-3.5 text-status-paid" />}
            value={metrics.disk}
            unit="%"
            color="text-status-paid"
          />
          <GaugeBar
            label="Bandwidth"
            icon={<Wifi className="w-3.5 h-3.5 text-status-pending" />}
            value={metrics.bandwidth}
            unit="%"
            color="text-status-pending"
          />
          <GaugeBar
            label="Ping"
            icon={<Activity className="w-3.5 h-3.5 text-status-info" />}
            value={metrics.ping}
            unit="ms"
            color="text-status-info"
            warnAt={20}
          />
          <GaugeBar
            label="Active Conns"
            icon={<Activity className="w-3.5 h-3.5 text-brand" />}
            value={metrics.activeConnections}
            unit=""
            color="text-brand"
            warnAt={500}
          />
        </div>
      </div>
    </div>
  );
}
