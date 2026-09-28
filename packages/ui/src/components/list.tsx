import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface ListItem {
  id: string;
  content: ReactNode;
}

export interface ListProps {
  items?: ListItem[];
  className?: string;
  /** Distinguishes "nothing yet" from "the filter matched nothing". */
  isFiltered?: boolean;
  loading?: boolean;
  emptyState?: ReactNode;
}

/**
 * List — Bulleted or numbered list.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function List({ items = [], className, isFiltered = false, loading = false, emptyState }: ListProps) {
  if (loading) {
    return (
      <div aria-busy="true" className={cn('flex flex-col gap-[var(--p-space-200)]', className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-10 animate-pulse"
            style={{ background: 'var(--p-color-bg-fill-disabled)', borderRadius: 'var(--p-border-radius-200)' }}
          />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={cn('py-[var(--p-space-800)] text-center', className)} style={{ color: 'var(--p-color-text-secondary)' }}>
        {emptyState ?? (isFiltered ? 'No results match these filters.' : 'Nothing here yet.')}
      </div>
    );
  }

  return (
    <ul className={cn('flex flex-col', className)}>
      {items.map((item) => (
        <li
          key={item.id}
          style={{
            padding: 'var(--p-space-300)',
            borderBlockEnd: 'var(--p-border-width-025) solid var(--p-color-border-secondary)',
          }}
        >
          {item.content}
        </li>
      ))}
    </ul>
  );
}
