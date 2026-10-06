'use client';

import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="glass-card flex flex-col items-center justify-center p-12 text-center my-4">
      <div className="w-14 h-14 rounded-2xl bg-stashr-surface-elevated border border-stashr-border flex items-center justify-center text-stashr-primary-light mb-4 shadow-glow-sm">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-stashr-text-heading mb-1">{title}</h3>
      <p className="text-sm text-stashr-text-dim max-w-sm mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary text-sm"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
