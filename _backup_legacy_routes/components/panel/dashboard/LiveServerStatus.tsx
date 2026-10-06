'use client';

import { useState, useEffect } from 'react';
import { Server, Wifi, Clock, Cpu, HardDrive } from 'lucide-react';
import { LIVE_SERVERS, generateServerMetrics } from '@/lib/live-data';

interface ServerInfo {
  id: string;
  name: string;
  location: string;
  ip: string;
  type: string;
  ram: string;
  status: 'online' | 'maintenance';
}

function ServerCard({ server }: { server: ServerInfo }) {
  const [metrics, setMetrics] = useState(generateServerMetrics());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(generateServerMetrics());
      setLastUpdate(new Date());
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  const isOnline = server.status === 'online';

  return (
    <div className="p-4 rounded-xl bg-panel-elevated/40 border border-border hover:border-border-hover transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand-light">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-txt-heading">{server.name}</h4>
            <p className="text-[11px] text-txt-dim font-mono">{server.location} • {server.ip}</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase border ${
            isOnline
              ? 'bg-status-paid/10 text-status-paid border-status-paid/20'
              : 'bg-status-pending/10 text-status-pending border-status-pending/20'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-status-paid' : 'bg-status-pending'} animate-pulse`} />
          {server.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 my-3">
        <div className="p-2 rounded-lg bg-panel-input text-center">
          <Cpu className="w-3 h-3 text-txt-dim mx-auto mb-1" />
          <p className="text-[10px] text-txt-dim">CPU</p>
          <p className="text-xs font-mono font-bold text-txt-body truncate">{server.type}</p>
        </div>
        <div className="p-2 rounded-lg bg-panel-input text-center">
          <HardDrive className="w-3 h-3 text-txt-dim mx-auto mb-1" />
          <p className="text-[10px] text-txt-dim">RAM</p>
          <p className="text-xs font-mono font-bold text-txt-body">{server.ram}</p>
        </div>
        <div className="p-2 rounded-lg bg-panel-input text-center">
          <Wifi className="w-3 h-3 text-txt-dim mx-auto mb-1" />
          <p className="text-[10px] text-txt-dim">Ping</p>
          <p className="text-xs font-mono font-bold text-status-paid">{metrics.ping}ms</p>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between text-[10px] mb-1">
          <span className="text-txt-dim">CPU Load</span>
          <span className="font-mono text-txt-muted">{metrics.cpu}%</span>
        </div>
        <div className="w-full h-1.5 bg-panel-input rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${
              metrics.cpu > 70 ? 'bg-status-overdue' : metrics.cpu > 50 ? 'bg-status-pending' : 'bg-status-paid'
            }`}
            style={{ width: `${metrics.cpu}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
        <span className="text-[10px] text-txt-dim flex items-center gap-1">
          <Clock className="w-3 h-3" /> {metrics.uptime.toFixed(2)}% uptime
        </span>
        <span className="text-[9px] text-txt-dim font-mono">Updated {lastUpdate.toLocaleTimeString()}</span>
      </div>
    </div>
  );
}

export default function LiveServerStatus() {
  return (
    <div className="p-card">
      <div className="p-card-header">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-txt-heading">Infrastructure Status</h3>
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-status-paid bg-status-paid/10 px-2 py-0.5 rounded-full border border-status-paid/20">
            <span className="w-1.5 h-1.5 rounded-full bg-status-paid animate-pulse" />
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
        <p className="text-[11px] text-txt-dim font-mono">5 nodes • 3 regions</p>
      </div>
      <div className="p-card-body">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {LIVE_SERVERS.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
      </div>
    </div>
  );
}
