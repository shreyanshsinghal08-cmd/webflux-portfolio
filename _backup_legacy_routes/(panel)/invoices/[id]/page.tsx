import PanelShell from '@/components/panel/layout/PanelShell';
import InvoiceDetailView from '@/components/panel/invoices/InvoiceDetailView';

// Dummy generate params for Next.js to not complain in dev
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default function InvoicePage({ params }: { params: { id: string } }) {
  return (
    <PanelShell>
      <InvoiceDetailView id={params.id} />
    </PanelShell>
  );
}
