import { Slot } from '@radix-ui/react-slot';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import '../styles/polaris/button.css';
import '../styles/polaris/spinner.css';
import { Spinner } from './spinner';

export type ButtonVariant =
  'primary' | 'secondary' | 'tertiary' | 'plain' | 'monochromePlain';
export type ButtonTone = 'critical' | 'success';
export type ButtonSize = 'micro' | 'slim' | 'medium' | 'large';

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled'
> {
  children?: ReactNode;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  fullWidth?: boolean;
  textAlign?: 'start' | 'center' | 'end';
  disabled?: boolean;
  /** Shows a spinner in place. The control keeps its box so nothing shifts. */
  loading?: boolean;
  pressed?: boolean;
  icon?: ReactNode;
  disclosure?: boolean | 'up' | 'down' | 'select';
  removeUnderline?: boolean;
  /** Render as the child element — for a link that should look like a button. */
  asChild?: boolean;
}

const cap = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Button — the primary interactive control.
 *
 * Classes are Polaris's own, so the shadow, the pressed inset, the focus ring
 * geometry and the size ramp are exact rather than reconstructed. Behaviour
 * stays here: `asChild` for links, and the loading state keeping the control
 * mounted instead of swapping it for a spinner.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      className,
      variant = 'secondary',
      tone,
      size = 'medium',
      fullWidth = false,
      textAlign,
      disabled = false,
      loading = false,
      pressed = false,
      icon,
      disclosure = false,
      removeUnderline = false,
      asChild = false,
      ...rest
    },
    ref,
  ) {
    const Component = asChild ? Slot : 'button';
    const hasText = Boolean(children);

    return (
      <Component
        ref={ref}
        type={asChild ? undefined : 'button'}
        // Disabled while loading, never unmounted: swapping the control for a
        // spinner loses its size and position and shifts the layout around it.
        disabled={asChild ? undefined : disabled || loading}
        aria-disabled={asChild && (disabled || loading) ? true : undefined}
        tabIndex={asChild && (disabled || loading) ? -1 : rest.tabIndex}
        aria-busy={loading || undefined}
        aria-pressed={pressed || undefined}
        className={cn(
          'Polaris-Button',
          `Polaris-Button--variant${cap(variant)}`,
          `Polaris-Button--size${cap(size)}`,
          tone && `Polaris-Button--tone${cap(tone)}`,
          (disabled || loading) && 'Polaris-Button--disabled',
          loading && 'Polaris-Button--loading',
          pressed && 'Polaris-Button--pressed',
          fullWidth && 'Polaris-Button--fullWidth',
          textAlign && `Polaris-Button--textAlign${cap(textAlign)}`,
          icon && !hasText && 'Polaris-Button--iconOnly',
          icon && hasText && 'Polaris-Button--iconWithText',
          disclosure && 'Polaris-Button--disclosure',
          removeUnderline && 'Polaris-Button--removeUnderline',
          className,
        )}
        {...rest}
        onClick={(event) => {
          if (disabled || loading) {
            event.preventDefault();
            return;
          }
          rest.onClick?.(event);
        }}
      >
        {asChild ? (
          children
        ) : loading ? (
          <span className="Polaris-Button__Spinner">
            <Spinner size="small" hasFocusableParent />
            {/* The label is hidden rather than removed, so the button keeps its
              width and the accessible name does not change mid-action. */}
            <span className="Polaris-Button--hidden">{children}</span>
          </span>
        ) : (
          <>
            {icon ? <span className="Polaris-Button__Icon">{icon}</span> : null}
            {children}
            {disclosure && (
              <span aria-hidden="true">{disclosure === 'up' ? '▴' : '▾'}</span>
            )}
          </>
        )}
      </Component>
    );
  },
);
