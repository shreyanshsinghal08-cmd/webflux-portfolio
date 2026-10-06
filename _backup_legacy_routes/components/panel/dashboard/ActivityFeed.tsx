'use client';

import { useState, useEffect } from 'react';
import { CreditCard, FileText, Server, User, AlertTriangle, Box, RefreshCw, MessageSquare } from 'lucide-react';
import { generateActivityItem } from '@/lib/live-data';

interface ActivityItem {
  id: string;
  icon: string;
  text: string;
  color: string;
  time: string;
}

const initialActivities: ActivityItem[] = [
  { id: '1', icon: 'credit', text: 'Payment of £44.99 received via Stripe', color: 'paid', time: 'Just now' },
  { id: '2', icon: 'invoice', text: 'Invoice INV-890 auto-generated for Sarah Chen', color: 'pending', time: '2m ago' },
  { id: '3', icon: 'server', text: 'Node Ryzen-Prod-01 health check passed', color: 'active', time: '5m ago' },
  { id: '4', icon: 'user', text: 'New signup: alex@gmail.com', color: 'info', time: '12m ago' },
  { id: '5', icon: 'alert', text: 'DDoS mitigation triggered on 185.24.67.112 — blocked', color: 'overdue', time: '25m ago' },
];

const iconMap: Record<string, React.ReactNode> = {
  credit: <CreditCard className="w-3.5 h-3.5" />,
  invoice: <FileText className="w-3.5 h-3.5" />,
  server: <Server className="w-3.5 h-3.5" />,
  user: <User className="w-3.5 h-3.5" />,
  alert: <AlertTriangle className="w-3.5 h-3.5" />,
  deploy: <Box className="w-3.5 h-3.5" />,
  renew: <RefreshCw className="w-3.5 h-3.5" />,
  ticket: <MessageSquare className="w-3.5 h-3.5" />,
};

const colorMap: Record<string, { bg: string; text: string }> = {
  paid: { bg: 'bg-status-paid/10', text: 'text-status-paid' },
  pending: { bg: 'bg-status-pending/10', text: 'text-status-pending' },
  active: { bg: 'bg-status-active/10', text: 'text-status-active' },
  info: { bg: 'bg-status-info/10', text: 'text-status-info' },
  overdue: { bg: 'bg-status-overdue/10', text: 'text-status-overdue' },
};

export default function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextItem = generateActivityItem();
      const newItem: ActivityItem = {
        id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        icon: nextItem.icon,
        text: nextItem.text,
        color: nextItem.color,
        time: 'Just now',
      };

      setActivities((prev) => [newItem, ...prev.slice(0, 9)]);
      setIsNew(true);
      setTimeout(() => setIsNew(false), 800);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-card">
      <div className="p-card-header">
        <h3 className="text-sm font-semibold text-txt-heading">Activity Log</h3>
        <div className="text-[10px] text-txt-dim font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-status-paid animate-pulse" />
          Real-time
        </div>
      </div>
      <div className="divide-y divide-border max-h-[380px] overflow-y-auto">
        {activities.map((a, i) => {
          const colors = colorMap[a.color] || colorMap.info;
          return (
            <div
              key={a.id}
              className={`flex items-start gap-3 px-4 py-3 transition-all duration-500 ${
                i === 0 && isNew ? 'bg-brand/5' : 'hover:bg-white/[0.02]'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center flex-shrink-0 mt-0.5`}
              >
                {iconMap[a.icon]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-txt-body leading-relaxed">{a.text}</p>
                <p className="text-[10px] text-txt-dim mt-0.5 font-mono">{a.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
