import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';

export type BadgeTone =
  | 'info'
  | 'success'
  | 'warning'
  | 'critical'
  | 'attention'
  | 'new'
  | 'magic'
  | 'read-only';

export type BadgeProgress = 'incomplete' | 'partiallyComplete' | 'complete';

export interface BadgeProps {
  children?: ReactNode;
  className?: string;
  tone?: BadgeTone;
  /** Leading progress dot. Reinforces the label; never replaces it. */
  progress?: BadgeProgress;
  /** Announced in place of the visible text when the text alone is ambiguous. */
  toneAndProgressLabelOverride?: string;
}

const TONES: Record<BadgeTone, { bg: string; text: string }> = {
  info: { bg: 'bg-fill-info-secondary', text: 'text-info' },
  success: { bg: 'bg-fill-success-secondary', text: 'text-success' },
  warning: { bg: 'bg-fill-warning-secondary', text: 'text-warning' },
  critical: { bg: 'bg-fill-critical-secondary', text: 'text-critical' },
  attention: { bg: 'bg-fill-caution-secondary', text: 'text-caution' },
  new: { bg: 'bg-fill-secondary', text: 'text-secondary' },
  magic: { bg: 'bg-fill-magic-secondary', text: 'text-magic' },
  'read-only': { bg: 'bg-fill-secondary', text: 'text-secondary' },
};

/**
 * Status, as a label.
 *
 * Colour never carries the meaning alone — the text does, and the tone
 * reinforces it. That is what keeps it readable in greyscale and for the
 * roughly one man in twelve with a colour vision deficiency.
 */
export function Badge({
  children,
  className,
  tone = 'new',
  progress,
  toneAndProgressLabelOverride,
}: BadgeProps) {
  const t = TONES[tone];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[var(--p-space-100)]',
        'px-[var(--p-space-200)] py-[var(--p-space-050)]',
        'rounded-[var(--p-border-radius-200)]',
        'text-[var(--p-font-size-300)]',
        className,
      )}
      style={{
        background: `var(--p-color-${t.bg})`,
        color: `var(--p-color-${t.text})`,
        fontWeight: 'var(--p-font-weight-medium)',
      }}
    >
      {progress ? (
        <span
          aria-hidden
          className="size-2 rounded-full border border-current"
          style={{
            background: progress === 'complete' ? 'currentColor' : 'transparent',
            borderStyle: progress === 'partiallyComplete' ? 'dashed' : 'solid',
          }}
        />
      ) : null}
      {toneAndProgressLabelOverride ? (
        <>
          <span className="sr-only">{toneAndProgressLabelOverride}</span>
          <span aria-hidden>{children}</span>
        </>
      ) : (
        children
      )}
    </span>
  );
}
