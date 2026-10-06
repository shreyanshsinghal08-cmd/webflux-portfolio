'use client';

import { useState } from 'react';
import { PlusCircle, ShieldCheck, Zap, CreditCard, Sparkles } from 'lucide-react';
import { formatGBP } from '@/lib/currency';

interface TopUpFormProps {
  onTopUp: (amount: number) => Promise<boolean>;
}

const presets = [20, 50, 100, 250, 500];

export default function TopUpForm({ onTopUp }: TopUpFormProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'bank'>('card');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const activeAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  const bonusCredit = activeAmount >= 100 ? Math.round(activeAmount * 0.05 * 100) / 100 : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeAmount <= 0) return;

    setIsProcessing(true);
    setSuccessNotice(null);

    const totalToAdd = activeAmount + bonusCredit;
    const ok = await onTopUp(totalToAdd);
    setIsProcessing(false);

    if (ok) {
      setSuccessNotice(`Successfully funded wallet with ${formatGBP(totalToAdd)}${bonusCredit > 0 ? ' (including £' + bonusCredit.toFixed(2) + ' promotional bonus)' : ''}!`);
      setCustomAmount('');
      setTimeout(() => setSuccessNotice(null), 5000);
    }
  };

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex items-center gap-3 pb-6 mb-6 border-b border-stashr-border">
        <div className="w-10 h-10 rounded-lg bg-stashr-primary/10 border border-stashr-primary/20 flex items-center justify-center text-stashr-primary-light">
          <PlusCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="section-heading">Fund Cloud Credit Reserve</h3>
          <p className="section-subheading">Pre-load balance to ensure uninterrupted node uptime</p>
        </div>
      </div>

      {successNotice && (
        <div className="p-4 mb-6 rounded-xl bg-stashr-status-paid/10 border border-stashr-status-paid/30 text-xs text-stashr-status-paid font-medium animate-fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4 flex-shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Preset Selector */}
        <div>
          <label className="block text-xs font-semibold text-stashr-text-dim uppercase tracking-wider mb-2">
            Select Top-Up Amount
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {presets.map((amt) => {
              const isSelected = !customAmount && selectedAmount === amt;
              return (
                <button
                  type="button"
                  key={amt}
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`
                    p-3 rounded-xl border text-center transition-all duration-200 active:scale-[0.97]
                    ${
                      isSelected
                        ? 'bg-stashr-primary text-white border-stashr-primary shadow-glow-sm'
                        : 'bg-stashr-surface-elevated/60 text-stashr-text-body border-stashr-border hover:bg-stashr-surface-elevated hover:border-stashr-border-hover'
                    }
                  `}
                >
                  <p className="font-mono text-base font-bold">£{amt}</p>
                  {amt >= 100 && (
                    <span className="text-[10px] font-mono block text-stashr-primary-cyan mt-0.5">
                      +5% Bonus
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Amount */}
        <div>
          <label className="block text-xs font-semibold text-stashr-text-dim uppercase tracking-wider mb-2">
            Or Custom Amount
          </label>
          <div className="relative max-w-sm">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-stashr-text-dim font-bold">
              £
            </span>
            <input
              type="number"
              min="10"
              max="5000"
              step="5"
              placeholder="e.g. 150"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="glass-input pl-9 pr-4 py-3 w-full font-mono text-lg font-bold"
            />
          </div>
        </div>

        {/* Bonus Incentive Banner */}
        {activeAmount >= 100 && (
          <div className="p-4 rounded-xl bg-gradient-brand/10 border border-stashr-primary/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-stashr-primary-cyan flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-stashr-text-heading">Volume Tier Incentive Qualified</p>
                <p className="text-[11px] text-stashr-text-muted">
                  5% instant bonus of {formatGBP(bonusCredit)} credited upon payment completion.
                </p>
              </div>
            </div>
            <span className="font-mono text-sm font-bold text-stashr-primary-cyan">
              +{formatGBP(bonusCredit)}
            </span>
          </div>
        )}

        {/* Payment Source Selection */}
        <div>
          <label className="block text-xs font-semibold text-stashr-text-dim uppercase tracking-wider mb-2">
            Funding Source
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
            <div
              onClick={() => setSelectedMethod('card')}
              className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                selectedMethod === 'card'
                  ? 'bg-stashr-primary/10 border-stashr-primary shadow-glow-sm'
                  : 'bg-stashr-surface-elevated/40 border-stashr-border'
              }`}
            >
              <CreditCard className="w-4 h-4 text-stashr-primary-light" />
              <div>
                <p className="text-xs font-bold text-stashr-text-heading">Default Visa •••• 4242</p>
                <p className="text-[10px] text-stashr-text-dim">Instant Availability</p>
              </div>
            </div>

            <div
              onClick={() => setSelectedMethod('bank')}
              className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                selectedMethod === 'bank'
                  ? 'bg-stashr-primary/10 border-stashr-primary shadow-glow-sm'
                  : 'bg-stashr-surface-elevated/40 border-stashr-border'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-stashr-primary-cyan" />
              <div>
                <p className="text-xs font-bold text-stashr-text-heading">UK Faster Payments / BACS</p>
                <p className="text-[10px] text-stashr-text-dim">Zero Merchant Surcharge</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isProcessing || activeAmount <= 0}
            className="btn-primary py-3 px-8 text-sm flex items-center gap-2"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authorizing Deposit...
              </span>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                Add {formatGBP(activeAmount + bonusCredit)} Credit
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
