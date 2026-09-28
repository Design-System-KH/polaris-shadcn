import type { ElementType, ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface InlineCodeProps {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * InlineCode — Monospace inline code.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function InlineCode({ children, className, as: Component = 'span' }: InlineCodeProps) {
  return (
    <Component
      className={cn(className)}
      style={{
        fontSize: 'var(--p-font-size-325)',
        lineHeight: 'var(--p-font-line-height-500)',
        color: 'var(--p-color-text)',
      }}
    >
      {children}
    </Component>
  );
}
