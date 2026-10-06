import type { PaymentCard } from '@/types/billing';

export interface PaymentIntentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export function detectCardBrand(cardNumber: string): PaymentCard['brand'] {
  const cleanNumber = cardNumber.replace(/\s+/g, '');
  if (/^4/.test(cleanNumber)) return 'visa';
  if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)/.test(cleanNumber)) return 'mastercard';
  if (/^3[47]/.test(cleanNumber)) return 'amex';
  return 'visa';
}

export function formatCardNumberInput(value: string): string {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts: string[] = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(' ');
  } else {
    return value;
  }
}

export function formatExpiryInput(value: string): string {
  const clean = value.replace(/[^0-9]/g, '');
  if (clean.length >= 2) {
    return `${clean.substring(0, 2)}/${clean.substring(2, 4)}`;
  }
  return clean;
}

export function validateExpiry(expiryStr: string): boolean {
  const parts = expiryStr.split('/');
  if (parts.length !== 2) return false;
  const month = parseInt(parts[0], 10);
  const year = parseInt(parts[1], 10);

  if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
    return false;
  }

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
}

export function validateCvc(cvc: string, brand: PaymentCard['brand'] = 'visa'): boolean {
  const clean = cvc.trim();
  const requiredLength = brand === 'amex' ? 4 : 3;
  return clean.length === requiredLength && /^\d+$/.test(clean);
}

/**
 * Simulates fintech Stripe payment intent creation and authorization
 */
export async function simulateStripePayment(params: {
  amount: number;
  currency: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  cardHolder: string;
}): Promise<PaymentIntentResult> {
  // Artificial network latency simulation
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!params.cardNumber || params.cardNumber.replace(/\s+/g, '').length < 15) {
    return { success: false, error: 'Invalid card number.' };
  }

  if (!validateExpiry(params.expiry)) {
    return { success: false, error: 'Invalid or expired card date.' };
  }

  if (!validateCvc(params.cvc, detectCardBrand(params.cardNumber))) {
    return { success: false, error: 'Invalid security code (CVC).' };
  }

  const randomTxId = `TXN-${Math.floor(1000 + Math.random() * 9000)}`;
  return {
    success: true,
    transactionId: randomTxId,
  };
}
