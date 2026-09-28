import type { ReactNode } from 'react';

export interface TrapFocusProps {
  children?: ReactNode;
}

/**
 * TrapFocus — Keeps focus within its children while active.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function TrapFocus({ children }: TrapFocusProps) {
  return <>{children}</>;
}
