'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import PanelShell from '@/components/panel/layout/PanelShell';
import StatusBadge from '@/components/panel/shared/StatusBadge';
import Pagination from '@/components/panel/shared/Pagination';
import { Plus, Search, Filter, ArrowUpRight, Clock, AlertTriangle, CheckCircle2, Eye, Download } from 'lucide-react';

interface InvoiceListItem {
  id: string;
  number: string;
  client: string;
  email: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
}

const allInvoices: InvoiceListItem[] = [
  {
    id: '1',
    number: 'INV-0891',
    client: 'Alex Thompson',
    email: 'alex.thompson@hyperion-games.io',
    issueDate: '01 Nov 2024',
    dueDate: '08 Nov 2024',
    amount: 53.99,
    status: 'paid',
  },
  {
    id: '2',
    number: 'INV-0890',
    client: 'Sarah Chen',
    email: 'sarah@chentechnologies.com',
    issueDate: '28 Oct 2024',
    dueDate: '04 Nov 2024',
    amount: 29.99,
    status: 'pending',
  },
  {
    id: '3',
    number: 'INV-0889',
    client: 'Marcus Webb',
    email: 'marcus.webb@nexuscube.org',
    issueDate: '15 Oct 2024',
    dueDate: '22 Oct 2024',
    amount: 107.99,
    status: 'overdue',
  },
  {
    id: '4',
    number: 'INV-0888',
    client: 'Priya Patel',
    email: 'priya@zenithhosting.uk',
    issueDate: '10 Oct 2024',
    dueDate: '17 Oct 2024',
    amount: 14.99,
    status: 'paid',
  },
  {
    id: '5',
    number: 'INV-0887',
    client: "James O'Brien",
    email: 'james@valkyriegames.net',
    issueDate: '02 Oct 2024',
    dueDate: '09 Oct 2024',
    amount: 59.99,
    status: 'draft',
  },
  {
    id: '6',
    number: 'INV-0886',
    client: 'Elena Rostova',
    email: 'elena@novatech-infra.de',
    issueDate: '25 Sep 2024',
    dueDate: '02 Oct 2024',
    amount: 89.99,
    status: 'paid',
  },
];

export default function InvoicesListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'overdue' | 'draft'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredInvoices = useMemo(() => {
    return allInvoices.filter((inv) => {
      const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        inv.number.toLowerCase().includes(query) ||
        inv.client.toLowerCase().includes(query) ||
        inv.email.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / itemsPerPage));
  const displayedInvoices = filteredInvoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = useMemo(() => {
    const total = allInvoices.reduce((acc, curr) => acc + curr.amount, 0);
    const paid = allInvoices.filter((i) => i.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0);
    const pending = allInvoices.filter((i) => i.status === 'pending').reduce((acc, curr) => acc + curr.amount, 0);
    const overdue = allInvoices.filter((i) => i.status === 'overdue').reduce((acc, curr) => acc + curr.amount, 0);
    return { total, paid, pending, overdue };
  }, []);

  return (
    <PanelShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-txt-heading">Invoices</h1>
            <p className="text-sm text-txt-muted mt-0.5">Manage, track, and generate customer infrastructure invoices</p>
          </div>
          <Link
            href="/invoices/create"
            className="p-btn-primary shadow-glow-purple self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Create Invoice
          </Link>
        </div>

        {/* Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-card p-4">
            <span className="text-xs text-txt-dim font-medium uppercase tracking-wider">Total Invoiced</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-xl font-bold font-mono text-txt-heading">£{stats.total.toFixed(2)}</span>
              <span className="text-xs font-mono text-txt-muted">6 total</span>
            </div>
          </div>
          <div className="p-card p-4">
            <span className="text-xs text-status-paid font-medium uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Settled / Paid
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-xl font-bold font-mono text-status-paid">£{stats.paid.toFixed(2)}</span>
              <span className="text-xs font-mono text-status-paid/80">3 paid</span>
            </div>
          </div>
          <div className="p-card p-4">
            <span className="text-xs text-status-pending font-medium uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Pending Payment
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-xl font-bold font-mono text-status-pending">£{stats.pending.toFixed(2)}</span>
              <span className="text-xs font-mono text-status-pending/80">1 pending</span>
            </div>
          </div>
          <div className="p-card p-4">
            <span className="text-xs text-status-overdue font-medium uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Overdue
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-xl font-bold font-mono text-status-overdue">£{stats.overdue.toFixed(2)}</span>
              <span className="text-xs font-mono text-status-overdue/80">1 overdue</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-card p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-txt-dim" />
            <input
              type="text"
              placeholder="Search by invoice #, client, or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="p-input !pl-9"
            />
          </div>

          <div className="flex items-center gap-1 bg-panel-input rounded-lg p-1 overflow-x-auto border border-border">
            {(['all', 'paid', 'pending', 'overdue', 'draft'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setStatusFilter(filter);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md capitalize transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                  statusFilter === filter
                    ? 'bg-brand text-white shadow-sm'
                    : 'text-txt-muted hover:text-txt-body hover:bg-panel-hover'
                }`}
              >
                {filter === 'all' ? 'All Invoices' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Invoices Table */}
        <div className="p-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="p-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Client</th>
                  <th>Issued</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {displayedInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-txt-muted text-sm">
                      No invoices found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  displayedInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-panel-hover/50 transition-colors">
                      <td className="font-mono font-semibold text-txt-heading">
                        <Link
                          href={`/invoices/${inv.id}`}
                          className="hover:text-brand-light transition-colors inline-flex items-center gap-1.5"
                        >
                          {inv.number}
                        </Link>
                      </td>
                      <td>
                        <p className="font-medium text-txt-heading text-sm">{inv.client}</p>
                        <p className="text-xs text-txt-muted font-mono">{inv.email}</p>
                      </td>
                      <td className="text-txt-muted text-xs font-mono">{inv.issueDate}</td>
                      <td className="text-txt-muted text-xs font-mono">{inv.dueDate}</td>
                      <td className="font-mono font-bold text-txt-heading text-sm">
                        £{inv.amount.toFixed(2)}
                      </td>
                      <td>
                        <StatusBadge status={inv.status} />
                      </td>
                      <td className="text-right">
                        <Link
                          href={`/invoices/${inv.id}`}
                          className="p-btn-secondary !py-1 !px-2.5 text-xs inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </PanelShell>
  );
}
