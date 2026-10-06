'use client';

import { useState } from 'react';
import { X, ArrowUpCircle, Check, Zap, Server } from 'lucide-react';
import type { Subscription, SubscriptionTier } from '@/types/billing';
import { formatCurrency } from '@/lib/currency';

interface UpgradeModalProps {
  isOpen: boolean;
  subscription: Subscription | null;
  onClose: () => void;
  onConfirmUpgrade: (subId: string, newTier: SubscriptionTier, newPrice: number) => void;
}

const tierOptions: {
  tier: SubscriptionTier;
  label: string;
  price: number;
  specs: string;
}[] = [
  { tier: 'starter', label: 'Starter', price: 24.99, specs: '4 vCPU • 16GB RAM • 250GB NVMe' },
  { tier: 'performance', label: 'Performance', price: 44.99, specs: '8 vCPU • 32GB RAM • 500GB Gen5' },
  { tier: 'enterprise', label: 'Enterprise', price: 89.99, specs: '16 vCPU • 64GB ECC • 2TB RAID' },
];

export default function UpgradeModal({
  isOpen,
  subscription,
  onClose,
  onConfirmUpgrade,
}: UpgradeModalProps) {
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>(
    subscription?.tier || 'performance'
  );
  const [isUpgrading, setIsUpgrading] = useState(false);

  if (!isOpen || !subscription) return null;

  const currentPlan = tierOptions.find((t) => t.tier === subscription.tier) || tierOptions[0];
  const targetPlan = tierOptions.find((t) => t.tier === selectedTier) || tierOptions[1];

  // Prorated difference
  const priceDifference = Math.max(0, targetPlan.price - currentPlan.price);
  const proratedCharge = Math.round((priceDifference * 0.75) * 100) / 100; // estimated 75% period remaining

  const handleConfirm = async () => {
    setIsUpgrading(true);
    await onConfirmUpgrade(subscription.id, selectedTier, targetPlan.price);
    setIsUpgrading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stashr-bg/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card max-w-lg w-full p-6 border border-stashr-border shadow-2xl animate-slide-up relative bg-stashr-surface">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stashr-text-dim hover:text-white p-1"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-stashr-primary/10 flex items-center justify-center text-stashr-primary-light shadow-glow-sm">
            <ArrowUpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stashr-text-heading">
              Scale Hardware Tier
            </h3>
            <p className="text-xs text-stashr-text-dim font-mono">
              Node: {subscription.nodeName} ({subscription.nodeIp})
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <label className="text-xs font-semibold text-stashr-text-dim uppercase tracking-wider">
            Choose Target Specification
          </label>
          <div className="space-y-2">
            {tierOptions.map((opt) => {
              const isSelected = selectedTier === opt.tier;
              const isCurrent = subscription.tier === opt.tier;

              return (
                <div
                  key={opt.tier}
                  onClick={() => setSelectedTier(opt.tier)}
                  className={`
                    p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200
                    ${
                      isSelected
                        ? 'bg-stashr-primary/10 border-stashr-primary text-white shadow-glow-sm'
                        : 'bg-stashr-surface-elevated/40 border-stashr-border hover:bg-stashr-surface-elevated'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-stashr-primary bg-stashr-primary text-white'
                          : 'border-stashr-border'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stashr-text-heading">{opt.label}</span>
                        {isCurrent && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stashr-surface-input border border-stashr-border text-stashr-text-muted">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stashr-text-dim font-mono mt-0.5">{opt.specs}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-mono text-sm font-bold text-stashr-text-heading">
                      £{opt.price.toFixed(2)}
                    </p>
                    <span className="text-[10px] text-stashr-text-dim">/mo</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Proration Calculation Box */}
        <div className="p-4 rounded-xl bg-stashr-surface-input border border-stashr-border space-y-2 mb-6 text-xs">
          <div className="flex justify-between text-stashr-text-muted">
            <span>New Tier Base:</span>
            <span className="font-mono text-stashr-text-body">£{targetPlan.price.toFixed(2)}/mo</span>
          </div>
          <div className="flex justify-between text-stashr-text-muted">
            <span>Prorated Adjustment (Cycle remainder):</span>
            <span className="font-mono text-stashr-status-paid font-semibold">
              +£{proratedCharge.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-stashr-text-heading font-bold pt-2 border-t border-stashr-border text-sm">
            <span>Immediate Charge Due:</span>
            <span className="font-mono text-stashr-primary-light">
              £{proratedCharge.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-stashr-border">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isUpgrading || selectedTier === subscription.tier}
            onClick={handleConfirm}
            className="btn-primary text-sm flex items-center gap-1.5"
          >
            {isUpgrading ? 'Applying Upgrade...' : 'Confirm Tier Change'}
          </button>
        </div>
      </div>
    </div>
  );
}
