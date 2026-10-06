'use client';

import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: { value: string; positive: boolean };
  icon: ReactNode;
  iconColor: string;
  iconBg: string;
}

export default function StatCard({ title, value, change, icon, iconColor, iconBg }: StatCardProps) {
  return (
    <div className="p-card">
      <div className="p-card-body flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-txt-muted">{title}</p>
          <p className="text-2xl font-bold text-txt-heading font-mono mt-1 tracking-tight">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${change.positive ? 'text-status-paid' : 'text-status-overdue'}`}>
              {change.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {change.value} from last month
            </div>
          )}
        </div>
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
