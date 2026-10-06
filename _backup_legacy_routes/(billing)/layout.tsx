import { ReactNode } from 'react';

export const metadata = {
  title: 'Billing | StashrNode',
  description: 'Manage your StashrNode invoices, subscriptions, and payments.',
};

export default function BillingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
