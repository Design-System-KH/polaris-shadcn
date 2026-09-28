import type { ReactNode } from 'react';

export interface AppProviderProps {
  children?: ReactNode;
}

/**
 * AppProvider — Root provider: theme, i18n, link component.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function AppProvider({ children }: AppProviderProps) {
  return <>{children}</>;
}
