'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PaymentCard } from '@/types/billing';
import { billingApi, INITIAL_CARDS } from '@/lib/billing-api';

export function usePaymentMethods() {
  const [cards, setCards] = useState<PaymentCard[]>(INITIAL_CARDS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await billingApi.getPaymentCards();
      setCards(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch payment methods';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const addCard = useCallback(
    async (cardData: Omit<PaymentCard, 'id'>): Promise<boolean> => {
      try {
        await billingApi.addPaymentCard(cardData);
        await fetchCards();
        return true;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to add card';
        setError(msg);
        return false;
      }
    },
    [fetchCards]
  );

  const setDefaultCard = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        await billingApi.setDefaultCard(id);
        await fetchCards();
        return true;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to set default card';
        setError(msg);
        return false;
      }
    },
    [fetchCards]
  );

  const removeCard = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        await billingApi.removeCard(id);
        await fetchCards();
        return true;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to delete card';
        setError(msg);
        return false;
      }
    },
    [fetchCards]
  );

  return {
    cards,
    isLoading,
    error,
    addCard,
    setDefaultCard,
    removeCard,
    fetchCards,
  };
}
