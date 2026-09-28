import type { ReactNode } from 'react';

export interface KeypressListenerProps {
  children?: ReactNode;
}

/**
 * KeypressListener — Declarative key handler.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function KeypressListener({ children }: KeypressListenerProps) {
  return <>{children}</>;
}
