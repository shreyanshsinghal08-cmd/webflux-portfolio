import { NextResponse } from 'next/server';
import { updateInvoiceToPaid, recordTransaction, deductWalletBalance, topUpWalletBalance } from '@/lib/invoicesData';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { invoiceId, amount, paymentMethod, cardDetails } = body;

    if (!invoiceId || amount === undefined || !paymentMethod) {
      return NextResponse.json({ success: false, error: 'Missing payment parameters' }, { status: 400 });
    }

    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    // Simulate real gateway processing latency & verification
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const transactionId = 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase();

    // If payment method is wallet balance, deduct from account
    if (paymentMethod === 'Wallet Balance' || paymentMethod === 'balance') {
      const ok = deductWalletBalance(numAmount);
      if (!ok) {
        return NextResponse.json({
          success: false,
          error: 'Insufficient wallet balance. Please select Card or Crypto, or top up your account.',
        }, { status: 400 });
      }
    }

    // Update invoice record to PAID
    if (invoiceId !== 'WALLET-TOPUP') {
      updateInvoiceToPaid(invoiceId, transactionId);
    } else {
      topUpWalletBalance(numAmount);
    }

    // Record the completed financial transaction
    recordTransaction({
      transactionId,
      invoiceId,
      amount: numAmount,
      paymentMethod,
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      gatewayResponse: '200 Payment Processed Successfully',
    });

    return NextResponse.json({
      success: true,
      transactionId,
      invoiceId,
      amountPaid: numAmount,
      currency: 'USD',
      status: 'PAID',
      gatewayResponse: '200 Payment Processed Successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Payment failed' }, { status: 500 });
  }
}
