import type {
  Invoice,
  Subscription,
  Transaction,
  PaymentCard,
  Wallet,
  BillingSettings,
  DashboardStats,
  InvoiceStatus,
  SubscriptionTier,
} from '@/types/billing';

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'STSH-2024-8891',
    clientId: 'c1',
    clientName: 'StashrNode Infrastructure',
    clientEmail: 'billing@stashrnode.co.uk',
    items: [
      {
        id: 'li-1',
        description: 'Minecraft-Prod-01 Dedicated Thread Node',
        quantity: 1,
        unitPrice: 37.49,
        total: 37.49,
        metadata: { nodeId: 'node-991', nodeSpec: 'Ryzen 9 7950X // 32GB DDR5', region: 'LON-01' },
      },
      {
        id: 'li-2',
        description: 'DDoS Mitigation Shield Tier-1',
        quantity: 1,
        unitPrice: 7.50,
        total: 7.50,
        metadata: { nodeId: 'node-991', region: 'LON-01' },
      },
    ],
    subtotal: 44.99,
    tax: 9.00,
    taxRate: 20,
    discount: 9.00,
    total: 44.99,
    currency: 'GBP',
    status: 'paid',
    issuedAt: '2024-11-01',
    dueAt: '2024-11-01',
    paidAt: '2024-11-01',
    paymentMethod: 'card',
    transactionId: 'TXN-8891',
    notes: 'Auto-renewed with registered primary card.',
  },
  {
    id: '2',
    invoiceNumber: 'STSH-2024-8876',
    clientId: 'c1',
    clientName: 'StashrNode Infrastructure',
    clientEmail: 'billing@stashrnode.co.uk',
    items: [
      {
        id: 'li-3',
        description: 'VPS-London-02 High Memory Cluster',
        quantity: 1,
        unitPrice: 24.99,
        total: 24.99,
        metadata: { nodeId: 'node-992', nodeSpec: 'EPYC 9454 // 16GB DDR5', region: 'LON-02' },
      },
    ],
    subtotal: 24.99,
    tax: 5.00,
    taxRate: 20,
    discount: 5.00,
    total: 24.99,
    currency: 'GBP',
    status: 'pending',
    issuedAt: '2024-11-08',
    dueAt: '2024-11-15',
    paidAt: null,
    paymentMethod: null,
    transactionId: null,
    notes: 'Payment due within 7 days of invoice generation.',
  },
  {
    id: '3',
    invoiceNumber: 'STSH-2024-8854',
    clientId: 'c1',
    clientName: 'StashrNode Infrastructure',
    clientEmail: 'billing@stashrnode.co.uk',
    items: [
      {
        id: 'li-4',
        description: 'Discord-Bot-Host Micro Instance',
        quantity: 1,
        unitPrice: 14.99,
        total: 14.99,
        metadata: { nodeId: 'node-993', nodeSpec: 'i9-13900K // 8GB DDR4', region: 'LON-01' },
      },
    ],
    subtotal: 14.99,
    tax: 3.00,
    taxRate: 20,
    discount: 3.00,
    total: 14.99,
    currency: 'GBP',
    status: 'overdue',
    issuedAt: '2024-10-01',
    dueAt: '2024-10-08',
    paidAt: null,
    paymentMethod: null,
    transactionId: null,
    notes: 'Urgent: Service suspended in 48 hours unless payment received.',
  },
  {
    id: '4',
    invoiceNumber: 'STSH-2024-8831',
    clientId: 'c1',
    clientName: 'StashrNode Infrastructure',
    clientEmail: 'billing@stashrnode.co.uk',
    items: [
      {
        id: 'li-5',
        description: 'Minecraft-Prod-01 Dedicated Thread Node',
        quantity: 1,
        unitPrice: 44.99,
        total: 44.99,
        metadata: { nodeId: 'node-991', nodeSpec: 'Ryzen 9 7950X // 32GB DDR5', region: 'LON-01' },
      },
    ],
    subtotal: 44.99,
    tax: 9.00,
    taxRate: 20,
    discount: 9.00,
    total: 44.99,
    currency: 'GBP',
    status: 'paid',
    issuedAt: '2024-10-01',
    dueAt: '2024-10-01',
    paidAt: '2024-10-01',
    paymentMethod: 'card',
    transactionId: 'TXN-8831',
    notes: 'Settled via auto-charge.',
  },
  {
    id: '5',
    invoiceNumber: 'STSH-2024-8812',
    clientId: 'c1',
    clientName: 'StashrNode Infrastructure',
    clientEmail: 'billing@stashrnode.co.uk',
    items: [
      {
        id: 'li-6',
        description: 'Temporary Test Node Frankfurt',
        quantity: 1,
        unitPrice: 24.99,
        total: 24.99,
        metadata: { nodeId: 'node-994', nodeSpec: 'EPYC 9454 // 16GB', region: 'FRA-01' },
      },
    ],
    subtotal: 24.99,
    tax: 5.00,
    taxRate: 20,
    discount: 10.00,
    total: 19.99,
    currency: 'GBP',
    status: 'cancelled',
    issuedAt: '2024-09-15',
    dueAt: '2024-09-22',
    paidAt: null,
    paymentMethod: null,
    transactionId: null,
    notes: 'Cancelled following client cancellation ticket #4492.',
  },
];

export const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sub-1',
    nodeId: 'node-991',
    nodeName: 'Minecraft-Prod-01',
    nodeSpec: 'Ryzen 9 7950X // 32GB DDR5',
    nodeIp: '185.24.67.112',
    tier: 'performance',
    cycle: 'monthly',
    pricePerCycle: 44.99,
    currency: 'GBP',
    status: 'active',
    currentPeriodStart: '2024-11-01',
    currentPeriodEnd: '2024-12-01',
    cancelAtPeriodEnd: false,
    usage: {
      cpuPercent: 67,
      ramPercent: 82,
      storagePercent: 54,
      bandwidthGB: 450,
      bandwidthLimitGB: 1000,
    },
  },
  {
    id: 'sub-2',
    nodeId: 'node-992',
    nodeName: 'VPS-London-02',
    nodeSpec: 'EPYC 9454 // 16GB DDR5',
    nodeIp: '185.24.67.204',
    tier: 'starter',
    cycle: 'monthly',
    pricePerCycle: 24.99,
    currency: 'GBP',
    status: 'active',
    currentPeriodStart: '2024-11-08',
    currentPeriodEnd: '2024-12-08',
    cancelAtPeriodEnd: false,
    usage: {
      cpuPercent: 34,
      ramPercent: 58,
      storagePercent: 32,
      bandwidthGB: 220,
      bandwidthLimitGB: 1000,
    },
  },
  {
    id: 'sub-3',
    nodeId: 'node-993',
    nodeName: 'Discord-Bot-Host',
    nodeSpec: 'i9-13900K // 8GB DDR4',
    nodeIp: '185.24.67.89',
    tier: 'starter',
    cycle: 'monthly',
    pricePerCycle: 14.99,
    currency: 'GBP',
    status: 'active',
    currentPeriodStart: '2024-11-15',
    currentPeriodEnd: '2024-12-15',
    cancelAtPeriodEnd: false,
    usage: {
      cpuPercent: 12,
      ramPercent: 41,
      storagePercent: 19,
      bandwidthGB: 80,
      bandwidthLimitGB: 500,
    },
  },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-8891',
    type: 'charge',
    amount: 44.99,
    currency: 'GBP',
    description: 'Minecraft-Prod-01 — Monthly Renewal',
    invoiceId: '1',
    paymentMethod: 'card',
    status: 'completed',
    createdAt: '2024-11-01T10:14:00Z',
  },
  {
    id: 'TXN-8876',
    type: 'credit',
    amount: 50.00,
    currency: 'GBP',
    description: 'Wallet Top-Up (Stripe Card)',
    invoiceId: null,
    paymentMethod: 'card',
    status: 'completed',
    createdAt: '2024-10-28T14:32:00Z',
  },
  {
    id: 'TXN-8854',
    type: 'charge',
    amount: 24.99,
    currency: 'GBP',
    description: 'VPS-London-02 — Monthly Renewal',
    invoiceId: '4',
    paymentMethod: 'card',
    status: 'completed',
    createdAt: '2024-10-08T09:20:00Z',
  },
  {
    id: 'TXN-8831',
    type: 'refund',
    amount: 14.99,
    currency: 'GBP',
    description: 'Refund — Duplicate Charge (Ticket #441)',
    invoiceId: '5',
    paymentMethod: 'card',
    status: 'completed',
    createdAt: '2024-10-03T16:45:00Z',
  },
  {
    id: 'TXN-8812',
    type: 'charge',
    amount: 14.99,
    currency: 'GBP',
    description: 'Discord-Bot-Host — Monthly Renewal',
    invoiceId: '4',
    paymentMethod: 'card',
    status: 'completed',
    createdAt: '2024-10-01T08:00:00Z',
  },
];

export const INITIAL_CARDS: PaymentCard[] = [
  {
    id: 'card-1',
    brand: 'visa',
    last4: '4242',
    expiryMonth: 12,
    expiryYear: 28,
    isDefault: true,
    holderName: 'StashrNode Admin',
  },
  {
    id: 'card-2',
    brand: 'mastercard',
    last4: '8812',
    expiryMonth: 8,
    expiryYear: 27,
    isDefault: false,
    holderName: 'StashrNode Finance',
  },
];

export const INITIAL_WALLET: Wallet = {
  balance: 24.50,
  currency: 'GBP',
  pendingCredits: 0,
  totalCreditsAdded: 250.00,
  totalCreditsUsed: 225.50,
  transactions: [
    {
      id: 'wtx-1',
      type: 'credit',
      amount: 50.00,
      description: 'Card Top-Up',
      createdAt: '2024-10-28T14:32:00Z',
      reference: 'TXN-8876',
    },
    {
      id: 'wtx-2',
      type: 'debit',
      amount: 44.99,
      description: 'Auto-Pay: Invoice STSH-2024-8891',
      createdAt: '2024-11-01T10:14:00Z',
      reference: 'STSH-2024-8891',
    },
    {
      id: 'wtx-3',
      type: 'credit',
      amount: 100.00,
      description: 'Quarterly Infrastructure Allowance',
      createdAt: '2024-09-01T00:00:00Z',
      reference: 'PROMO-Q3',
    },
  ],
};

export const INITIAL_SETTINGS: BillingSettings = {
  autoPay: true,
  defaultPaymentMethodId: 'card-1',
  invoiceEmails: true,
  renewalReminders: true,
  reminderDaysBefore: 3,
  taxId: 'GB982441022',
  companyName: 'StashrNode Ltd.',
  billingAddress: {
    line1: '128 Infrastructure Way',
    line2: 'Suite 404',
    city: 'London',
    state: 'Greater London',
    postalCode: 'EC2A 4NE',
    country: 'United Kingdom',
  },
};

export const INITIAL_STATS: DashboardStats = {
  totalSpent: 2847.50,
  amountDue: 89.98,
  walletBalance: 24.50,
  activeSubscriptions: 3,
  nextRenewalDate: '2024-12-01',
  nextRenewalAmount: 44.99,
  monthlyTrend: [
    { month: 'Jun', amount: 64.99 },
    { month: 'Jul', amount: 84.97 },
    { month: 'Aug', amount: 84.97 },
    { month: 'Sep', amount: 104.96 },
    { month: 'Oct', amount: 84.97 },
    { month: 'Nov', amount: 84.97 },
  ],
};

// State simulation wrapper with local storage persistence
class BillingApiClient {
  private getStore<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const stored = localStorage.getItem(`stashr_billing_${key}`);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  }

  private setStore<T>(key: string, data: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`stashr_billing_${key}`, JSON.stringify(data));
    } catch {
      // storage unavailable
    }
  }

  async getInvoices(): Promise<Invoice[]> {
    return this.getStore('invoices', INITIAL_INVOICES);
  }

  async getInvoiceById(id: string): Promise<Invoice | null> {
    const list = await this.getInvoices();
    return list.find((i) => i.id === id || i.invoiceNumber === id) || null;
  }

  async payInvoice(invoiceId: string, cardLast4: string): Promise<{ success: boolean; invoice: Invoice }> {
    const invoices = await this.getInvoices();
    const index = invoices.findIndex((i) => i.id === invoiceId || i.invoiceNumber === invoiceId);
    if (index === -1) throw new Error('Invoice not found');

    const txId = `TXN-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString().split('T')[0];

    const updated: Invoice = {
      ...invoices[index],
      status: 'paid',
      paidAt: now,
      paymentMethod: 'card',
      transactionId: txId,
      notes: `Paid with card ending in ${cardLast4} on ${now}`,
    };

    invoices[index] = updated;
    this.setStore('invoices', invoices);

    // Record transaction
    const transactions = await this.getTransactions();
    const newTx: Transaction = {
      id: txId,
      type: 'charge',
      amount: updated.total,
      currency: updated.currency,
      description: `Payment for ${updated.invoiceNumber}`,
      invoiceId: updated.id,
      paymentMethod: 'card',
      status: 'completed',
      createdAt: new Date().toISOString(),
    };
    transactions.unshift(newTx);
    this.setStore('transactions', transactions);

    return { success: true, invoice: updated };
  }

  async getSubscriptions(): Promise<Subscription[]> {
    return this.getStore('subscriptions', INITIAL_SUBSCRIPTIONS);
  }

  async updateSubscriptionTier(subId: string, newTier: SubscriptionTier, newPrice: number): Promise<Subscription> {
    const subs = await this.getSubscriptions();
    const idx = subs.findIndex((s) => s.id === subId);
    if (idx === -1) throw new Error('Subscription not found');

    subs[idx] = {
      ...subs[idx],
      tier: newTier,
      pricePerCycle: newPrice,
    };
    this.setStore('subscriptions', subs);
    return subs[idx];
  }

  async toggleSubscriptionStatus(subId: string): Promise<Subscription> {
    const subs = await this.getSubscriptions();
    const idx = subs.findIndex((s) => s.id === subId);
    if (idx === -1) throw new Error('Subscription not found');

    const currentStatus = subs[idx].status;
    subs[idx].status = currentStatus === 'active' ? 'paused' : 'active';
    this.setStore('subscriptions', subs);
    return subs[idx];
  }

  async getTransactions(): Promise<Transaction[]> {
    return this.getStore('transactions', INITIAL_TRANSACTIONS);
  }

  async getPaymentCards(): Promise<PaymentCard[]> {
    return this.getStore('cards', INITIAL_CARDS);
  }

  async addPaymentCard(card: Omit<PaymentCard, 'id'>): Promise<PaymentCard> {
    const cards = await this.getPaymentCards();
    const newCard: PaymentCard = {
      ...card,
      id: `card-${Date.now()}`,
    };
    if (newCard.isDefault) {
      cards.forEach((c) => (c.isDefault = false));
    }
    cards.push(newCard);
    this.setStore('cards', cards);
    return newCard;
  }

  async setDefaultCard(id: string): Promise<void> {
    const cards = await this.getPaymentCards();
    cards.forEach((c) => (c.isDefault = c.id === id));
    this.setStore('cards', cards);
  }

  async removeCard(id: string): Promise<void> {
    const cards = await this.getPaymentCards();
    const filtered = cards.filter((c) => c.id !== id);
    this.setStore('cards', filtered);
  }

  async getWallet(): Promise<Wallet> {
    return this.getStore('wallet', INITIAL_WALLET);
  }

  async topUpWallet(amount: number): Promise<Wallet> {
    const wallet = await this.getWallet();
    wallet.balance += amount;
    wallet.totalCreditsAdded += amount;
    wallet.transactions.unshift({
      id: `wtx-${Date.now()}`,
      type: 'credit',
      amount,
      description: 'Wallet Top-Up via Card',
      createdAt: new Date().toISOString(),
      reference: `TOPUP-${Math.floor(1000 + Math.random() * 9000)}`,
    });
    this.setStore('wallet', wallet);
    return wallet;
  }

  async getSettings(): Promise<BillingSettings> {
    return this.getStore('settings', INITIAL_SETTINGS);
  }

  async updateSettings(settings: BillingSettings): Promise<BillingSettings> {
    this.setStore('settings', settings);
    return settings;
  }

  async getDashboardStats(): Promise<DashboardStats> {
    return this.getStore('dashboard_stats', INITIAL_STATS);
  }
}

export const billingApi = new BillingApiClient();
