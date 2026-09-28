import type { ElementType, ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface LabelProps {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Label — A field label, associated by id.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function Label({ children, className, as: Component = 'span' }: LabelProps) {
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
