import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface UnstyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

/**
 * UnstyledButton — A button with no visual styling but full button semantics.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export const UnstyledButton = forwardRef<HTMLButtonElement, UnstyledButtonProps>(function UnstyledButton(
  { children, className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'inline-flex items-center gap-[var(--p-space-100)] rounded-[var(--p-border-radius-200)]',
        'outline-none focus-visible:outline-2 focus-visible:outline-offset-1',
        'focus-visible:outline-[var(--p-color-border-focus)]',
        'disabled:pointer-events-none disabled:text-[var(--p-color-text-disabled)]',
        className,
      )}
      style={{ color: 'var(--p-color-text-emphasis)' }}
      {...rest}
    >
      {children}
    </button>
  );
});
