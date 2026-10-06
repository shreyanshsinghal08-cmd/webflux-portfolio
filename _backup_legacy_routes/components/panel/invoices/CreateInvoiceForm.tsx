'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, ArrowLeft, Check, FilePlus2 } from 'lucide-react';

interface FormItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export default function CreateInvoiceForm() {
  const router = useRouter();
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [issueDate, setIssueDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [status, setStatus] = useState<'pending' | 'draft' | 'paid'>('pending');

  const [items, setItems] = useState<FormItem[]>([
    {
      id: '1',
      description: 'AMD EPYC 9454 Cloud VPS - 8 vCPU / 32GB RAM (London LHR-01)',
      quantity: 1,
      unitPrice: 24.99,
    },
  ]);

  const [taxRate, setTaxRate] = useState<number>(20);
  const [discount, setDiscount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        description: '',
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof FormItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const total = Math.max(0, subtotal + taxAmount - discount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/invoices');
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/invoices" className="p-btn-ghost text-xs mb-2 inline-flex">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Invoices
          </Link>
          <h1 className="text-xl font-bold text-txt-heading">Create New Invoice</h1>
          <p className="text-sm text-txt-muted mt-0.5">Generate a billing invoice for infrastructure and cloud services</p>
        </div>
      </div>

      {/* General Details Card */}
      <div className="p-card">
        <div className="p-card-header">
          <h3 className="text-sm font-semibold text-txt-heading">Client & Invoice Details</h3>
          <span className="text-xs text-txt-dim font-mono">Auto-assign: INV-0892</span>
        </div>
        <div className="p-card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="p-label">Client Name</label>
              <input
                type="text"
                className="p-input"
                placeholder="e.g. Alex Thompson or Hyperion Gaming"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="p-label">Client Email</label>
              <input
                type="email"
                className="p-input"
                placeholder="client@domain.com"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="p-label">Issue Date</label>
              <input
                type="date"
                className="p-input font-mono"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="p-label">Due Date</label>
              <input
                type="date"
                className="p-input font-mono"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="p-label">Initial Status</label>
              <select
                className="p-input cursor-pointer"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'pending' | 'draft' | 'paid')}
              >
                <option value="pending">Pending (Unpaid)</option>
                <option value="draft">Draft</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <div>
              <label className="p-label">Currency</label>
              <input
                type="text"
                className="p-input font-mono bg-panel-elevated cursor-not-allowed"
                value="GBP (£) — British Pound"
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {/* Line Items Card */}
      <div className="p-card">
        <div className="p-card-header">
          <h3 className="text-sm font-semibold text-txt-heading">Line Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="p-btn-secondary !py-1.5 !px-3 text-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Add Item
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="p-table">
            <thead>
              <tr>
                <th className="w-1/2">Description</th>
                <th className="w-24">Qty</th>
                <th className="w-32">Unit Price</th>
                <th className="w-32">Total</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="!py-3">
                    <input
                      type="text"
                      placeholder="Item description (e.g. Ryzen 9 Compute Node)"
                      className="p-input !py-2"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      required
                    />
                  </td>
                  <td className="!py-3">
                    <input
                      type="number"
                      min="1"
                      className="p-input !py-2 font-mono"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', Math.max(1, Number(e.target.value)))}
                      required
                    />
                  </td>
                  <td className="!py-3">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="p-input !py-2 font-mono"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, 'unitPrice', Math.max(0, Number(e.target.value)))}
                      required
                    />
                  </td>
                  <td className="!py-3 font-mono font-medium text-txt-heading">
                    £{(item.quantity * item.unitPrice).toFixed(2)}
                  </td>
                  <td className="!py-3 text-right">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
                      className="p-1.5 rounded-lg text-txt-muted hover:text-status-overdue hover:bg-status-overdue/10 disabled:opacity-30 transition-colors"
                      title={items.length === 1 ? 'Minimum 1 item required' : 'Remove item'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="p-card-body bg-panel-bg/30 border-t border-border flex justify-end">
          <div className="w-full max-w-sm space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-txt-muted">Subtotal</span>
              <span className="font-mono text-txt-heading">£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-txt-muted flex items-center gap-2">
                Tax Rate (%)
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="p-input !py-1 !px-2 w-16 text-right font-mono"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                />
              </span>
              <span className="font-mono text-txt-heading">£{taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-txt-muted flex items-center gap-2">
                Discount (£)
                <input
                  type="number"
                  min="0"
                  className="p-input !py-1 !px-2 w-20 text-right font-mono"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                />
              </span>
              <span className="font-mono text-txt-heading text-status-paid">-£{discount.toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="font-semibold text-txt-heading">Total Amount</span>
              <span className="font-mono text-xl font-bold text-brand-light">£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Link href="/invoices" className="p-btn-ghost">
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="p-btn-primary shadow-glow-purple disabled:opacity-50"
        >
          {isSubmitting ? (
            'Generating Invoice...'
          ) : (
            <>
              <Check className="w-4 h-4" /> Create Invoice
            </>
          )}
        </button>
      </div>
    </form>
  );
}
