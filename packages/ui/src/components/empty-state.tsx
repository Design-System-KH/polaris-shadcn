import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface EmptyStateProps {
  children?: ReactNode;
  className?: string;
  title?: string;
  /** Rendered after the body. Keep to one primary action. */
  actions?: ReactNode;
}

/**
 * EmptyState — First-run empty state with one clear action.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function EmptyState({ children, className, title, actions }: EmptyStateProps) {
  return (
    <section
      className={cn('flex flex-col gap-[var(--p-space-400)] overflow-hidden', className)}
      style={{
        background: 'var(--p-color-bg-surface)',
        padding: 'var(--p-space-400)',
        borderRadius: 'var(--p-border-radius-300)',
        boxShadow: 'var(--p-shadow-100)',
        outline: 'var(--p-border-width-025) solid var(--p-color-border)',
        outlineOffset: 'calc(var(--p-border-width-025) * -1)',
      }}
    >
      {title ? (
        <h2
          style={{
            fontSize: 'var(--p-font-size-350)',
            fontWeight: 'var(--p-font-weight-semibold)',
            lineHeight: 'var(--p-font-line-height-500)',
          }}
        >
          {title}
        </h2>
      ) : null}
      {children}
      {actions ? <div className="flex gap-[var(--p-space-200)]">{actions}</div> : null}
    </section>
  );
}
