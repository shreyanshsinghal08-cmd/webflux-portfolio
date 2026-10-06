'use client';

import { ReactNode } from 'react';
import BillingSidebar from './BillingSidebar';
import BillingHeader from './BillingHeader';
import Toast from '../shared/Toast';
import { useNotifications } from '@/hooks/useNotifications';

interface BillingShellProps {
  children: ReactNode;
  pageTitle: string;
  pageSubtitle?: string;
  walletBalance?: number;
}

export default function BillingShell({
  children,
  pageTitle,
  pageSubtitle,
  walletBalance = 24.50,
}: BillingShellProps) {
  const { toasts, removeToast } = useNotifications();

  return (
    <div className="min-h-screen bg-stashr-bg">
      <BillingSidebar />
      <div className="ml-[260px] transition-all duration-300">
        <BillingHeader
          pageTitle={pageTitle}
          pageSubtitle={pageSubtitle}
          walletBalance={walletBalance}
        />
        <main className="p-8 animate-fade-in">
          {children}
        </main>
      </div>
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
