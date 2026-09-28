import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import type { SpaceScale } from '../lib/tokens.js';

export interface ButtonGroupProps {
  children?: ReactNode;
  className?: string;
  gap?: SpaceScale;
  padding?: SpaceScale;
}

/**
 * ButtonGroup — Related buttons, optionally segmented.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function ButtonGroup({ children, className, gap, padding }: ButtonGroupProps) {
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
