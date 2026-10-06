'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Receipt,
  Search,
  Filter,
  Plus,
  ArrowUpRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  Download,
  CreditCard,
  X,
  FileText,
} from 'lucide-react';
import { InvoiceItem } from '@/lib/invoicesData';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending' | 'Overdue'>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Invoice Form State
  const [newClient, setNewClient] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newService, setNewService] = useState('Dedicated Cloud Compute Node');
  const [newAmount, setNewAmount] = useState('75.00');
  const [newDueDate, setNewDueDate] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchInvoices = () => {
    setLoading(true);
    fetch('/api/invoices')
      .then((res) => res.json())
      .then((data) => {
        if (data.invoices) setInvoices(data.invoices);
      })
      .catch((err) => console.error('Error fetching invoices:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.service.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchTerm, statusFilter]);

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient || !newService || !newAmount) return;

    setCreating(true);
    try {
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: newClient,
          email: newEmail,
          service: newService,
          amount: parseFloat(newAmount),
          dueDate: newDueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        }),
      });

      if (res.ok) {
        setShowCreateModal(false);
        setNewClient('');
        setNewEmail('');
        fetchInvoices();
      }
    } catch (err) {
      console.error('Failed to create invoice:', err);
    } finally {
      setCreating(false);
    }
  };

  // Financial aggregates
  const totalVolume = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidVolume = invoices
    .filter((inv) => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const pendingVolume = invoices
    .filter((inv) => inv.status === 'Pending' || inv.status === 'Overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[38px] leading-[42px] font-heading font-bold text-[#E0F9FF]">
            Invoices & Billing
          </h2>
          <p className="text-sm text-[#8AB4F8] mt-1 font-body">
            Manage infrastructure invoices, track payment states, and execute instant settlements.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="cyber-btn font-heading text-xs uppercase tracking-wider !py-3"
        >
          <Plus size={16} />
          <span>Create Invoice</span>
        </button>
      </div>

      {/* Financial Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="cyber-card p-4">
          <p className="text-xs font-mono text-[#8AB4F8]">Total Invoiced Volume</p>
          <p className="text-2xl font-heading font-bold text-[#E0F9FF] mt-1">
            ${totalVolume.toFixed(2)}
          </p>
        </div>
        <div className="cyber-card p-4">
          <p className="text-xs font-mono text-[#8AB4F8]">Settled & Paid</p>
          <p className="text-2xl font-heading font-bold text-[#1BFF68] mt-1">
            ${paidVolume.toFixed(2)}
          </p>
        </div>
        <div className="cyber-card p-4">
          <p className="text-xs font-mono text-[#8AB4F8]">Pending Settlement</p>
          <p className="text-2xl font-heading font-bold text-amber-400 mt-1">
            ${pendingVolume.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="cyber-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8AB4F8]" />
          <input
            type="text"
            placeholder="Search by ID, client, or node..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="cyber-input !pl-9 !py-2 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-mono text-[#8AB4F8] mr-1 hidden sm:inline">Filter:</span>
          {(['All', 'Pending', 'Paid', 'Overdue'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                statusFilter === tab
                  ? 'bg-[#00B8FF] text-[#171229] font-bold shadow-neon-glow'
                  : 'bg-[#171229] text-[#8AB4F8] hover:text-[#E0F9FF] border border-[#073E91]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Invoices Table Card */}
      <div className="cyber-card p-0 overflow-hidden border border-[#073E91]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#171229] border-b border-[#073E91]">
                <th className="px-6 py-4 font-mono text-xs uppercase text-[#8AB4F8] font-semibold">
                  Invoice ID
                </th>
                <th className="px-6 py-4 font-mono text-xs uppercase text-[#8AB4F8] font-semibold">
                  Client / Entity
                </th>
                <th className="px-6 py-4 font-mono text-xs uppercase text-[#8AB4F8] font-semibold">
                  Service Description
                </th>
                <th className="px-6 py-4 font-mono text-xs uppercase text-[#8AB4F8] font-semibold">
                  Due Date
                </th>
                <th className="px-6 py-4 font-mono text-xs uppercase text-[#8AB4F8] font-semibold">
                  Amount
                </th>
                <th className="px-6 py-4 font-mono text-xs uppercase text-[#8AB4F8] font-semibold">
                  Status
                </th>
                <th className="px-6 py-4 font-mono text-xs uppercase text-[#8AB4F8] font-semibold text-right">
                  Settlement
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#073E91]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#8AB4F8] font-mono">
                    Querying cryptographic ledger...
                  </td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#8AB4F8] font-body">
                    No matching invoices located in database.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#073E91]/20 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-[#00B8FF] font-semibold">
                      <Link href={`/invoices/${inv.id}`} className="hover:underline">
                        #{inv.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-body">
                      <p className="text-sm font-medium text-[#E0F9FF]">{inv.client}</p>
                      <p className="text-xs text-[#8AB4F8]/70 font-mono mt-0.5">{inv.email}</p>
                    </td>
                    <td className="px-6 py-4 font-body text-xs text-[#E0F9FF]">
                      {inv.service}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-[#8AB4F8]">
                      {inv.dueDate}
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-sm text-[#E0F9FF]">
                      ${inv.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          inv.status === 'Paid'
                            ? 'bg-[#1BFF68]/20 text-[#1BFF68] border border-[#1BFF68]/40'
                            : inv.status === 'Pending'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : 'bg-red-500/20 text-red-400 border border-red-500/40'
                        }`}
                      >
                        {inv.status === 'Paid' && <CheckCircle2 size={12} />}
                        {inv.status === 'Pending' && <Clock size={12} />}
                        {inv.status === 'Overdue' && <AlertCircle size={12} />}
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {inv.status === 'Paid' ? (
                        <Link
                          href={`/invoices/${inv.id}`}
                          className="cyber-btn-secondary text-xs !py-1.5 !px-3 font-mono inline-flex items-center gap-1"
                        >
                          <FileText size={12} />
                          <span>View PDF</span>
                        </Link>
                      ) : (
                        <Link
                          href={`/checkout?invoice=${inv.id}&amount=${inv.amount.toFixed(2)}`}
                          className="cyber-btn text-xs !py-1.5 !px-3 font-heading uppercase tracking-wider inline-flex items-center gap-1"
                        >
                          <CreditCard size={12} />
                          <span>Pay Now</span>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-[#171229]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="cyber-card w-full max-w-lg relative border-[#00B8FF] shadow-neon">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-[#8AB4F8] hover:text-[#E0F9FF]"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-[#00B8FF] text-[#171229] flex items-center justify-center">
                <Receipt size={20} />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-[#E0F9FF]">
                  Issue New Cloud Invoice
                </h3>
                <p className="text-xs text-[#8AB4F8]">
                  Generate a billable item for compute or enterprise bandwidth
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#8AB4F8] mb-1">Client Name / Org</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Systems Ltd."
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  className="cyber-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8AB4F8] mb-1">Billing Email</label>
                <input
                  type="email"
                  placeholder="e.g. finance@apexsystems.io"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="cyber-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8AB4F8] mb-1">Service Provisioned</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AMD Ryzen 9 7950X - 64GB Node"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="cyber-input text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#8AB4F8] mb-1">Amount ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="75.00"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="cyber-input text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#8AB4F8] mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="cyber-input text-sm font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#073E91]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="cyber-btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="cyber-btn text-xs font-heading uppercase tracking-wider"
                >
                  {creating ? 'Issuing...' : 'Issue Invoice Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
