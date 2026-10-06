'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const labelMap: Record<string, string> = {
    dashboard: 'Dashboard', invoices: 'Invoices', clients: 'Clients',
    products: 'Products', orders: 'Orders', tickets: 'Tickets',
    payments: 'Payments', settings: 'Settings', create: 'Create New',
  };

  return (
    <nav className="flex items-center gap-1.5 text-xs" aria-label="Breadcrumb">
      <Link href="/dashboard" className="text-txt-muted hover:text-txt-body transition-colors">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        const href = '/' + segments.slice(0, i + 1).join('/');
        const label = labelMap[seg] || seg;
        return (
          <span key={href} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-txt-dim" />
            {isLast ? (
              <span className="font-semibold text-txt-heading">{label}</span>
            ) : (
              <Link href={href} className="text-txt-muted hover:text-txt-body transition-colors capitalize">{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
