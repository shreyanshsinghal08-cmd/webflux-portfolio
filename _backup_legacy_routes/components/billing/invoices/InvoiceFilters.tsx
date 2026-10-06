'use client';

import { Search, X, Filter, RotateCcw } from 'lucide-react';
import type { InvoiceStatus } from '@/types/billing';

export interface InvoiceFilterState {
  search: string;
  status: InvoiceStatus | 'all';
  datePeriod: 'all' | 'last30' | 'last90' | 'thisYear';
  minAmount?: number;
  maxAmount?: number;
}

interface InvoiceFiltersProps {
  filters: InvoiceFilterState;
  onChange: (filters: InvoiceFilterState) => void;
  onReset: () => void;
}

const statusOptions: { label: string; value: InvoiceStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Paid', value: 'paid' },
  { label: 'Pending', value: 'pending' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function InvoiceFilters({
  filters,
  onChange,
  onReset,
}: InvoiceFiltersProps) {
  return (
    <div className="glass-card p-4 space-y-4">
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stashr-text-dim" />
          <input
            type="text"
            placeholder="Search by invoice number (e.g. STSH-2024-8891)..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="glass-input pl-10 pr-9 py-2.5 w-full text-sm font-mono"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ ...filters, search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stashr-text-dim hover:text-stashr-text-body"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Date Period Preset */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={filters.datePeriod}
            onChange={(e) =>
              onChange({
                ...filters,
                datePeriod: e.target.value as InvoiceFilterState['datePeriod'],
              })
            }
            className="glass-input py-2.5 px-3 text-xs w-full md:w-44 text-stashr-text-body"
          >
            <option value="all" className="bg-stashr-surface">All Periods</option>
            <option value="last30" className="bg-stashr-surface">Last 30 Days</option>
            <option value="last90" className="bg-stashr-surface">Last 90 Days</option>
            <option value="thisYear" className="bg-stashr-surface">Current Year (2024)</option>
          </select>

          {/* Reset Filters */}
          <button
            onClick={onReset}
            title="Reset Filters"
            className="p-2.5 rounded-lg bg-stashr-surface-elevated border border-stashr-border hover:bg-stashr-surface-hover text-stashr-text-dim hover:text-stashr-text-body transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex items-center gap-2 overflow-x-auto pt-1 border-t border-stashr-border/50">
        <span className="text-xs text-stashr-text-dim flex items-center gap-1.5 mr-2">
          <Filter className="w-3.5 h-3.5" /> Status:
        </span>
        {statusOptions.map((f) => {
          const isSelected = filters.status === f.value;
          return (
            <button
              key={f.value}
              onClick={() => onChange({ ...filters, status: f.value })}
              className={`
                px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 whitespace-nowrap
                ${
                  isSelected
                    ? 'bg-stashr-primary text-white shadow-glow-sm'
                    : 'bg-stashr-surface-elevated text-stashr-text-muted hover:text-stashr-text-body hover:bg-stashr-surface-hover'
                }
              `}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
