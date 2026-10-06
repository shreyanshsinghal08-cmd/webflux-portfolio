export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled' | 'refunded';

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  total: number;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  items: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  status: InvoiceStatus;
  issuedAt: string;
  dueAt: string;
  paidAt: string | null;
  notes: string;
  gateway: string | null;
  transactionId: string | null;
}
