'use client';

import { ReactNode } from 'react';

interface DataCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  trend?: { value: string; positive: boolean };
  accentColor?: 'violet' | 'cyan' | 'green' | 'amber' | 'red';
}

const accentMap = {
  violet: {
    bg: 'bg-stashr-primary/10',
    text: 'text-stashr-primary-light',
    glow: 'shadow-glow-sm',
  },
  cyan: {
    bg: 'bg-stashr-primary-cyan/10',
    text: 'text-stashr-primary-cyan',
    glow: 'shadow-glow-cyan',
  },
  green: {
    bg: 'bg-stashr-status-paid/10',
    text: 'text-stashr-status-paid',
    glow: '',
  },
  amber: {
    bg: 'bg-stashr-status-pending/10',
    text: 'text-stashr-status-pending',
    glow: '',
  },
  red: {
    bg: 'bg-stashr-status-overdue/10',
    text: 'text-stashr-status-overdue',
    glow: '',
  },
};

export default function DataCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  accentColor = 'violet',
}: DataCardProps) {
  const accent = accentMap[accentColor] || accentMap.violet;

  return (
    <div className={`glass-card-hover p-6 group ${accent.glow}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg ${accent.bg} flex items-center justify-center ${accent.text}`}>
          {icon}
        </div>
        {trend && (
          <span
            className={`text-xs font-mono font-semibold px-2 py-1 rounded-md ${
              trend.positive
                ? 'bg-stashr-status-paid/10 text-stashr-status-paid'
                : 'bg-stashr-status-overdue/10 text-stashr-status-overdue'
            }`}
          >
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>

      <p className="text-sm text-stashr-text-muted font-medium">{title}</p>
      <p className="text-2xl font-bold text-stashr-text-heading font-mono mt-1 tracking-tight">
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-stashr-text-dim mt-2">{subtitle}</p>
      )}
    </div>
  );
}
