'use client';

import { useState } from 'react';
import { X, CreditCard, ShieldCheck, Lock } from 'lucide-react';
import type { PaymentCard } from '@/types/billing';
import {
  formatCardNumberInput,
  formatExpiryInput,
  detectCardBrand,
  validateExpiry,
  validateCvc,
} from '@/lib/stripe-helpers';

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (card: Omit<PaymentCard, 'id'>) => Promise<boolean>;
}

export default function AddPaymentModal({
  isOpen,
  onClose,
  onAddCard,
}: AddPaymentModalProps) {
  const [holderName, setHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const brand = detectCardBrand(cardNumber);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanCard = cardNumber.replace(/\s+/g, '');
    if (cleanCard.length < 15) {
      setError('Please enter a valid 15 or 16-digit card number.');
      return;
    }

    if (!validateExpiry(expiry)) {
      setError('Please provide a valid, non-expired expiration date (MM/YY).');
      return;
    }

    if (!validateCvc(cvc, brand)) {
      setError('Invalid card security code (CVC).');
      return;
    }

    setIsSubmitting(true);
    try {
      const parts = expiry.split('/');
      const month = parseInt(parts[0], 10);
      const year = parseInt(parts[1], 10);

      const success = await onAddCard({
        brand,
        last4: cleanCard.slice(-4),
        expiryMonth: month,
        expiryYear: year,
        isDefault,
        holderName,
      });

      if (success) {
        onClose();
      } else {
        setError('Card validation rejected by gateway.');
      }
    } catch {
      setError('An error occurred while adding the card.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stashr-bg/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card max-w-md w-full p-6 border border-stashr-border shadow-2xl animate-slide-up relative bg-stashr-surface">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stashr-text-dim hover:text-white p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-stashr-primary/10 flex items-center justify-center text-stashr-primary-light shadow-glow-sm">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stashr-text-heading">Add Payment Method</h3>
            <p className="text-xs text-stashr-text-dim">Fintech tokenized card storage</p>
          </div>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-lg bg-stashr-status-overdue/10 border border-stashr-status-overdue/20 text-xs text-stashr-status-overdue">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stashr-text-dim uppercase tracking-wider mb-1.5">
              Cardholder Name
            </label>
            <input
              type="text"
              required
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              className="glass-input w-full text-sm font-medium"
              placeholder="e.g. Alex Henderson"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stashr-text-dim uppercase tracking-wider mb-1.5">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                required
                maxLength={19}
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumberInput(e.target.value))}
                className="glass-input w-full text-sm font-mono tracking-widest pl-10"
                placeholder="4242 4242 4242 4242"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[10px] font-bold text-stashr-primary-light uppercase">
                {brand}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stashr-text-dim uppercase tracking-wider mb-1.5">
                Expiry Date
              </label>
              <input
                type="text"
                required
                maxLength={5}
                value={expiry}
                onChange={(e) => setExpiry(formatExpiryInput(e.target.value))}
                className="glass-input w-full text-sm font-mono text-center"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stashr-text-dim uppercase tracking-wider mb-1.5">
                CVC Code
              </label>
              <input
                type="password"
                required
                maxLength={4}
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
                className="glass-input w-full text-sm font-mono text-center tracking-widest"
                placeholder="•••"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="w-4 h-4 rounded border-stashr-border bg-stashr-surface-input text-stashr-primary focus:ring-stashr-primary/50"
            />
            <label htmlFor="isDefault" className="text-xs text-stashr-text-body font-medium cursor-pointer">
              Set as default payment method for recurring renewals
            </label>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-stashr-border">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary text-sm flex items-center gap-2"
            >
              {isSubmitting ? (
                'Tokenizing Card...'
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" /> Save Payment Method
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
