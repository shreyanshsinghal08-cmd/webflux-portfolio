'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

type PeriodType = '6m' | '1y' | 'all';

interface PeriodDataset {
  growth: string;
  data: { month: string; revenue: number }[];
}

const periodDatasets: Record<PeriodType, PeriodDataset> = {
  '6m': {
    growth: '+18.2%',
    data: [
      { month: 'Jun', revenue: 8200 },
      { month: 'Jul', revenue: 9400 },
      { month: 'Aug', revenue: 8800 },
      { month: 'Sep', revenue: 10200 },
      { month: 'Oct', revenue: 11500 },
      { month: 'Nov', revenue: 12847 },
    ],
  },
  '1y': {
    growth: '+34.5%',
    data: [
      { month: 'Dec', revenue: 6800 },
      { month: 'Jan', revenue: 7200 },
      { month: 'Feb', revenue: 7500 },
      { month: 'Mar', revenue: 7900 },
      { month: 'Apr', revenue: 8100 },
      { month: 'May', revenue: 8400 },
      { month: 'Jun', revenue: 8200 },
      { month: 'Jul', revenue: 9400 },
      { month: 'Aug', revenue: 8800 },
      { month: 'Sep', revenue: 10200 },
      { month: 'Oct', revenue: 11500 },
      { month: 'Nov', revenue: 12847 },
    ],
  },
  'all': {
    growth: '+142.8%',
    data: [
      { month: '2021', revenue: 32000 },
      { month: '2022', revenue: 54000 },
      { month: '2023', revenue: 86000 },
      { month: 'Q1 24', revenue: 22600 },
      { month: 'Q2 24', revenue: 26000 },
      { month: 'Q3 24', revenue: 29200 },
      { month: 'Q4 24', revenue: 34347 },
    ],
  },
};

export default function RevenueChart() {
  const [period, setPeriod] = useState<PeriodType>('6m');
  const [data, setData] = useState(periodDatasets['6m'].data);
  const [growth, setGrowth] = useState(periodDatasets['6m'].growth);
  const [liveTotal, setLiveTotal] = useState(() =>
    periodDatasets['6m'].data.reduce((sum, item) => sum + item.revenue, 0)
  );

  const handlePeriodChange = (newPeriod: PeriodType) => {
    setPeriod(newPeriod);
    const selected = periodDatasets[newPeriod];
    setData(selected.data);
    setGrowth(selected.growth);
    setLiveTotal(selected.data.reduce((sum, item) => sum + item.revenue, 0));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTotal(prev => prev + Math.floor(Math.random() * 25 + 5));
      setData(prev => {
        const updated = [...prev];
        const last = { ...updated[updated.length - 1] };
        last.revenue = Math.max(1000, last.revenue + Math.floor(Math.random() * 40 - 10));
        updated[updated.length - 1] = last;
        return updated;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [period]);

  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <div className="p-card">
      <div className="p-card-header">
        <div>
          <h3 className="text-sm font-semibold text-txt-heading">Revenue Overview</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold text-txt-heading font-mono">£{liveTotal.toLocaleString()}</span>
            <span className="flex items-center gap-0.5 text-[11px] font-mono font-semibold text-status-paid bg-status-paid/10 px-1.5 py-0.5 rounded">
              <ArrowUpRight className="w-3 h-3" /> {growth}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-panel-input rounded-lg p-0.5 border border-border">
          {(['6m', '1y', 'all'] as const).map(p => (
            <button
              key={p}
              type="button"
              onClick={() => handlePeriodChange(p)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all duration-150 cursor-pointer active:scale-95 ${
                period === p
                  ? 'bg-brand text-white shadow-sm'
                  : 'text-txt-muted hover:text-txt-body hover:bg-panel-hover'
              }`}
              title={`Switch to ${p === '6m' ? '6 Months' : p === '1y' ? '1 Year' : 'All Time'} revenue`}
            >
              {p === '6m' ? '6M' : p === '1y' ? '1Y' : 'All'}
            </button>
          ))}
        </div>
      </div>
      <div className="p-card-body">
        <div className="flex items-end gap-3 h-48">
          {data.map((d, i) => {
            const heightPx = Math.max(12, (d.revenue / maxRevenue) * 140);
            const isLast = i === data.length - 1;
            return (
              <div key={d.month} className="flex-1 flex flex-col items-center justify-end gap-1.5 h-full">
                <span className="text-[9px] font-mono text-txt-dim">
                  £{(d.revenue / 1000).toFixed(1)}k
                </span>
                <div
                  className={`w-full max-w-[40px] rounded-t-md transition-all duration-700 ease-out ${
                    isLast
                      ? 'bg-gradient-to-t from-brand to-brand-cyan shadow-glow-purple'
                      : 'bg-gradient-to-t from-brand/50 to-brand/20'
                  }`}
                  style={{ height: `${heightPx}px` }}
                />
                <span className={`text-[10px] font-medium whitespace-nowrap ${isLast ? 'text-brand-light font-bold' : 'text-txt-muted'}`}>
                  {d.month}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-brand" />
              <span className="text-[11px] text-txt-muted">Historical</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-brand-cyan" />
              <span className="text-[11px] text-txt-muted">Current (Live)</span>
            </div>
          </div>
          <span className="text-[10px] text-txt-dim font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
            Updating live
          </span>
        </div>
      </div>
    </div>
  );
}
