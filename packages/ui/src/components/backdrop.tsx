import type { ReactNode } from 'react';

export interface BackdropProps {
  children?: ReactNode;
}

/**
 * Backdrop — Scrim behind an overlay.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function Backdrop({ children }: BackdropProps) {
  return <>{children}</>;
}
