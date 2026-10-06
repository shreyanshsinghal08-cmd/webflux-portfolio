'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Invoice, Transaction, DashboardStats } from '@/types/billing';
import { billingApi, INITIAL_INVOICES, INITIAL_TRANSACTIONS, INITIAL_STATS } from '@/lib/billing-api';

export function useBillingData() {
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [stats, setStats] = useState<DashboardStats>(INITIAL_STATS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [fetchedInvoices, fetchedTx, fetchedStats] = await Promise.all([
        billingApi.getInvoices(),
        billingApi.getTransactions(),
        billingApi.getDashboardStats(),
      ]);
      setInvoices(fetchedInvoices);
      setTransactions(fetchedTx);
      setStats(fetchedStats);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch billing data';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const payInvoice = useCallback(
    async (invoiceId: string, cardLast4: string = '4242'): Promise<boolean> => {
      try {
        await billingApi.payInvoice(invoiceId, cardLast4);
        await refreshData();
        return true;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Payment failed';
        setError(msg);
        return false;
      }
    },
    [refreshData]
  );

  return {
    invoices,
    transactions,
    stats,
    isLoading,
    error,
    refreshData,
    payInvoice,
  };
}
