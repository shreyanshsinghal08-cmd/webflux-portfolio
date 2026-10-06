'use client';

import { useState } from 'react';
import BillingShell from '@/components/billing/layout/BillingShell';
import SubscriptionCard from '@/components/billing/subscriptions/SubscriptionCard';
import PlanComparison from '@/components/billing/subscriptions/PlanComparison';
import UpgradeModal from '@/components/billing/subscriptions/UpgradeModal';
import { useSubscription } from '@/hooks/useSubscription';
import type { Subscription, SubscriptionTier } from '@/types/billing';
import { Plus, CheckCircle2 } from 'lucide-react';

export default function SubscriptionsPage() {
  const { subscriptions, changeTier, togglePause } = useSubscription();
  const [selectedSubForUpgrade, setSelectedSubForUpgrade] = useState<Subscription | null>(null);
  const [upgradeNotification, setUpgradeNotification] = useState<string | null>(null);

  const handleOpenUpgrade = (subId?: string) => {
    const sub = subscriptions.find((s) => s.id === subId) || subscriptions[0];
    setSelectedSubForUpgrade(sub);
  };

  const handleConfirmUpgrade = async (subId: string, newTier: SubscriptionTier, newPrice: number) => {
    const ok = await changeTier(subId, newTier, newPrice);
    if (ok) {
      setUpgradeNotification(`Successfully re-provisioned node specification to ${newTier.toUpperCase()}.`);
      setTimeout(() => setUpgradeNotification(null), 5000);
    }
  };

  const handlePlanSelectFromMatrix = (tier: SubscriptionTier, price: number) => {
    if (subscriptions.length > 0) {
      setSelectedSubForUpgrade(subscriptions[0]);
    }
  };

  return (
    <BillingShell
      pageTitle="Subscriptions"
      pageSubtitle="Manage your active bare-metal nodes, compute plans, and tier scaling"
    >
      <div className="space-y-8">
        {upgradeNotification && (
          <div className="p-4 rounded-xl bg-stashr-status-paid/10 border border-stashr-status-paid/30 flex items-center gap-3 text-sm text-stashr-status-paid animate-fade-in">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{upgradeNotification}</span>
          </div>
        )}

        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-stashr-text-muted">
            <span className="font-mono font-bold text-stashr-text-heading">{subscriptions.length}</span> active subscription instances
          </p>
          <button
            onClick={() => handleOpenUpgrade(subscriptions[0]?.id)}
            className="btn-primary text-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Deploy New Node
          </button>
        </div>

        {/* Node Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {subscriptions.map((sub) => (
            <SubscriptionCard
              key={sub.id}
              id={sub.id}
              nodeName={sub.nodeName}
              spec={sub.nodeSpec}
              ip={sub.nodeIp}
              tier={sub.tier.charAt(0).toUpperCase() + sub.tier.slice(1)}
              price={`£${sub.pricePerCycle.toFixed(2)}`}
              cycle="mo"
              status={sub.status === 'suspended' ? 'cancelled' : sub.status}
              renewDate={sub.currentPeriodEnd}
              cpu={sub.usage.cpuPercent}
              ram={sub.usage.ramPercent}
              bandwidth={Math.round((sub.usage.bandwidthGB / sub.usage.bandwidthLimitGB) * 100)}
              onUpgrade={handleOpenUpgrade}
              onToggleStatus={(id) => id && togglePause(id)}
            />
          ))}
        </div>

        {/* Plan Comparison Matrix */}
        <PlanComparison
          currentTier={subscriptions[0]?.tier || 'performance'}
          onSelectPlan={handlePlanSelectFromMatrix}
        />

        {/* Upgrade / Scale Modal */}
        <UpgradeModal
          isOpen={!!selectedSubForUpgrade}
          subscription={selectedSubForUpgrade}
          onClose={() => setSelectedSubForUpgrade(null)}
          onConfirmUpgrade={handleConfirmUpgrade}
        />
      </div>
    </BillingShell>
  );
}
