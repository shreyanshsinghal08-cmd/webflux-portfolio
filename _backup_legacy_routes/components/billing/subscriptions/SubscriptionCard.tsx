'use client';

import { useState } from 'react';
import { Server, Cpu, HardDrive, Wifi, MoreVertical, Pause, Play, ArrowUpCircle } from 'lucide-react';

interface SubscriptionCardProps {
  id?: string;
  nodeName: string;
  spec: string;
  ip: string;
  tier: string;
  price: string;
  cycle: string;
  status: 'active' | 'paused' | 'cancelled';
  renewDate: string;
  cpu: number;
  ram: number;
  bandwidth: number;
  onUpgrade?: (subId?: string) => void;
  onToggleStatus?: (subId?: string) => void;
}

export default function SubscriptionCard({
  id,
  nodeName,
  spec,
  ip,
  tier,
  price,
  cycle,
  status: initialStatus,
  renewDate,
  cpu,
  ram,
  bandwidth,
  onUpgrade,
  onToggleStatus,
}: SubscriptionCardProps) {
  const [status, setStatus] = useState<'active' | 'paused' | 'cancelled'>(initialStatus);
  const [menuOpen, setMenuOpen] = useState(false);

  const statusColors = {
    active: 'bg-stashr-status-paid/10 text-stashr-status-paid border-stashr-status-paid/20',
    paused: 'bg-stashr-status-pending/10 text-stashr-status-pending border-stashr-status-pending/20',
    cancelled: 'bg-stashr-status-cancelled/10 text-stashr-status-cancelled border-stashr-status-cancelled/20',
  };

  const handleStatusToggle = () => {
    const next = status === 'active' ? 'paused' : 'active';
    setStatus(next);
    setMenuOpen(false);
    if (onToggleStatus) onToggleStatus(id);
  };

  return (
    <div className="glass-card-hover p-6 relative overflow-hidden group">
      {/* Gradient Accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-brand opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-stashr-primary/10 flex items-center justify-center">
            <Server className="w-5 h-5 text-stashr-primary-light" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-stashr-text-heading">{nodeName}</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stashr-surface-input border border-stashr-border text-stashr-primary-cyan">
                {tier}
              </span>
            </div>
            <p className="text-xs text-stashr-text-dim font-mono mt-0.5">{ip}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 relative">
          <span className={`status-badge ${statusColors[status]}`}>
            {status.toUpperCase()}
          </span>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-md hover:bg-stashr-surface-elevated transition-colors text-stashr-text-dim hover:text-white"
            aria-label="Node options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Quick Context Menu */}
          {menuOpen && (
            <div className="absolute right-0 top-8 z-20 w-44 rounded-lg bg-stashr-surface-elevated border border-stashr-border shadow-xl p-1 text-xs">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  if (onUpgrade) onUpgrade(id);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-stashr-surface-hover text-stashr-text-body"
              >
                <ArrowUpCircle className="w-3.5 h-3.5 text-stashr-primary-light" />
                Change Tier
              </button>
              <button
                onClick={handleStatusToggle}
                className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-stashr-surface-hover text-stashr-text-body"
              >
                {status === 'active' ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-stashr-status-pending" />
                    Pause Node
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-stashr-status-paid" />
                    Resume Node
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Specs */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="text-center p-2 rounded-lg bg-stashr-surface-input">
          <Cpu className="w-3.5 h-3.5 text-stashr-text-dim mx-auto mb-1" />
          <p className="text-[10px] text-stashr-text-dim">CPU</p>
          <p className="text-xs font-mono font-bold text-stashr-text-body">{cpu}%</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-stashr-surface-input">
          <HardDrive className="w-3.5 h-3.5 text-stashr-text-dim mx-auto mb-1" />
          <p className="text-[10px] text-stashr-text-dim">RAM</p>
          <p className="text-xs font-mono font-bold text-stashr-text-body">{ram}%</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-stashr-surface-input">
          <Wifi className="w-3.5 h-3.5 text-stashr-text-dim mx-auto mb-1" />
          <p className="text-[10px] text-stashr-text-dim">BW</p>
          <p className="text-xs font-mono font-bold text-stashr-text-body">{bandwidth}%</p>
        </div>
      </div>

      {/* Pricing */}
      <div className="flex items-end justify-between pt-4 border-t border-stashr-border">
        <div>
          <p className="text-xs text-stashr-text-dim font-mono">{spec}</p>
          <p className="text-xs text-stashr-text-muted mt-1">Renews: {renewDate}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl font-bold text-stashr-text-heading">{price}</p>
          <p className="text-xs text-stashr-text-dim">/{cycle}</p>
        </div>
      </div>
    </div>
  );
}
