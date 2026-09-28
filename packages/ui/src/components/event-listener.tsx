import type { ReactNode } from 'react';

export interface EventListenerProps {
  children?: ReactNode;
}

/**
 * EventListener — Declarative window event listener.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function EventListener({ children }: EventListenerProps) {
  return <>{children}</>;
}
