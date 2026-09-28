import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface PageProps {
  children?: ReactNode;
  className?: string;
  title?: string;
  /** One primary action per page. */
  primaryAction?: ReactNode;
  secondaryActions?: ReactNode;
}

/**
 * Page — Page shell: title, breadcrumbs, primary action, secondary actions.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function Page({ children, className, title, primaryAction, secondaryActions }: PageProps) {
  return (
    <div
      className={cn('mx-auto flex w-full max-w-[62.375rem] flex-col gap-[var(--p-space-400)]', className)}
      style={{ padding: 'var(--p-space-400)' }}
    >
      {(title || primaryAction || secondaryActions) && (
        <header className="flex flex-wrap items-center justify-between gap-[var(--p-space-300)]">
          {title ? (
            <h1 style={{ fontSize: 'var(--p-font-size-480)', fontWeight: 'var(--p-font-weight-bold)' }}>
              {title}
            </h1>
          ) : null}
          <div className="flex items-center gap-[var(--p-space-200)]">
            {secondaryActions}
            {primaryAction}
          </div>
        </header>
      )}
      {children}
    </div>
  );
}
