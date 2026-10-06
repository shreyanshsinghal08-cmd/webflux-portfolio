'use client';

import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import type { ToastMessage } from '@/hooks/useNotifications';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function Toast({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-stashr-status-paid flex-shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-stashr-status-overdue flex-shrink-0" />,
          info: <Info className="w-5 h-5 text-stashr-primary-cyan flex-shrink-0" />,
        };

        const borderColors = {
          success: 'border-stashr-status-paid/30',
          error: 'border-stashr-status-overdue/30',
          info: 'border-stashr-primary-cyan/30',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-stashr-surface-elevated/95 backdrop-blur-[16px] border ${borderColors[toast.type]} shadow-2xl animate-slide-up transition-all duration-200`}
          >
            {icons[toast.type]}
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-stashr-text-heading">{toast.title}</h4>
              {toast.message && (
                <p className="text-xs text-stashr-text-muted mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-stashr-text-dim hover:text-stashr-text-body transition-colors p-1"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
