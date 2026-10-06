'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Wallet } from '@/types/billing';
import { billingApi, INITIAL_WALLET } from '@/lib/billing-api';

export function useWallet() {
  const [wallet, setWallet] = useState<Wallet>(INITIAL_WALLET);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWallet = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await billingApi.getWallet();
      setWallet(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load wallet';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  const topUp = useCallback(
    async (amount: number): Promise<boolean> => {
      try {
        await billingApi.topUpWallet(amount);
        await fetchWallet();
        return true;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to top up wallet';
        setError(msg);
        return false;
      }
    },
    [fetchWallet]
  );

  return {
    wallet,
    balance: wallet.balance,
    transactions: wallet.transactions,
    isLoading,
    error,
    topUp,
    fetchWallet,
  };
}
