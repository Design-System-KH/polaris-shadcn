import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import '../styles/polaris/badge.css';

export type BadgeTone =
  | 'info' | 'success' | 'warning' | 'critical' | 'attention'
  | 'new' | 'magic' | 'read-only' | 'enabled';

export type BadgeProgress = 'incomplete' | 'partiallyComplete' | 'complete';

export interface BadgeProps {
  children?: ReactNode;
  tone?: BadgeTone;
  /** Stronger fill. For a badge that must carry across a dense table. */
  toneStrong?: boolean;
  size?: 'medium' | 'large';
  progress?: BadgeProgress;
  icon?: ReactNode;
  /** Announced instead of the visible text when the text alone is ambiguous. */
  toneAndProgressLabelOverride?: string;
}

const cap = (v: string) => v.charAt(0).toUpperCase() + v.slice(1);

/**
 * Badge — status as a label.
 *
 * Colour never carries the meaning alone; the text does and the tone
 * reinforces it. That is what keeps it readable in greyscale and for the
 * roughly one man in twelve with a colour vision deficiency.
 */
export function Badge({
  children,
  tone,
  toneStrong = false,
  size = 'medium',
  progress,
  icon,
  toneAndProgressLabelOverride,
}: BadgeProps) {
  const toneClass = tone
    ? tone === 'read-only'
      ? 'Polaris-Badge__toneRead--only'
      : toneStrong
        ? `Polaris-Badge__tone${cap(tone)}--strong`
        : `Polaris-Badge--tone${cap(tone)}`
    : undefined;

  return (
    <span
      className={cn('Polaris-Badge', toneClass, size === 'large' && 'Polaris-Badge--sizeLarge')}
    >
      {toneAndProgressLabelOverride ? (
        <span className="Polaris-Text--visuallyHidden">{toneAndProgressLabelOverride}</span>
      ) : null}
      {icon ? <span className="Polaris-Badge__Icon">{icon}</span> : null}
      {progress && !icon ? (
        <span className="Polaris-Badge__PipContainer">
          <Pip progress={progress} />
        </span>
      ) : null}
      {children ? <span aria-hidden={Boolean(toneAndProgressLabelOverride)}>{children}</span> : null}
    </span>
  );
}

function Pip({ progress }: { progress: BadgeProgress }) {
  return (
    <span
      aria-hidden
      className="Polaris-Badge__Pip"
      data-progress={progress}
      style={{
        display: 'inline-block',
        width: '0.5rem',
        height: '0.5rem',
        borderRadius: 'var(--p-border-radius-full)',
        border: '0.125rem solid currentColor',
        background: progress === 'complete' ? 'currentColor' : 'transparent',
        borderStyle: progress === 'partiallyComplete' ? 'dashed' : 'solid',
      }}
    />
  );
}
