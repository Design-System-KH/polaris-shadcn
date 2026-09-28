import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface DataTableItem {
  id: string;
  content: ReactNode;
}

export interface DataTableProps {
  items?: DataTableItem[];
  className?: string;
  /** Distinguishes "nothing yet" from "the filter matched nothing". */
  isFiltered?: boolean;
  loading?: boolean;
  emptyState?: ReactNode;
}

/**
 * DataTable — Tabular data with sorting and totals.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function DataTable({ items = [], className, isFiltered = false, loading = false, emptyState }: DataTableProps) {
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
