import type { ReactNode } from 'react';

export interface PortalsManagerProps {
  children?: ReactNode;
}

/**
 * PortalsManager — Coordinates portal containers.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function PortalsManager({ children }: PortalsManagerProps) {
  return <>{children}</>;
}
