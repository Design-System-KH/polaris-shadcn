import type { ReactNode } from 'react';

export interface FocusProps {
  children?: ReactNode;
}

/**
 * Focus — Moves focus to its child when it becomes active.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function Focus({ children }: FocusProps) {
  return <>{children}</>;
}
