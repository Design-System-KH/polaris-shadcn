import type { ElementType, ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface KeyboardKeyProps {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * KeyboardKey — A keyboard key, rendered as a key cap.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function KeyboardKey({ children, className, as: Component = 'span' }: KeyboardKeyProps) {
  return (
    <Component
      className={cn(className)}
      style={{
        fontSize: 'var(--p-font-size-325)',
        lineHeight: 'var(--p-font-line-height-500)',
        color: 'var(--p-color-text)',
      }}
    >
      {children}
    </Component>
  );
}
