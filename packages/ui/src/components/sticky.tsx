import type { ReactNode } from 'react';

export interface StickyProps {
  children?: ReactNode;
}

/**
 * Sticky — Sticks its children while the container scrolls.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function Sticky({ children }: StickyProps) {
  return <>{children}</>;
}
