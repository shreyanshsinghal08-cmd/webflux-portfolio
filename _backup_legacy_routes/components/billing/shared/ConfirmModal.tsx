'use client';

import { ReactNode } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDanger = false,
  onConfirm,
  onCancel,
  children,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stashr-bg/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card max-w-md w-full p-6 border border-stashr-border shadow-2xl animate-slide-up relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-stashr-text-dim hover:text-stashr-text-body transition-colors p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
              isDanger
                ? 'bg-stashr-status-overdue/10 text-stashr-status-overdue'
                : 'bg-stashr-primary/10 text-stashr-primary-light'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stashr-text-heading">{title}</h3>
            <p className="text-xs text-stashr-text-dim">Action requires confirmation</p>
          </div>
        </div>

        <p className="text-sm text-stashr-text-muted mb-6 leading-relaxed">
          {message}
        </p>

        {children && <div className="mb-6">{children}</div>}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-stashr-border">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary text-sm"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={isDanger ? 'btn-danger text-sm' : 'btn-primary text-sm'}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
