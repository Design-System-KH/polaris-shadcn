import type { ReactNode } from 'react';

export interface ThemeProviderProps {
  children?: ReactNode;
}

/**
 * ThemeProvider — Applies a theme to its subtree.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return <>{children}</>;
}
