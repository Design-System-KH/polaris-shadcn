import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import type { SpaceScale } from '../lib/tokens.js';

export interface LabelledProps {
  children?: ReactNode;
  className?: string;
  gap?: SpaceScale;
  padding?: SpaceScale;
}

/**
 * Labelled — Label, help text and error wrapper for a control.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function Labelled({ children, className, gap, padding }: LabelledProps) {
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
