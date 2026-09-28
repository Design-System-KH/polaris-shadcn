import type { ElementType, ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import type { TextVariant, Tone } from '../lib/tokens.js';

export interface TextProps {
  children?: ReactNode;
  className?: string;
  /** Semantic element. Chosen for document structure, not for size. */
  as?: ElementType;
  variant?: TextVariant;
  tone?: Tone;
  fontWeight?: 'regular' | 'medium' | 'semibold' | 'bold';
  alignment?: 'start' | 'center' | 'end' | 'justify';
  /** Tabular figures. Mandatory for any column of numbers or changing value. */
  numeric?: boolean;
  truncate?: boolean;
  visuallyHidden?: boolean;
  breakWord?: boolean;
  id?: string;
}

/** variant -> the Polaris font-size / line-height / weight triple. */
const VARIANTS: Record<TextVariant, { size: string; line: string; weight: string }> = {
  bodyXs: { size: '275', line: '400', weight: '400' },
  bodySm: { size: '300', line: '400', weight: '400' },
  bodyMd: { size: '325', line: '500', weight: '400' },
  bodyLg: { size: '350', line: '500', weight: '400' },
  headingXs: { size: '300', line: '400', weight: '650' },
  headingSm: { size: '325', line: '500', weight: '650' },
  headingMd: { size: '350', line: '500', weight: '650' },
  headingLg: { size: '400', line: '600', weight: '650' },
  headingXl: { size: '480', line: '600', weight: '700' },
  heading2xl: { size: '600', line: '800', weight: '700' },
  heading3xl: { size: '750', line: '1000', weight: '700' },
};

const WEIGHTS: Record<string, string> = {
  regular: '400',
  medium: '500',
  semibold: '650',
  bold: '700',
};

const ALIGNMENT: Record<string, string> = {
  start: 'start',
  center: 'center',
  end: 'end',
  justify: 'justify',
};

/**
 * All text goes through this component.
 *
 * `as` and `variant` are separate on purpose: heading level is document
 * structure and size is presentation, and conflating them is how an outline
 * ends up chosen for how big the text should look.
 */
export function Text({
  children,
  className,
  as: Component = 'span',
  variant = 'bodyMd',
  tone,
  fontWeight,
  alignment,
  numeric = false,
  truncate = false,
  visuallyHidden = false,
  breakWord = false,
  id,
}: TextProps) {
  const v = VARIANTS[variant];

  if (visuallyHidden) {
    return (
      <Component
        id={id}
        className={cn('sr-only', className)}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      id={id}
      className={cn(truncate && 'overflow-hidden text-ellipsis whitespace-nowrap', className)}
      style={{
        fontSize: `var(--p-font-size-${v.size})`,
        lineHeight: `var(--p-font-line-height-${v.line})`,
        fontWeight: `var(--p-font-weight-${fontWeight ? WEIGHTS[fontWeight] : v.weight})`,
        color: tone && tone !== 'inherit' ? `var(--p-color-text-${tone === 'base' ? 'primary' : tone})` : undefined,
        textAlign: alignment ? ALIGNMENT[alignment] : undefined,
        fontVariantNumeric: numeric ? 'tabular-nums' : undefined,
        wordBreak: breakWord ? 'break-word' : undefined,
      }}
    >
      {children}
    </Component>
  );
}
