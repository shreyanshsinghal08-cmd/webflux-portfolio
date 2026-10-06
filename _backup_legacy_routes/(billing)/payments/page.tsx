'use client';

import { useState } from 'react';
import BillingShell from '@/components/billing/layout/BillingShell';
import PaymentMethodCard from '@/components/billing/payments/PaymentMethodCard';
import AddPaymentModal from '@/components/billing/payments/AddPaymentModal';
import TransactionRow from '@/components/billing/payments/TransactionRow';
import { usePaymentMethods } from '@/hooks/usePaymentMethods';
import { useBillingData } from '@/hooks/useBillingData';
import { CreditCard, Plus, ArrowUpDown, ShieldCheck } from 'lucide-react';
import type { PaymentCard } from '@/types/billing';

export default function PaymentsPage() {
  const { cards, addCard, setDefaultCard, removeCard } = usePaymentMethods();
  const { transactions } = useBillingData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredTransactions = filterType === 'all'
    ? transactions
    : transactions.filter((t) => t.type === filterType);

  const handleAddCardSubmit = async (cardData: Omit<PaymentCard, 'id'>) => {
    return await addCard(cardData);
  };

  return (
    <BillingShell
      pageTitle="Payment Methods & Transactions"
      pageSubtitle="Manage verified cards, automated billing defaults, and real-time transaction history"
    >
      <div className="space-y-8">
        {/* Saved Cards Header & Button */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="section-heading">Saved Payment Methods</h2>
              <p className="section-subheading">PCI-DSS compliant encrypted card tokens for automatic invoice settlements</p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary text-sm flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Payment Method
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((card) => (
              <PaymentMethodCard
                key={card.id}
                card={card}
                onSetDefault={setDefaultCard}
                onRemove={removeCard}
              />
            ))}
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="section-heading">All Transactions</h2>
              <p className="section-subheading">Ledger of all charges, wallet credits, and infrastructure refunds</p>
            </div>

            <div className="flex items-center gap-2">
              {['all', 'charge', 'credit', 'refund'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`
                    px-3 py-1 text-xs font-semibold rounded-full capitalize transition-all duration-200
                    ${
                      filterType === type
                        ? 'bg-stashr-primary text-white shadow-glow-sm'
                        : 'bg-stashr-surface-elevated text-stashr-text-muted hover:text-white'
                    }
                  `}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-stashr-border text-xs uppercase text-stashr-text-dim">
                    <th className="px-6 py-3.5">Reference ID</th>
                    <th className="px-6 py-3.5">Description</th>
                    <th className="px-6 py-3.5">Date & Time</th>
                    <th className="px-6 py-3.5 text-right">Amount</th>
                    <th className="px-6 py-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx) => (
                    <TransactionRow
                      key={tx.id}
                      transaction={tx}
                      onViewInvoice={(invId) => {
                        window.location.href = `/invoices/${invId}`;
                      }}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add Payment Modal */}
        <AddPaymentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddCard={handleAddCardSubmit}
        />
      </div>
    </BillingShell>
  );
}
