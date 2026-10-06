'use client';

import Link from 'next/link';
import { Server, Clock, ArrowRight } from 'lucide-react';

interface RenewalItem {
  nodeName: string;
  nodeSpec: string;
  nodeIp: string;
  renewDate: string;
  amount: string;
  daysLeft: number;
}

const renewals: RenewalItem[] = [
  {
    nodeName: 'Minecraft-Prod-01',
    nodeSpec: 'Ryzen 9 7950X // 32GB',
    nodeIp: '185.24.67.112',
    renewDate: 'Dec 1, 2024',
    amount: '£44.99',
    daysLeft: 3,
  },
  {
    nodeName: 'VPS-London-02',
    nodeSpec: 'EPYC 9454 // 16GB',
    nodeIp: '185.24.67.204',
    renewDate: 'Dec 8, 2024',
    amount: '£24.99',
    daysLeft: 10,
  },
  {
    nodeName: 'Discord-Bot-Host',
    nodeSpec: 'i9-13900K // 8GB',
    nodeIp: '185.24.67.89',
    renewDate: 'Dec 15, 2024',
    amount: '£14.99',
    daysLeft: 17,
  },
];

export default function UpcomingRenewals() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="section-heading flex items-center gap-2">
          <Clock className="w-5 h-5 text-stashr-primary-cyan" />
          Upcoming Renewals
        </h3>
        <Link
          href="/subscriptions"
          className="text-xs text-stashr-primary-light hover:text-stashr-primary font-medium flex items-center gap-1 transition-colors duration-200"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-3">
        {renewals.map((renewal, index) => (
          <Link
            key={index}
            href="/subscriptions"
            className="flex items-center justify-between p-4 rounded-lg bg-stashr-surface-elevated/50 border border-stashr-border hover:bg-stashr-surface-elevated hover:border-stashr-border-hover transition-all duration-200 group cursor-pointer block"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-stashr-primary/10 flex items-center justify-center">
                <Server className="w-5 h-5 text-stashr-primary-light" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stashr-text-heading">{renewal.nodeName}</p>
                <p className="text-xs text-stashr-text-dim font-mono mt-0.5">
                  {renewal.nodeSpec} • {renewal.nodeIp}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs text-stashr-text-muted">{renewal.renewDate}</p>
                <p
                  className={`text-xs font-mono font-bold mt-0.5 ${
                    renewal.daysLeft <= 5
                      ? 'text-stashr-status-overdue'
                      : renewal.daysLeft <= 10
                      ? 'text-stashr-status-pending'
                      : 'text-stashr-text-body'
                  }`}
                >
                  {renewal.daysLeft} days left
                </p>
              </div>
              <p className="font-mono text-lg font-bold text-stashr-text-heading">
                {renewal.amount}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
