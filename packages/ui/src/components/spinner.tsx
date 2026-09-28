import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export type SpinnerTone = 'info' | 'success' | 'warning' | 'critical';

export interface SpinnerProps {
  children?: ReactNode;
  className?: string;
  tone?: SpinnerTone;
  title?: string;
}

const TONES: Record<SpinnerTone, { bg: string; text: string }> = {
  info: { bg: 'bg-surface-info', text: 'text-info' },
  success: { bg: 'bg-surface-success', text: 'text-success' },
  warning: { bg: 'bg-surface-warning', text: 'text-caution' },
  critical: { bg: 'bg-surface-critical', text: 'text-critical' },
};

/**
 * Spinner — Indeterminate progress.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function Spinner({ children, className, tone = 'info', title }: SpinnerProps) {
  const t = TONES[tone];
  return (
    <div
      // Announced politely rather than assertively: this reports state, it does
      // not interrupt. Errors that must interrupt use role="alert".
      role={tone === 'critical' ? 'alert' : 'status'}
      className={cn('flex flex-col gap-[var(--p-space-100)]', className)}
      style={{
        background: `var(--p-color-${t.bg})`,
        color: `var(--p-color-${t.text})`,
        padding: 'var(--p-space-300)',
        borderRadius: 'var(--p-border-radius-200)',
      }}
    >
      {title ? <strong style={{ fontWeight: 'var(--p-font-weight-semibold)' }}>{title}</strong> : null}
      {children}
    </div>
  );
}
