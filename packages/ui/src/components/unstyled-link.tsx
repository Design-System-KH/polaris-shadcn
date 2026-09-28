import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface UnstyledLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

/**
 * UnstyledLink — A link with no visual styling.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export const UnstyledLink = forwardRef<HTMLButtonElement, UnstyledLinkProps>(function UnstyledLink(
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
