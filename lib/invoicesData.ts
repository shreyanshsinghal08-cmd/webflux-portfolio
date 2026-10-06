export interface InvoiceItem {
  id: string;
  service: string;
  client: string;
  email: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  description: string;
  nodeSpecs?: {
    cpu: string;
    ram: string;
    storage: string;
    location: string;
    ip: string;
  };
  paidAt?: string;
  transactionId?: string;
}

export interface PaymentTransaction {
  transactionId: string;
  invoiceId: string;
  amount: number;
  paymentMethod: string;
  status: 'SUCCESS' | 'FAILED';
  timestamp: string;
  gatewayResponse: string;
}

// Global persistent in-memory store across hot-reloads
const globalInvoices = globalThis as unknown as {
  __CYBER_INVOICES__?: InvoiceItem[];
  __CYBER_TRANSACTIONS__?: PaymentTransaction[];
  __CYBER_WALLET_BALANCE__?: number;
};

if (!globalInvoices.__CYBER_INVOICES__) {
  globalInvoices.__CYBER_INVOICES__ = [
    {
      id: 'INV-2024-8891',
      service: 'Ryzen 9 7950X - 32GB Node',
      client: 'Alex Thompson (Hyperion Games)',
      email: 'alex.thompson@hyperion-games.io',
      date: '2024-11-01',
      dueDate: '2024-11-08',
      amount: 45.00,
      status: 'Pending',
      description: 'Dedicated Bare-Metal Node (32GB DDR5, 1TB NVMe, 1Gbps Port)',
      nodeSpecs: {
        cpu: 'AMD Ryzen 9 7950X (16c / 32t)',
        ram: '32 GB DDR5 ECC',
        storage: '1 TB PCIe 4.0 NVMe',
        location: 'London, UK (LON-01)',
        ip: '194.26.182.44',
      },
    },
    {
      id: 'INV-2024-8890',
      service: 'EPYC 9654 - 128GB Enterprise Cluster',
      client: 'Sarah Chen (Chen Tech)',
      email: 'sarah@chentechnologies.com',
      date: '2024-10-28',
      dueDate: '2024-11-04',
      amount: 120.00,
      status: 'Pending',
      description: 'High-Density Compute Cluster with Anti-DDoS Shield',
      nodeSpecs: {
        cpu: 'Dual AMD EPYC 9654 (192 Cores)',
        ram: '128 GB DDR5 RECC',
        storage: '2x 3.84TB Enterprise NVMe',
        location: 'Frankfurt, DE (FRA-02)',
        ip: '185.107.56.91',
      },
    },
    {
      id: 'INV-2024-8889',
      service: 'Xeon Platinum 8480+ Cloud Instance',
      client: 'Marcus Webb (Nexus Cube)',
      email: 'marcus.webb@nexuscube.org',
      date: '2024-10-15',
      dueDate: '2024-10-22',
      amount: 107.99,
      status: 'Paid',
      paidAt: '2024-10-18T14:32:00Z',
      transactionId: 'TXN-982314-NW',
      description: 'Monthly Cloud Instance Subscription & Isolated VPC',
      nodeSpecs: {
        cpu: 'Intel Xeon Platinum 8480+ (32 vCPU)',
        ram: '64 GB DDR5',
        storage: '800 GB NVMe Storage',
        location: 'New York, USA (NYC-01)',
        ip: '198.51.100.25',
      },
    },
    {
      id: 'INV-2024-8888',
      service: 'Global Anycast Edge DDoS Proxy',
      client: 'Priya Patel (Zenith Hosting)',
      email: 'priya@zenithhosting.uk',
      date: '2024-10-10',
      dueDate: '2024-10-17',
      amount: 14.99,
      status: 'Paid',
      paidAt: '2024-10-12T09:15:00Z',
      transactionId: 'TXN-441209-ZH',
      description: 'Layer 3/4/7 Terabit DDoS Filtering Gateway',
      nodeSpecs: {
        cpu: 'Shared Anycast Routing Tier',
        ram: 'N/A (Edge Network)',
        storage: 'Static Asset Cache (500GB)',
        location: 'Global (34 Edge POPs)',
        ip: '195.12.50.1',
      },
    },
    {
      id: 'INV-2024-8887',
      service: 'NVMe Storage Pool - 4TB Block Device',
      client: 'Devin Vance (Starlight Labs)',
      email: 'devin@starlight.io',
      date: '2024-09-30',
      dueDate: '2024-10-07',
      amount: 38.00,
      status: 'Paid',
      paidAt: '2024-10-02T11:40:00Z',
      transactionId: 'TXN-773412-SL',
      description: 'Redundant Ceph RBD Block Volume with Automated Snapshots',
    },
  ];
}

if (!globalInvoices.__CYBER_TRANSACTIONS__) {
  globalInvoices.__CYBER_TRANSACTIONS__ = [
    {
      transactionId: 'TXN-982314-NW',
      invoiceId: 'INV-2024-8889',
      amount: 107.99,
      paymentMethod: 'Credit Card (Stripe)',
      status: 'SUCCESS',
      timestamp: '2024-10-18T14:32:00Z',
      gatewayResponse: '200 Payment Processed Successfully',
    },
    {
      transactionId: 'TXN-441209-ZH',
      invoiceId: 'INV-2024-8888',
      amount: 14.99,
      paymentMethod: 'Account Balance',
      status: 'SUCCESS',
      timestamp: '2024-10-12T09:15:00Z',
      gatewayResponse: '200 Debited from Wallet Balance',
    },
  ];
}

if (typeof globalInvoices.__CYBER_WALLET_BALANCE__ !== 'number') {
  globalInvoices.__CYBER_WALLET_BALANCE__ = 1240.00;
}

export function getInvoices(): InvoiceItem[] {
  return globalInvoices.__CYBER_INVOICES__!;
}

export function getInvoiceById(id: string): InvoiceItem | undefined {
  return globalInvoices.__CYBER_INVOICES__!.find((inv) => inv.id.toLowerCase() === id.toLowerCase());
}

export function updateInvoiceToPaid(id: string, transactionId: string): InvoiceItem | null {
  const inv = globalInvoices.__CYBER_INVOICES__!.find((i) => i.id.toLowerCase() === id.toLowerCase());
  if (inv) {
    inv.status = 'Paid';
    inv.paidAt = new Date().toISOString();
    inv.transactionId = transactionId;
    return inv;
  }
  return null;
}

export function addInvoice(newInv: Omit<InvoiceItem, 'id'> & { id?: string }): InvoiceItem {
  const id = newInv.id || `INV-2024-${Math.floor(1000 + Math.random() * 9000)}`;
  const invoice: InvoiceItem = {
    ...newInv,
    id,
    status: newInv.status || 'Pending',
  };
  globalInvoices.__CYBER_INVOICES__!.unshift(invoice);
  return invoice;
}

export function getWalletBalance(): number {
  return globalInvoices.__CYBER_WALLET_BALANCE__!;
}

export function deductWalletBalance(amount: number): boolean {
  if (globalInvoices.__CYBER_WALLET_BALANCE__! >= amount) {
    globalInvoices.__CYBER_WALLET_BALANCE__! -= amount;
    return true;
  }
  return false;
}

export function topUpWalletBalance(amount: number): number {
  globalInvoices.__CYBER_WALLET_BALANCE__! += amount;
  return globalInvoices.__CYBER_WALLET_BALANCE__!;
}

export function recordTransaction(tx: PaymentTransaction) {
  globalInvoices.__CYBER_TRANSACTIONS__!.unshift(tx);
}

export function getTransactions(): PaymentTransaction[] {
  return globalInvoices.__CYBER_TRANSACTIONS__!;
}
