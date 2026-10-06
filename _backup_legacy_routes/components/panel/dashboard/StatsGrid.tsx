'use client';

import { useState, useEffect, useRef } from 'react';
import { DollarSign, FileText, Users, Server, TrendingUp, TrendingDown, Activity } from 'lucide-react';

function AnimatedCounter({ target, prefix = '', decimals = 0 }: { target: number; prefix?: string; decimals?: number }) {
  const [count, setCount] = useState(target);
  const prevTarget = useRef(target);

  useEffect(() => {
    const start = prevTarget.current;
    const diff = target - start;
    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = start + diff * ease;
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        prevTarget.current = target;
      }
    };

    requestAnimationFrame(animate);
  }, [target]);

  const formatted = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString();
  return <>{prefix}{formatted}</>;
}

export default function StatsGrid() {
  const [revenue, setRevenue] = useState(12847);
  const [pending, setPending] = useState(1249);
  const [clients, setClients] = useState(142);
  const [services, setServices] = useState(287);
  const [uptime, setUptime] = useState(99.98);
  const [requestsPerSec, setRequestsPerSec] = useState(1420);
  const [onlineClients, setOnlineClients] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevenue((prev) => prev + Math.floor(Math.random() * 15 + 2));
      setClients((prev) => prev + (Math.random() > 0.85 ? 1 : 0));
      setRequestsPerSec(Math.floor(Math.random() * 300) + 1200);
      setUptime(99.97 + Math.random() * 0.02);
      setOnlineClients(Math.floor(Math.random() * 5) + 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <div className="p-card group hover:border-brand/30 transition-all duration-300">
        <div className="p-card-body">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-status-paid/10 flex items-center justify-center text-status-paid">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-[11px] font-mono font-semibold text-status-paid bg-status-paid/10 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" /> +18.2%
            </span>
          </div>
          <p className="text-xs font-medium text-txt-muted mt-4">Total Revenue</p>
          <p className="text-2xl font-bold text-txt-heading font-mono mt-1 tracking-tight">
            <AnimatedCounter target={revenue} prefix="£" />
          </p>
          <p className="text-[11px] text-txt-dim mt-1.5 flex items-center gap-1 text-status-paid">
            +£{Math.floor(Math.random() * 100 + 80)} today
          </p>
        </div>
      </div>

      <div className="p-card group hover:border-status-pending/30 transition-all duration-300">
        <div className="p-card-body">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-status-pending/10 flex items-center justify-center text-status-pending">
              <FileText className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-[11px] font-mono font-semibold text-status-pending bg-status-pending/10 px-2 py-0.5 rounded-full">
              <TrendingDown className="w-3 h-3" /> -4.1%
            </span>
          </div>
          <p className="text-xs font-medium text-txt-muted mt-4">Pending Invoices</p>
          <p className="text-2xl font-bold text-txt-heading font-mono mt-1 tracking-tight">
            <AnimatedCounter target={pending} prefix="£" />
          </p>
          <p className="text-[11px] text-txt-dim mt-1.5">2 requiring payment</p>
        </div>
      </div>

      <div className="p-card group hover:border-brand/30 transition-all duration-300">
        <div className="p-card-body">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand-light">
              <Users className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-[11px] font-mono font-semibold text-brand-light bg-brand/10 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" /> +7.3%
            </span>
          </div>
          <p className="text-xs font-medium text-txt-muted mt-4">Active Clients</p>
          <p className="text-2xl font-bold text-txt-heading font-mono mt-1 tracking-tight">
            <AnimatedCounter target={clients} />
          </p>
          <p className="text-[11px] text-txt-dim mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            {onlineClients} online now
          </p>
        </div>
      </div>

      <div className="p-card group hover:border-brand-cyan/30 transition-all duration-300">
        <div className="p-card-body">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
              <Server className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-[11px] font-mono font-semibold text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded-full">
              <Activity className="w-3 h-3" /> <AnimatedCounter target={uptime} decimals={2} />%
            </span>
          </div>
          <p className="text-xs font-medium text-txt-muted mt-4">Active Services</p>
          <p className="text-2xl font-bold text-txt-heading font-mono mt-1 tracking-tight">
            <AnimatedCounter target={services} />
          </p>
          <p className="text-[11px] text-txt-dim mt-1.5">{requestsPerSec.toLocaleString()} req/s</p>
        </div>
      </div>
    </div>
  );
}
