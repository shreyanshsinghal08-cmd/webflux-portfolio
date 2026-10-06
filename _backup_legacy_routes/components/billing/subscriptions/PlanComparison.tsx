'use client';

import { Check, Zap, Server, Shield } from 'lucide-react';
import type { SubscriptionTier } from '@/types/billing';

interface PlanComparisonProps {
  currentTier?: SubscriptionTier;
  onSelectPlan?: (tier: SubscriptionTier, price: number) => void;
}

interface TierDefinition {
  id: SubscriptionTier;
  name: string;
  priceMonthly: number;
  highlighted?: boolean;
  tagline: string;
  features: string[];
  specs: {
    cpu: string;
    ram: string;
    nvme: string;
    bandwidth: string;
    ipv4: string;
    sla: string;
  };
}

const tiers: TierDefinition[] = [
  {
    id: 'starter',
    name: 'Starter Node',
    priceMonthly: 24.99,
    tagline: 'Ideal for lightweight microservices, Discord bots, and staging.',
    features: [
      'Up to 1Gbps unmetered pipeline',
      'Daily automated backup snapshots',
      'Standard Corero DDoS mitigation',
      'Instant deployment in LON-01',
    ],
    specs: {
      cpu: '4 Dedicated vCPU (Ryzen 7000)',
      ram: '16GB DDR5 5200MHz ECC',
      nvme: '250GB Gen4 NVMe',
      bandwidth: '10 TB Outbound / Unmetered In',
      ipv4: '1 Dedicated IPv4 + /64 IPv6',
      sla: '99.9% Hardware SLA',
    },
  },
  {
    id: 'performance',
    name: 'Performance Node',
    priceMonthly: 44.99,
    highlighted: true,
    tagline: 'Fintech grade throughput for high-concurrency game & compute servers.',
    features: [
      'Priority routing over StashrFabric',
      'Hourly snapshot redundancy',
      'Layer-7 custom DDoS mitigation shield',
      '24/7 dedicated tier-3 engineer SLA',
    ],
    specs: {
      cpu: '8 Dedicated vCPU (Ryzen 9 7950X)',
      ram: '32GB DDR5 5600MHz ECC',
      nvme: '500GB Enterprise PCIe 5.0',
      bandwidth: '25 TB Outbound / Unmetered In',
      ipv4: '2 Dedicated IPv4 + /64 IPv6',
      sla: '99.99% Guaranteed SLA',
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise Dedicated',
    priceMonthly: 89.99,
    tagline: 'Bare-metal performance with isolated hardware hypervisor control.',
    features: [
      'Dedicated 10Gbps private VLAN port',
      'Continuous hardware telemetry',
      'BGP Anycast routing enabled',
      'Custom ISO & direct IPMI console',
    ],
    specs: {
      cpu: '16 Cores / 32 Threads (EPYC 9454)',
      ram: '64GB DDR5 4800MHz Reg ECC',
      nvme: '2x 1TB NVMe RAID-1 Array',
      bandwidth: '50 TB Outbound / 10Gbps Uplink',
      ipv4: '4 Dedicated IPv4 + /48 IPv6',
      sla: '99.999% High Availability SLA',
    },
  },
];

export default function PlanComparison({
  currentTier = 'starter',
  onSelectPlan,
}: PlanComparisonProps) {
  return (
    <div className="glass-card p-6 md:p-8 space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h3 className="section-heading text-2xl flex items-center justify-center gap-2">
          <Server className="w-6 h-6 text-stashr-primary-cyan" />
          Infrastructure Tier Matrix
        </h3>
        <p className="text-sm text-stashr-text-muted">
          Scale bare-metal thread performance, dedicated RAM, and transit pipelines on demand with zero downtime.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        {tiers.map((t) => {
          const isCurrent = currentTier === t.id;

          return (
            <div
              key={t.id}
              className={`
                relative rounded-xl p-6 flex flex-col justify-between transition-all duration-300
                ${
                  t.highlighted
                    ? 'bg-stashr-surface-elevated/90 border-2 border-stashr-primary shadow-glow-md'
                    : 'bg-stashr-surface-elevated/40 border border-stashr-border hover:border-stashr-border-hover'
                }
              `}
            >
              {t.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-stashr-primary text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-glow-sm">
                  Recommended Tier
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-bold text-stashr-text-heading">{t.name}</h4>
                  {isCurrent && (
                    <span className="status-badge bg-stashr-primary/10 text-stashr-primary-light border-stashr-primary/20 text-[10px]">
                      CURRENT
                    </span>
                  )}
                </div>

                <p className="text-xs text-stashr-text-dim mb-4 leading-relaxed min-h-[36px]">
                  {t.tagline}
                </p>

                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-stashr-border">
                  <span className="font-mono text-3xl font-extrabold text-stashr-text-heading">
                    £{t.priceMonthly.toFixed(2)}
                  </span>
                  <span className="text-xs text-stashr-text-dim">/ month</span>
                </div>

                {/* Specs Box */}
                <div className="space-y-2.5 mb-6 text-xs font-mono">
                  <div className="flex justify-between text-stashr-text-muted">
                    <span className="text-stashr-text-dim">CPU:</span>
                    <span className="text-stashr-text-body font-semibold">{t.specs.cpu}</span>
                  </div>
                  <div className="flex justify-between text-stashr-text-muted">
                    <span className="text-stashr-text-dim">RAM:</span>
                    <span className="text-stashr-text-body font-semibold">{t.specs.ram}</span>
                  </div>
                  <div className="flex justify-between text-stashr-text-muted">
                    <span className="text-stashr-text-dim">NVMe:</span>
                    <span className="text-stashr-text-body font-semibold">{t.specs.nvme}</span>
                  </div>
                  <div className="flex justify-between text-stashr-text-muted">
                    <span className="text-stashr-text-dim">Bandwidth:</span>
                    <span className="text-stashr-text-body font-semibold">{t.specs.bandwidth}</span>
                  </div>
                  <div className="flex justify-between text-stashr-text-muted">
                    <span className="text-stashr-text-dim">Uplink:</span>
                    <span className="text-stashr-text-body font-semibold">{t.specs.ipv4}</span>
                  </div>
                </div>

                {/* Included Features */}
                <div className="space-y-2 mb-6">
                  {t.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stashr-text-muted">
                      <Check className="w-3.5 h-3.5 text-stashr-status-paid flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  disabled={isCurrent}
                  onClick={() => onSelectPlan && onSelectPlan(t.id, t.priceMonthly)}
                  className={`
                    w-full py-2.5 text-xs font-semibold rounded-lg transition-all duration-200 active:scale-[0.97]
                    ${
                      isCurrent
                        ? 'bg-stashr-surface-input text-stashr-text-dim border border-stashr-border cursor-not-allowed'
                        : t.highlighted
                        ? 'btn-primary'
                        : 'btn-secondary'
                    }
                  `}
                >
                  {isCurrent ? 'Current Plan' : `Switch to ${t.name}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
