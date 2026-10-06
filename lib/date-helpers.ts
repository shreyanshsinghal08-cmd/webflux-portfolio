import type { BillingCycle } from '@/types/billing';

export function formatReadableDate(dateString: string): string {
  if (!dateString) return '—';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(dateString: string): string {
  if (!dateString) return '—';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getDaysRemaining(dueDateString: string): number {
  if (!dueDateString) return 0;
  const targetDate = new Date(dueDateString);
  const now = new Date();
  
  // Set both to midnight UTC for pure calendar day diff
  const utcTarget = Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const utcNow = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = utcTarget - utcNow;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function formatDaysRemainingText(dueDateString: string): { text: string; urgent: boolean; warning: boolean } {
  const days = getDaysRemaining(dueDateString);
  if (days < 0) {
    return { text: `${Math.abs(days)} days overdue`, urgent: true, warning: false };
  }
  if (days === 0) {
    return { text: 'Due today', urgent: true, warning: false };
  }
  if (days === 1) {
    return { text: '1 day left', urgent: true, warning: false };
  }
  if (days <= 5) {
    return { text: `${days} days left`, urgent: false, warning: true };
  }
  return { text: `${days} days left`, urgent: false, warning: false };
}

export function computeNextPeriodEnd(startDate: string, cycle: BillingCycle): string {
  const date = new Date(startDate);
  if (isNaN(date.getTime())) return startDate;

  if (cycle === 'monthly') {
    date.setMonth(date.getMonth() + 1);
  } else if (cycle === 'quarterly') {
    date.setMonth(date.getMonth() + 3);
  } else if (cycle === 'annually') {
    date.setFullYear(date.getFullYear() + 1);
  }

  return date.toISOString().split('T')[0];
}
