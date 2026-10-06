'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CreditCard,
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  Wallet,
  Coins,
  ArrowLeft,
  Copy,
  Check,
  Zap,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { InvoiceItem } from '@/lib/invoicesData';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryInvoice = searchParams.get('invoice') || 'INV-2024-8891';
  const queryAmount = searchParams.get('amount') || '45.00';

  const [selectedInvoice, setSelectedInvoice] = useState(queryInvoice);
  const [amount, setAmount] = useState(parseFloat(queryAmount) || 45.0);
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [walletBalance, setWalletBalance] = useState(1240.0);

  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'crypto'>('card');

  // Card details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState('Alex Thompson');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('884');

  // Crypto details
  const [cryptoCoin, setCryptoCoin] = useState<'USDT' | 'BTC' | 'ETH' | 'SOL'>('USDT');
  const [copied, setCopied] = useState(false);

  // Processing & State
  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successReceipt, setSuccessReceipt] = useState<any | null>(null);

  // Fetch real invoices and balance
  useEffect(() => {
    fetch('/api/invoices')
      .then((res) => res.json())
      .then((data) => {
        if (data.invoices) {
          setInvoices(data.invoices);
          const found = data.invoices.find((i: InvoiceItem) => i.id === queryInvoice);
          if (found) {
            setAmount(found.amount);
          }
        }
        if (data.balance !== undefined) setWalletBalance(data.balance);
      })
      .catch(() => {});
  }, [queryInvoice]);

  const handleInvoiceChange = (invId: string) => {
    setSelectedInvoice(invId);
    const target = invoices.find((i) => i.id === invId);
    if (target) {
      setAmount(target.amount);
    }
  };

  const handleCopyCrypto = () => {
    const address = '0x71C...CyberPaymentGatewayAddress';
    navigator.clipboard?.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecutePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setProcessing(true);

    const steps = [
      'Establishing TLS 1.3 encrypted tunnel...',
      'Submitting payload to payment network...',
      'Verifying 3D Secure / Ledger signature...',
      'Finalizing transaction settlement...',
    ];

    let stepIndex = 0;
    setProcessingStep(steps[0]);
    const stepInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setProcessingStep(steps[stepIndex]);
      }
    }, 400);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId: selectedInvoice,
          amount,
          paymentMethod:
            paymentMethod === 'card'
              ? 'Credit Card (Stripe)'
              : paymentMethod === 'wallet'
              ? 'Wallet Balance'
              : `Crypto (${cryptoCoin})`,
          cardDetails:
            paymentMethod === 'card'
              ? {
                  last4: cardNumber.replace(/\s+/g, '').slice(-4) || '4242',
                  holder: cardHolder,
                }
              : undefined,
        }),
      });

      const data = await response.json();
      clearInterval(stepInterval);

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Payment execution rejected');
      }

      setSuccessReceipt(data);
      // Update local wallet if deducted
      if (paymentMethod === 'wallet') {
        setWalletBalance((prev) => Math.max(0, prev - amount));
      }
    } catch (err: any) {
      clearInterval(stepInterval);
      setError(err.message || 'Payment processing failed. Please retry.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/invoices"
          className="flex items-center gap-2 text-sm text-[#8AB4F8] hover:text-[#00B8FF] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Cancel & Back</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-mono text-[#1BFF68]">
          <Lock size={14} />
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>

      <div className="text-center md:text-left">
        <h1 className="text-3xl font-heading font-bold text-[#E0F9FF]">
          Live Payment Gateway
        </h1>
        <p className="text-sm text-[#8AB4F8] mt-1 font-body">
          Settle infrastructure invoices instantly with automated ledger reconciliation.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 flex items-center gap-3 text-sm">
          <AlertCircle size={20} className="flex-shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Main 2-Column Checkout Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Payment Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Method Selection Tabs */}
          <div className="cyber-card p-4">
            <label className="block text-xs font-mono uppercase text-[#8AB4F8] mb-3">
              Select Payment Mechanism
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-lg border text-center transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === 'card'
                    ? 'bg-[#171229] border-[#00B8FF] text-[#00B8FF] shadow-neon'
                    : 'bg-[#010D2A] border-[#073E91] text-[#8AB4F8] hover:text-[#E0F9FF]'
                }`}
              >
                <CreditCard size={20} />
                <span className="text-xs font-medium">Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`p-3.5 rounded-lg border text-center transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === 'wallet'
                    ? 'bg-[#171229] border-[#00B8FF] text-[#00B8FF] shadow-neon'
                    : 'bg-[#010D2A] border-[#073E91] text-[#8AB4F8] hover:text-[#E0F9FF]'
                }`}
              >
                <Wallet size={20} />
                <span className="text-xs font-medium">Wallet Balance</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('crypto')}
                className={`p-3.5 rounded-lg border text-center transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === 'crypto'
                    ? 'bg-[#171229] border-[#00B8FF] text-[#00B8FF] shadow-neon'
                    : 'bg-[#010D2A] border-[#073E91] text-[#8AB4F8] hover:text-[#E0F9FF]'
                }`}
              >
                <Coins size={20} />
                <span className="text-xs font-medium">Crypto (Web3)</span>
              </button>
            </div>
          </div>

          {/* Form based on Selected Method */}
          <form onSubmit={handleExecutePayment} className="cyber-card space-y-5">
            {paymentMethod === 'card' && (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-[#073E91]">
                  <span className="text-xs font-mono text-[#8AB4F8]">Cardholder Information</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#073E91]/40 text-[#00B8FF]">
                      VISA
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#073E91]/40 text-[#0AD3C5]">
                      MASTERCARD
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8AB4F8] mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="cyber-input text-sm"
                    placeholder="Alex Thompson"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8AB4F8] mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="cyber-input text-sm font-mono tracking-wider"
                    placeholder="4242 4242 4242 4242"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#8AB4F8] mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="cyber-input text-sm font-mono"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#8AB4F8] mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="cyber-input text-sm font-mono"
                      placeholder="•••"
                    />
                  </div>
                </div>
              </>
            )}

            {paymentMethod === 'wallet' && (
              <div className="space-y-4 py-2">
                <div className="p-4 rounded-xl bg-[#171229] border border-[#073E91] space-y-2">
                  <div className="flex justify-between items-center text-xs text-[#8AB4F8]">
                    <span>Current Available Balance:</span>
                    <span className="font-mono text-[#1BFF68] font-bold text-base">
                      ${walletBalance.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-[#8AB4F8]">
                    <span>Amount to Deduct:</span>
                    <span className="font-mono text-[#E0F9FF] font-bold">${amount.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-[#073E91] flex justify-between items-center text-xs">
                    <span className="text-[#8AB4F8]">Post-Payment Balance:</span>
                    <span className="font-mono text-[#00B8FF] font-semibold">
                      ${Math.max(0, walletBalance - amount).toFixed(2)}
                    </span>
                  </div>
                </div>

                {walletBalance < amount ? (
                  <p className="text-xs text-red-400">
                    ⚠️ Insufficient balance for this transaction. Please select Card or top up your wallet.
                  </p>
                ) : (
                  <p className="text-xs text-[#1BFF68] flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> Balance verified. One-click instant deduction ready.
                  </p>
                )}
              </div>
            )}

            {paymentMethod === 'crypto' && (
              <div className="space-y-4 py-2">
                <div className="flex gap-2">
                  {(['USDT', 'BTC', 'ETH', 'SOL'] as const).map((coin) => (
                    <button
                      key={coin}
                      type="button"
                      onClick={() => setCryptoCoin(coin)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        cryptoCoin === coin
                          ? 'bg-[#00B8FF] text-[#171229]'
                          : 'bg-[#171229] text-[#8AB4F8] border border-[#073E91]'
                      }`}
                    >
                      {coin}
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-[#171229] border border-[#073E91] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8AB4F8]">Network:</span>
                    <span className="font-mono text-[#0AD3C5]">TRON TRC-20 / EVM Fast Layer</span>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#8AB4F8] mb-1">
                      Deposit Address:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        readOnly
                        value="0x71C9381A2b804E4D99810a9918B2f8C"
                        className="cyber-input text-xs font-mono !py-1.5 text-[#00B8FF]"
                      />
                      <button
                        type="button"
                        onClick={handleCopyCrypto}
                        className="cyber-btn-secondary !p-2 text-xs"
                        title="Copy Address"
                      >
                        {copied ? <Check size={14} className="text-[#1BFF68]" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#8AB4F8]/80 font-mono">
                    Rate: 1 {cryptoCoin} ≈ ${(amount).toFixed(2)} USD (Zero Slippage Lock)
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing || (paymentMethod === 'wallet' && walletBalance < amount)}
              className="w-full cyber-btn !py-3.5 text-sm font-heading font-bold uppercase tracking-wider shadow-neon-glow"
            >
              {processing ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#171229] border-t-transparent rounded-full animate-spin" />
                  <span>{processingStep}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Lock size={16} />
                  <span>Authorize & Pay ${amount.toFixed(2)} USD</span>
                </div>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-[#8AB4F8] pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-[#1BFF68]" />
                Zero-Knowledge Auth
              </span>
              <span>•</span>
              <span>Instant Ledger Update</span>
              <span>•</span>
              <span>No Hidden Fees</span>
            </div>
          </form>
        </div>

        {/* Right Column: Invoice Breakdown & Node Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="cyber-card space-y-4 border-[#073E91]">
            <h3 className="text-base font-heading font-bold text-[#E0F9FF] border-b border-[#073E91] pb-3">
              Order Breakdown
            </h3>

            {/* Target Invoice Selector */}
            <div>
              <label className="block text-xs font-mono text-[#8AB4F8] mb-1">
                Settling Invoice Target:
              </label>
              <select
                value={selectedInvoice}
                onChange={(e) => handleInvoiceChange(e.target.value)}
                className="cyber-input text-xs font-mono"
              >
                {invoices.map((inv) => (
                  <option key={inv.id} value={inv.id} className="bg-[#010D2A] text-[#E0F9FF]">
                    #{inv.id} — ${inv.amount.toFixed(2)} ({inv.status})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3.5 rounded-lg bg-[#171229] border border-[#073E91] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8AB4F8]">Item / Service:</span>
                <span className="font-medium text-[#E0F9FF] text-right truncate max-w-[200px]">
                  {invoices.find((i) => i.id === selectedInvoice)?.service || 'Cloud Bare-Metal Compute'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8AB4F8]">Billing Period:</span>
                <span className="font-mono text-[#E0F9FF]">30 Days Recurring</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8AB4F8]">High-Speed SLA:</span>
                <span className="font-mono text-[#1BFF68]">99.99% Guaranteed</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex justify-between text-[#8AB4F8]">
                <span>Base Infrastructure Charge</span>
                <span className="font-mono text-[#E0F9FF]">${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#8AB4F8]">
                <span>Payment Processing Fee</span>
                <span className="font-mono text-[#1BFF68]">$0.00 (Waived)</span>
              </div>
              <div className="flex justify-between text-[#8AB4F8]">
                <span>Reverse Charge VAT (0%)</span>
                <span className="font-mono text-[#E0F9FF]">$0.00</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#073E91] flex justify-between items-center">
              <div>
                <span className="text-xs font-mono uppercase text-[#8AB4F8]">Total Settlement</span>
                <p className="text-xs text-[#1BFF68]">Instant Authorization</p>
              </div>
              <p className="text-2xl font-heading font-bold text-[#00B8FF]">
                ${amount.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Infrastructure Guarantee Card */}
          <div className="cyber-card p-4 bg-[#171229]/60 border-[#073E91] flex items-center gap-3">
            <Zap size={24} className="text-[#00B8FF] flex-shrink-0" />
            <p className="text-xs text-[#8AB4F8] leading-relaxed">
              Upon successful payment authorization, your node configuration is guaranteed zero interruption with immediate invoice status transition to <strong className="text-[#1BFF68]">PAID</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Success Transaction Receipt Modal */}
      {successReceipt && (
        <div className="fixed inset-0 z-50 bg-[#171229]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="cyber-card w-full max-w-md text-center p-8 border-[#1BFF68] shadow-neon relative animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-[#1BFF68]/20 border border-[#1BFF68] flex items-center justify-center text-[#1BFF68] mx-auto mb-4 shadow-neon-glow">
              <CheckCircle2 size={36} />
            </div>

            <h2 className="text-2xl font-heading font-bold text-[#E0F9FF]">
              Payment Successful!
            </h2>
            <p className="text-xs text-[#8AB4F8] mt-1 font-body">
              Your financial transaction has settled on the StashrNode gateway.
            </p>

            <div className="my-6 p-4 rounded-xl bg-[#171229] border border-[#073E91] text-left text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8AB4F8]">Transaction ID:</span>
                <span className="text-[#00B8FF] font-bold">{successReceipt.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8AB4F8]">Invoice Settled:</span>
                <span className="text-[#E0F9FF]">#{successReceipt.invoiceId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8AB4F8]">Amount Paid:</span>
                <span className="text-[#1BFF68] font-bold">${successReceipt.amountPaid.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8AB4F8]">Status:</span>
                <span className="text-[#1BFF68] font-bold">200 SETTLED (PAID)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8AB4F8]">Timestamp:</span>
                <span className="text-[#8AB4F8]">{new Date(successReceipt.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/invoices/${successReceipt.invoiceId}`}
                className="cyber-btn-secondary flex-1 text-xs font-mono"
              >
                View Paid Receipt
              </Link>
              <Link
                href="/"
                className="cyber-btn flex-1 text-xs font-heading uppercase tracking-wider"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-[#8AB4F8] font-mono text-sm animate-pulse">
          Loading secure checkout module...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
