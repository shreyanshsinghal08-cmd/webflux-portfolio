export type CurrencyCode = 'GBP' | 'USD' | 'EUR';

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  GBP: '£',
  USD: '$',
  EUR: '€',
};

/**
 * Format a numeric amount to a standard currency string (defaults to GBP)
 */
export function formatCurrency(
  amount: number,
  currency: CurrencyCode = 'GBP',
  options: { showSymbol?: boolean; decimals?: number } = {}
): string {
  const { showSymbol = true, decimals = 2 } = options;
  const symbol = showSymbol ? (CURRENCY_SYMBOLS[currency] || '£') : '';
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount).toLocaleString('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return `${isNegative ? '-' : ''}${symbol}${absAmount}`;
}

/**
 * Format specifically to GBP
 */
export function formatGBP(amount: number, decimals: number = 2): string {
  return formatCurrency(amount, 'GBP', { decimals });
}

/**
 * Parse currency string to raw numeric float
 */
export function parseCurrency(input: string): number {
  if (!input) return 0;
  const sanitized = input.replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(sanitized);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Calculate VAT / Tax amount given subtotal and rate percentage
 */
export function calculateTax(subtotal: number, taxRatePercentage: number = 20): number {
  return Math.round((subtotal * (taxRatePercentage / 100)) * 100) / 100;
}

/**
 * Compute total invoice value from subtotal, tax, and discount
 */
export function computeTotal(subtotal: number, tax: number, discount: number = 0): number {
  const total = subtotal + tax - discount;
  return Math.max(0, Math.round(total * 100) / 100);
}
