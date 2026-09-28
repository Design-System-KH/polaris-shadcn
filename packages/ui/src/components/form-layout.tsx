import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import type { SpaceScale } from '../lib/tokens.js';

export interface FormLayoutProps {
  children?: ReactNode;
  className?: string;
  gap?: SpaceScale;
  padding?: SpaceScale;
}

/**
 * FormLayout — Consistent spacing and grouping for form fields.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function FormLayout({ children, className, gap, padding }: FormLayoutProps) {
  return (
    <div
      className={cn('flex flex-col', className)}
      style={{
        gap: gap ? `var(--p-space-${gap})` : undefined,
        padding: padding ? `var(--p-space-${padding})` : undefined,
      }}
    >
      {children}
    </div>
  );
}
