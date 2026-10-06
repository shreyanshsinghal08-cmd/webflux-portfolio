'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Subscription, SubscriptionTier } from '@/types/billing';
import { billingApi, INITIAL_SUBSCRIPTIONS } from '@/lib/billing-api';

export function useSubscription() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(INITIAL_SUBSCRIPTIONS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await billingApi.getSubscriptions();
      setSubscriptions(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch subscriptions';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const changeTier = useCallback(
    async (subId: string, newTier: SubscriptionTier, newPrice: number): Promise<boolean> => {
      try {
        await billingApi.updateSubscriptionTier(subId, newTier, newPrice);
        await fetchSubscriptions();
        return true;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to update subscription tier';
        setError(msg);
        return false;
      }
    },
    [fetchSubscriptions]
  );

  const togglePause = useCallback(
    async (subId: string): Promise<boolean> => {
      try {
        await billingApi.toggleSubscriptionStatus(subId);
        await fetchSubscriptions();
        return true;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to toggle subscription';
        setError(msg);
        return false;
      }
    },
    [fetchSubscriptions]
  );

  return {
    subscriptions,
    isLoading,
    error,
    changeTier,
    togglePause,
    fetchSubscriptions,
  };
}
