import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface TooltipProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * Tooltip — Supplementary text on hover and focus. Never the only source.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function Tooltip({ open = false, onClose, title, children, className }: TooltipProps) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className={cn('flex flex-col gap-[var(--p-space-300)]', className)}
      style={{
        background: 'var(--p-color-bg-surface)',
        padding: 'var(--p-space-400)',
        borderRadius: 'var(--p-border-radius-300)',
        boxShadow: 'var(--p-shadow-400)',
      }}
    >
      {title ? (
        <h2 style={{ fontSize: 'var(--p-font-size-400)', fontWeight: 'var(--p-font-weight-semibold)' }}>
          {title}
        </h2>
      ) : null}
      {children}
      {onClose ? (
        <button type="button" onClick={onClose} style={{ color: 'var(--p-color-text-emphasis)' }}>
          Close
        </button>
      ) : null}
    </div>
  );
}
