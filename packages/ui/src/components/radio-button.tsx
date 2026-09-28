import { useId, type ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export interface RadioButtonProps {
  /** Always visible. A placeholder is not a label. */
  label: string;
  /** Persistent guidance, shown below the control. */
  helpText?: ReactNode;
  /** Associated with the control, so it is announced on focus. */
  error?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  children?: ReactNode;
}

/**
 * RadioButton — One choice from a set.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function RadioButton({
  label,
  helpText,
  error,
  disabled = false,
  className,
  id,
  children,
}: RadioButtonProps) {
  const generated = useId();
  const controlId = id ?? generated;
  const helpId = helpText ? `${controlId}-help` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;

  return (
    <div className={cn('flex flex-col gap-[var(--p-space-100)]', className)}>
      <label
        htmlFor={controlId}
        style={{
          fontSize: 'var(--p-font-size-325)',
          color: disabled ? 'var(--p-color-text-disabled)' : 'var(--p-color-text)',
        }}
      >
        {label}
      </label>
      <div
        id={controlId}
        aria-describedby={[helpId, errorId].filter(Boolean).join(' ') || undefined}
        aria-invalid={error ? true : undefined}
        aria-disabled={disabled || undefined}
      >
        {children}
      </div>
      {helpText ? (
        <p id={helpId} style={{ fontSize: 'var(--p-font-size-300)', color: 'var(--p-color-text-secondary)' }}>
          {helpText}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} style={{ fontSize: 'var(--p-font-size-300)', color: 'var(--p-color-text-critical)' }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
