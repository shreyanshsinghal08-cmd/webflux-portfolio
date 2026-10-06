'use client';

import BillingShell from '@/components/billing/layout/BillingShell';
import WalletBalance from '@/components/billing/wallet/WalletBalance';
import TopUpForm from '@/components/billing/wallet/TopUpForm';
import CreditHistory from '@/components/billing/wallet/CreditHistory';
import { useWallet } from '@/hooks/useWallet';

export default function WalletPage() {
  const { wallet, balance, transactions, topUp } = useWallet();

  const handleQuickTopUp = async (amount: number) => {
    await topUp(amount);
  };

  return (
    <BillingShell
      pageTitle="Cloud Wallet & Credits"
      pageSubtitle="Pre-fund credit reserve, review automated balance offsets, and audit ledger"
      walletBalance={balance}
    >
      <div className="space-y-8">
        <WalletBalance
          wallet={wallet}
          onQuickTopUp={handleQuickTopUp}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <TopUpForm onTopUp={topUp} />
          <CreditHistory transactions={transactions} />
        </div>
      </div>
    </BillingShell>
  );
}
