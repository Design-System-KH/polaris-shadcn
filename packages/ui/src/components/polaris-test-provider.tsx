import type { ReactNode } from 'react';

export interface PolarisTestProviderProps {
  children?: ReactNode;
}

/**
 * PolarisTestProvider — Provider stub for tests.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function PolarisTestProvider({ children }: PolarisTestProviderProps) {
  return <>{children}</>;
}
