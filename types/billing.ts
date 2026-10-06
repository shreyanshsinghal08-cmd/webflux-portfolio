export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'cancelled' | 'refunded';
export type PaymentMethod = 'card' | 'paypal' | 'crypto' | 'bank_transfer';
export type BillingCycle = 'monthly' | 'quarterly' | 'annually';
export type SubscriptionTier = 'starter' | 'performance' | 'enterprise';
export type TransactionType = 'charge' | 'refund' | 'credit' | 'debit';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  items: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  taxRate: number;
  discount: number;
  total: number;
  currency: 'GBP' | 'USD' | 'EUR';
  status: InvoiceStatus;
  issuedAt: string;
  dueAt: string;
  paidAt: string | null;
  paymentMethod: PaymentMethod | null;
  transactionId: string | null;
  notes: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  metadata?: {
    nodeId?: string;
    nodeSpec?: string;
    region?: string;
  };
}

export interface Subscription {
  id: string;
  nodeId: string;
  nodeName: string;
  nodeSpec: string;
  nodeIp: string;
  tier: SubscriptionTier;
  cycle: BillingCycle;
  pricePerCycle: number;
  currency: 'GBP' | 'USD' | 'EUR';
  status: 'active' | 'paused' | 'cancelled' | 'suspended';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  usage: {
    cpuPercent: number;
    ramPercent: number;
    storagePercent: number;
    bandwidthGB: number;
    bandwidthLimitGB: number;
  };
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: 'GBP' | 'USD' | 'EUR';
  description: string;
  invoiceId: string | null;
  paymentMethod: PaymentMethod;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
  metadata?: Record<string, string>;
}

export interface PaymentCard {
  id: string;
  brand: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  holderName: string;
}

export interface Wallet {
  balance: number;
  currency: 'GBP' | 'USD' | 'EUR';
  pendingCredits: number;
  totalCreditsAdded: number;
  totalCreditsUsed: number;
  transactions: WalletTransaction[];
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  createdAt: string;
  reference: string;
}

export interface BillingSettings {
  autoPay: boolean;
  defaultPaymentMethodId: string | null;
  invoiceEmails: boolean;
  renewalReminders: boolean;
  reminderDaysBefore: number;
  taxId: string;
  companyName: string;
  billingAddress: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface DashboardStats {
  totalSpent: number;
  amountDue: number;
  walletBalance: number;
  activeSubscriptions: number;
  nextRenewalDate: string;
  nextRenewalAmount: number;
  monthlyTrend: { month: string; amount: number }[];
}
