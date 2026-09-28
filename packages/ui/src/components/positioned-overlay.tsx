import type { ReactNode } from 'react';

export interface PositionedOverlayProps {
  children?: ReactNode;
}

/**
 * PositionedOverlay — Positions an overlay against an activator.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function PositionedOverlay({ children }: PositionedOverlayProps) {
  return <>{children}</>;
}
