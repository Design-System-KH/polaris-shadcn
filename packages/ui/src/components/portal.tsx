import type { ReactNode } from 'react';

export interface PortalProps {
  children?: ReactNode;
}

/**
 * Portal — Renders children outside the DOM hierarchy.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function Portal({ children }: PortalProps) {
  return <>{children}</>;
}
