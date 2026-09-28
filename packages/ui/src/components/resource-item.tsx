import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import type { SpaceScale } from '../lib/tokens.js';

export interface ResourceItemProps {
  children?: ReactNode;
  className?: string;
  gap?: SpaceScale;
  padding?: SpaceScale;
}

/**
 * ResourceItem — A single row within a ResourceList.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function ResourceItem({ children, className, gap, padding }: ResourceItemProps) {
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
