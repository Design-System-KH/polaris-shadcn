import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn.js';

const button = cva(
  [
    'inline-flex items-center justify-center gap-[var(--p-space-100)]',
    'whitespace-nowrap rounded-[var(--p-border-radius-200)]',
    'transition-colors duration-[var(--p-motion-duration-100)]',
    // focus-visible, not focus: :focus fires on mouse clicks too, which is why
    // developers remove the ring and break keyboard use for everyone.
    'outline-none focus-visible:outline-2 focus-visible:outline-offset-1',
    'focus-visible:outline-[var(--p-color-border-focus)]',
    'disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--p-color-bg-fill-brand)] text-[var(--p-color-text-brand-on-bg-fill)] shadow-[var(--p-shadow-button)] hover:bg-[var(--p-color-bg-fill-brand-hover)] active:bg-[var(--p-color-bg-fill-brand-active)] disabled:bg-[var(--p-color-bg-fill-disabled)] disabled:text-[var(--p-color-text-disabled)] disabled:shadow-none',
        secondary:
          'bg-[var(--p-color-bg-fill)] text-[var(--p-color-text)] shadow-[var(--p-shadow-button)] border border-[var(--p-color-border)] hover:bg-[var(--p-color-bg-fill-hover)] active:bg-[var(--p-color-bg-fill-active)] disabled:bg-[var(--p-color-bg-fill-disabled)] disabled:text-[var(--p-color-text-disabled)] disabled:shadow-none',
        tertiary:
          'bg-transparent text-[var(--p-color-text)] hover:bg-[var(--p-color-bg-surface-hover)] active:bg-[var(--p-color-bg-surface-active)] disabled:text-[var(--p-color-text-disabled)]',
        plain:
          'bg-transparent text-[var(--p-color-text-emphasis)] underline-offset-2 hover:underline disabled:text-[var(--p-color-text-disabled)]',
        monochromePlain:
          'bg-transparent text-inherit underline underline-offset-2 disabled:text-[var(--p-color-text-disabled)]',
      },
      tone: {
        default: '',
        critical: '',
        success: '',
      },
      size: {
        micro: 'min-h-6 px-[var(--p-space-200)] text-[var(--p-font-size-275)]',
        slim: 'min-h-7 px-[var(--p-space-300)] text-[var(--p-font-size-300)]',
        medium: 'min-h-8 px-[var(--p-space-300)] text-[var(--p-font-size-325)]',
        large: 'min-h-10 px-[var(--p-space-400)] text-[var(--p-font-size-350)]',
      },
      fullWidth: { true: 'w-full', false: '' },
    },
    compoundVariants: [
      {
        variant: 'primary',
        tone: 'critical',
        class:
          'bg-[var(--p-color-bg-fill-critical)] text-[var(--p-color-text-critical-on-bg-fill)] hover:bg-[var(--p-color-bg-fill-critical-hover)] active:bg-[var(--p-color-bg-fill-critical-active)]',
      },
      {
        variant: 'primary',
        tone: 'success',
        class:
          'bg-[var(--p-color-bg-fill-success)] text-[var(--p-color-text-success-on-bg-fill)] hover:bg-[var(--p-color-bg-fill-success-hover)] active:bg-[var(--p-color-bg-fill-success-active)]',
      },
      { variant: 'secondary', tone: 'critical', class: 'text-[var(--p-color-text-critical)]' },
      { variant: 'tertiary', tone: 'critical', class: 'text-[var(--p-color-text-critical)]' },
      { variant: 'plain', tone: 'critical', class: 'text-[var(--p-color-text-critical)]' },
    ],
    defaultVariants: {
      variant: 'secondary',
      tone: 'default',
      size: 'medium',
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof button> {
  children?: ReactNode;
  /** Render as the child element — for a link that should look like a button. */
  asChild?: boolean;
  disabled?: boolean;
  /** Shows progress in place. The control keeps its box so nothing shifts. */
  loading?: boolean;
  icon?: ReactNode;
  /** Trailing disclosure caret. For menus, not decoration. */
  disclosure?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant,
    tone,
    size,
    fullWidth,
    asChild = false,
    disabled,
    loading = false,
    icon,
    disclosure = false,
    children,
    ...rest
  },
  ref,
) {
  const Component = asChild ? Slot : 'button';
  return (
    <Component
      ref={ref}
      type={asChild ? undefined : 'button'}
      // Disabled while loading, never unmounted: swapping the control for a
      // spinner loses its size and position and shifts the layout around it.
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(button({ variant, tone, size, fullWidth }), className)}
      style={{ fontWeight: 'var(--p-font-weight-medium)' }}
      {...rest}
    >
      {loading ? (
        <span
          aria-hidden
          className="inline-block size-[1em] animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        icon
      )}
      {children}
      {disclosure ? (
        <span aria-hidden className="text-[0.75em] leading-none">
          &#9662;
        </span>
      ) : null}
    </Component>
  );
});
