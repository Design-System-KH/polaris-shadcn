import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface PaginationItem {
  id: string;
  label: string;
  href?: string;
  selected?: boolean;
}

export interface PaginationProps {
  items?: PaginationItem[];
  className?: string;
  ariaLabel?: string;
  children?: ReactNode;
}

/**
 * Pagination — Previous and next across a result set.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function Pagination({ items = [], className, ariaLabel = 'Pagination', children }: PaginationProps) {
  return (
    <nav aria-label={ariaLabel} className={cn('flex items-center gap-[var(--p-space-100)]', className)}>
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href ?? '#'}
          // aria-current, not colour alone: the selected state must survive
          // greyscale and reach assistive technology.
          aria-current={item.selected ? 'page' : undefined}
          style={{
            padding: 'var(--p-space-200) var(--p-space-300)',
            borderRadius: 'var(--p-border-radius-200)',
            background: item.selected ? 'var(--p-color-bg-surface-selected)' : undefined,
            color: item.selected ? 'var(--p-color-text-emphasis)' : 'var(--p-color-text)',
            fontWeight: item.selected ? 'var(--p-font-weight-medium)' : undefined,
          }}
        >
          {item.label}
        </a>
      ))}
      {children}
    </nav>
  );
}
