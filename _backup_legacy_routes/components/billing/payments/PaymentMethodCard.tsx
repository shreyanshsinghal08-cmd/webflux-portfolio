'use client';

import { useState } from 'react';
import { CreditCard, Trash2, CheckCircle, ShieldCheck } from 'lucide-react';
import type { PaymentCard } from '@/types/billing';
import ConfirmModal from '../shared/ConfirmModal';

interface PaymentMethodCardProps {
  card: PaymentCard;
  onSetDefault: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function PaymentMethodCard({
  card,
  onSetDefault,
  onRemove,
}: PaymentMethodCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const brandNames = {
    visa: 'Visa Infrastructure',
    mastercard: 'Mastercard Enterprise',
    amex: 'American Express Corporate',
  };

  return (
    <>
      <div
        className={`
          glass-card p-6 relative overflow-hidden group transition-all duration-300
          ${card.isDefault ? 'border-stashr-primary/40 shadow-glow-sm' : 'hover:border-stashr-border-hover'}
        `}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-brand opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />

        {/* Top Badges */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-stashr-primary/10 border border-stashr-primary/20 flex items-center justify-center text-stashr-primary-light">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-stashr-text-heading capitalize">
                {brandNames[card.brand] || card.brand}
              </p>
              <p className="text-[10px] text-stashr-text-dim">Commercial Debit / Credit</p>
            </div>
          </div>

          {card.isDefault ? (
            <span className="status-badge bg-stashr-primary/10 text-stashr-primary-light border-stashr-primary/20 text-[10px]">
              DEFAULT
            </span>
          ) : (
            <button
              onClick={() => onSetDefault(card.id)}
              className="text-[11px] text-stashr-text-dim hover:text-stashr-primary-light transition-colors"
            >
              Set Default
            </button>
          )}
        </div>

        {/* Card Number */}
        <p className="font-mono text-xl text-stashr-text-heading tracking-widest my-2">
          •••• •••• •••• {card.last4}
        </p>

        {/* Metadata Footer */}
        <div className="flex items-end justify-between mt-6 pt-4 border-t border-stashr-border/60">
          <div>
            <p className="text-[10px] text-stashr-text-dim uppercase font-semibold">Card Holder</p>
            <p className="text-xs font-medium text-stashr-text-body mt-0.5">{card.holderName}</p>
          </div>

          <div className="text-right flex items-center gap-4">
            <div>
              <p className="text-[10px] text-stashr-text-dim uppercase font-semibold">Expires</p>
              <p className="text-xs font-mono font-medium text-stashr-text-body mt-0.5">
                {String(card.expiryMonth).padStart(2, '0')}/{card.expiryYear}
              </p>
            </div>

            {!card.isDefault && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-1.5 rounded-lg hover:bg-stashr-status-overdue/10 text-stashr-text-dim hover:text-stashr-status-overdue transition-colors"
                title="Remove Card"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Remove Payment Card"
        message={`Are you sure you want to remove card ending in •••• ${card.last4}? Active subscriptions might fail renewal unless another card is default.`}
        confirmLabel="Remove Card"
        isDanger={true}
        onConfirm={() => {
          onRemove(card.id);
          setShowDeleteConfirm(false);
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  );
}
