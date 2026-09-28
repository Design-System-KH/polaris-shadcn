import type { ReactNode } from 'react';

export interface ScrollLockProps {
  children?: ReactNode;
}

/**
 * ScrollLock — Locks body scroll while mounted.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function ScrollLock({ children }: ScrollLockProps) {
  return <>{children}</>;
}
