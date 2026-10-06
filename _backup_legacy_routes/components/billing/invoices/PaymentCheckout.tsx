'use client';

import { useState } from 'react';
import { CreditCard, Lock, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  formatCardNumberInput,
  formatExpiryInput,
  detectCardBrand,
  simulateStripePayment,
} from '@/lib/stripe-helpers';
import { formatCurrency } from '@/lib/currency';
import type { Invoice } from '@/types/billing';

interface PaymentCheckoutProps {
  invoice: Invoice;
  onPaymentSuccess: (transactionId: string) => void;
  onCancel?: () => void;
}

export default function PaymentCheckout({
  invoice,
  onPaymentSuccess,
  onCancel,
}: PaymentCheckoutProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [holderName, setHolderName] = useState('StashrNode Admin');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const brand = detectCardBrand(cardNumber);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsProcessing(true);

    try {
      const result = await simulateStripePayment({
        amount: invoice.total,
        currency: invoice.currency,
        cardNumber,
        expiry,
        cvc,
        cardHolder: holderName,
      });

      if (result.success && result.transactionId) {
        onPaymentSuccess(result.transactionId);
      } else {
        setErrorMessage(result.error || 'Payment authorization failed.');
      }
    } catch {
      setErrorMessage('A network error occurred while reaching the payment gateway.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="glass-card p-6 border border-stashr-border shadow-card">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-stashr-border">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-stashr-primary-light" />
          <h3 className="text-base font-bold text-stashr-text-heading">Stripe Checkout</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stashr-status-paid font-mono">
          <Lock className="w-3.5 h-3.5" /> 256-Bit Encrypted
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 mb-4 rounded-lg bg-stashr-status-overdue/10 border border-stashr-status-overdue/20 flex items-center gap-2 text-xs text-stashr-status-overdue">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handlePay} className="space-y-4">
        {/* Cardholder Name */}
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
            placeholder="Jane Doe"
          />
        </div>

        {/* Card Number */}
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
            <div className="absolute left-3 top-1/2 -translate-y-1/2 uppercase font-mono text-[10px] font-bold text-stashr-primary-light">
              {brand}
            </div>
          </div>
        </div>

        {/* Expiry & CVC */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stashr-text-dim uppercase tracking-wider mb-1.5">
              Expiration
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
              CVC / CVV
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

        <div className="pt-2">
          <button
            type="submit"
            disabled={isProcessing}
            className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing Card...
              </span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Pay {formatCurrency(invoice.total, invoice.currency)}
              </>
            )}
          </button>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="btn-ghost w-full text-xs text-center"
          >
            Cancel Payment
          </button>
        )}
      </form>
    </div>
  );
}
