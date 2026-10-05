import type { ElementType, ReactNode } from 'react';
import { cn } from '../lib/cn';
import type { TextVariant, Tone } from '../lib/tokens';
import '../styles/polaris/text.css';

export interface TextProps {
  children?: ReactNode;
  className?: string;
  /** Semantic element. Chosen for document structure, not for size. */
  as?: ElementType;
  variant?: TextVariant;
  tone?: Tone | 'magic-subdued' | 'text-inverse' | 'text-inverse-secondary';
  fontWeight?: 'regular' | 'medium' | 'semibold' | 'bold';
  alignment?: 'start' | 'center' | 'end' | 'justify';
  /** Tabular figures. Required for any column of numbers or changing value. */
  numeric?: boolean;
  truncate?: boolean;
  visuallyHidden?: boolean;
  breakWord?: boolean;
  textDecorationLine?: 'line-through';
  id?: string;
}

/**
 * Text — all text output.
 *
 * Classes are Polaris's own, so the type ramp, tone colours and the
 * visually-hidden clip rect are exact. `as` and `variant` stay separate
 * because heading level is document structure and size is presentation;
 * conflating them is how an outline ends up chosen for how big text should
 * look.
 */
export function Text({
  children,
  className,
  as,
  variant,
  tone,
  fontWeight,
  alignment,
  numeric = false,
  truncate = false,
  visuallyHidden = false,
  breakWord = false,
  textDecorationLine,
  id,
}: TextProps) {
  // Polaris defaults to `p`, or `span` when visually hidden.
  const Component: ElementType = as ?? (visuallyHidden ? 'span' : 'p');

  return (
    <Component
      id={id}
      className={cn(
        'Polaris-Text--root',
        variant && `Polaris-Text--${variant}`,
        fontWeight && `Polaris-Text--${fontWeight}`,
        // Alignment and truncation both need a block box to take effect.
        (alignment || truncate) && 'Polaris-Text--block',
        alignment && `Polaris-Text--${alignment}`,
        breakWord && 'Polaris-Text--break',
        tone && `Polaris-Text--${tone}`,
        numeric && 'Polaris-Text--numeric',
        truncate && 'Polaris-Text--truncate',
        visuallyHidden && 'Polaris-Text--visuallyHidden',
        textDecorationLine && `Polaris-Text--${textDecorationLine}`,
        className,
      )}
    >
      {children}
    </Component>
  );
}
