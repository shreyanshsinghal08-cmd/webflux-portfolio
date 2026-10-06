'use client';

interface LoadingSkeletonProps {
  type?: 'card' | 'row' | 'table';
  count?: number;
}

export default function LoadingSkeleton({
  type = 'card',
  count = 3,
}: LoadingSkeletonProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((i) => (
          <div
            key={i}
            className="glass-card p-6 animate-pulse space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="w-10 h-10 rounded-lg bg-stashr-surface-elevated" />
              <div className="w-16 h-5 rounded-md bg-stashr-surface-elevated" />
            </div>
            <div className="w-24 h-4 rounded bg-stashr-surface-elevated" />
            <div className="w-36 h-8 rounded bg-stashr-surface-elevated" />
            <div className="w-48 h-3 rounded bg-stashr-surface-elevated" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'row') {
    return (
      <div className="space-y-3">
        {items.map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-lg bg-stashr-surface-elevated/40 border border-stashr-border animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-stashr-surface-elevated" />
              <div className="space-y-2">
                <div className="w-32 h-4 rounded bg-stashr-surface-elevated" />
                <div className="w-24 h-3 rounded bg-stashr-surface-elevated" />
              </div>
            </div>
            <div className="w-16 h-6 rounded bg-stashr-surface-elevated" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="glass-card p-6 animate-pulse space-y-4">
      <div className="h-6 w-1/4 rounded bg-stashr-surface-elevated" />
      <div className="space-y-2">
        {items.map((i) => (
          <div key={i} className="h-10 rounded bg-stashr-surface-elevated/60" />
        ))}
      </div>
    </div>
  );
}
