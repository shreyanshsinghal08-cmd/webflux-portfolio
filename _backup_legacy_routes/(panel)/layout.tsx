import { ReactNode } from 'react';

export const metadata = {
  title: 'StashrNode Billing Panel',
  description: 'Client billing, invoicing, and subscription management.',
};

export default function PanelLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
