'use client';

import PanelShell from '@/components/panel/layout/PanelShell';
import CreateInvoiceForm from '@/components/panel/invoices/CreateInvoiceForm';

export default function CreateInvoicePage() {
  return (
    <PanelShell>
      <CreateInvoiceForm />
    </PanelShell>
  );
}
