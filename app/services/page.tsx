'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Server,
  Cpu,
  HardDrive,
  Wifi,
  ShieldCheck,
  Activity,
  Plus,
  RefreshCw,
  Power,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

const initialNodes = [
  {
    id: 'NODE-LON-01',
    name: 'Primary Game Compute Cluster',
    cpu: 'AMD Ryzen 9 7950X (16c / 32t @ 5.7GHz)',
    ram: '32 GB DDR5 ECC',
    storage: '1 TB NVMe Gen4',
    location: 'London, UK (LON-01)',
    ip: '194.26.182.44',
    status: 'ONLINE',
    cpuUsage: 42,
    ramUsage: 68,
    monthlyCost: 45.0,
    linkedInvoice: 'INV-2024-8891',
  },
  {
    id: 'NODE-FRA-02',
    name: 'Enterprise Database & Cache Cluster',
    cpu: 'Dual AMD EPYC 9654 (192 Cores / 384 Threads)',
    ram: '128 GB DDR5 RECC',
    storage: '2x 3.84TB Enterprise NVMe',
    location: 'Frankfurt, Germany (FRA-02)',
    ip: '185.107.56.91',
    status: 'ONLINE',
    cpuUsage: 58,
    ramUsage: 81,
    monthlyCost: 120.0,
    linkedInvoice: 'INV-2024-8890',
  },
  {
    id: 'NODE-NYC-01',
    name: 'US-East Production App Tier',
    cpu: 'Intel Xeon Platinum 8480+ (32 vCPU)',
    ram: '64 GB DDR5',
    storage: '800 GB NVMe PCIe 4.0',
    location: 'New York, USA (NYC-01)',
    ip: '198.51.100.25',
    status: 'ONLINE',
    cpuUsage: 29,
    ramUsage: 45,
    monthlyCost: 107.99,
    linkedInvoice: 'INV-2024-8889',
  },
  {
    id: 'NODE-EDGE-04',
    name: 'Anycast Global DDoS Scrubbing Shield',
    cpu: '34 Global Edge Points of Presence',
    ram: 'Distributed Edge RAM Pool',
    storage: '500 GB Edge Cache',
    location: 'Global Anycast BGP Tier',
    ip: '195.12.50.1',
    status: 'ONLINE',
    cpuUsage: 19,
    ramUsage: 33,
    monthlyCost: 14.99,
    linkedInvoice: 'INV-2024-8888',
  },
];

export default function ServicesPage() {
  const [nodes, setNodes] = useState(initialNodes);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const handleAction = (nodeId: string, action: string) => {
    setActionMessage(`Executing [${action}] on ${nodeId}...`);
    setTimeout(() => {
      setActionMessage(`Operation [${action}] completed on ${nodeId} successfully.`);
      setTimeout(() => setActionMessage(null), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[38px] leading-[42px] font-heading font-bold text-[#E0F9FF]">
            Cloud Nodes & Infrastructure
          </h2>
          <p className="text-sm text-[#8AB4F8] mt-1 font-body">
            High-performance bare-metal clusters, real-time metrics, and direct invoice routing.
          </p>
        </div>

        <button
          onClick={() => handleAction('GLOBAL', 'PROVISION_CLUSTER')}
          className="cyber-btn font-heading text-xs uppercase tracking-wider !py-3"
        >
          <Plus size={16} />
          <span>Deploy New Node</span>
        </button>
      </div>

      {actionMessage && (
        <div className="p-4 rounded-xl bg-[#00B8FF]/15 border border-[#00B8FF]/40 text-[#00B8FF] flex items-center gap-3 text-sm font-mono animate-fadeIn">
          <CheckCircle2 size={18} className="text-[#1BFF68]" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Infrastructure Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="cyber-card space-y-4 hover:border-[#00B8FF] transition-all relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1BFF68] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-[#00B8FF]">{node.id}</span>
                  <span className="text-xs font-mono text-[#8AB4F8]/60">({node.location})</span>
                </div>
                <h3 className="text-lg font-heading font-bold text-[#E0F9FF] mt-1">
                  {node.name}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-[#8AB4F8]">Cost / Month</span>
                <p className="text-lg font-heading font-bold text-[#1BFF68]">
                  ${node.monthlyCost.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Hardware Specs */}
            <div className="p-3.5 rounded-lg bg-[#171229] border border-[#073E91] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#E0F9FF]">
                <Cpu size={14} className="text-[#0AD3C5] flex-shrink-0" />
                <span className="truncate">{node.cpu}</span>
              </div>
              <div className="flex items-center gap-2 text-[#E0F9FF]">
                <Activity size={14} className="text-[#00B8FF] flex-shrink-0" />
                <span>{node.ram}</span>
              </div>
              <div className="flex items-center gap-2 text-[#E0F9FF]">
                <HardDrive size={14} className="text-[#8AB4F8] flex-shrink-0" />
                <span>{node.storage}</span>
              </div>
              <div className="flex items-center gap-2 text-[#E0F9FF]">
                <Wifi size={14} className="text-[#1BFF68] flex-shrink-0" />
                <span className="font-mono text-[#00B8FF]">{node.ip}</span>
              </div>
            </div>

            {/* Usage Gauges */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <div className="flex justify-between text-xs font-mono text-[#8AB4F8] mb-1">
                  <span>CPU Usage:</span>
                  <span className="text-[#E0F9FF] font-bold">{node.cpuUsage}%</span>
                </div>
                <div className="w-full bg-[#171229] h-2 rounded-full overflow-hidden border border-[#073E91]">
                  <div
                    className="bg-[#00B8FF] h-full rounded-full transition-all duration-500"
                    style={{ width: `${node.cpuUsage}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-[#8AB4F8] mb-1">
                  <span>RAM Usage:</span>
                  <span className="text-[#0AD3C5] font-bold">{node.ramUsage}%</span>
                </div>
                <div className="w-full bg-[#171229] h-2 rounded-full overflow-hidden border border-[#073E91]">
                  <div
                    className="bg-[#0AD3C5] h-full rounded-full transition-all duration-500"
                    style={{ width: `${node.ramUsage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-3 border-t border-[#073E91] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAction(node.id, 'SOFT_REBOOT')}
                  className="cyber-btn-secondary !p-2 text-xs"
                  title="Reboot Node"
                >
                  <RefreshCw size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleAction(node.id, 'POWER_CYCLE')}
                  className="cyber-btn-secondary !p-2 text-xs"
                  title="Power Cycle"
                >
                  <Power size={14} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/invoices/${node.linkedInvoice}`}
                  className="text-xs font-mono text-[#00B8FF] hover:underline flex items-center gap-1"
                >
                  <span>Invoice #{node.linkedInvoice}</span>
                  <ExternalLink size={12} />
                </Link>
                <Link
                  href={`/checkout?invoice=${node.linkedInvoice}&amount=${node.monthlyCost.toFixed(2)}`}
                  className="cyber-btn !py-1 !px-3 text-xs"
                >
                  Pay Node
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
