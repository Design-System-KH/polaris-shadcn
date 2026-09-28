import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import type { SpaceScale } from '../lib/tokens.js';

export interface CardProps {
  children?: ReactNode;
  className?: string;
  /** Token suffix from --p-color-bg-*. */
  background?: string;
  padding?: SpaceScale;
}

/**
 * The default grouping surface.
 *
 * A hairline outline rather than a drop shadow: in a dense admin interface a
 * shadow under every card stops signalling elevation and becomes noise. The
 * negative outline-offset keeps the border inside the rounded corner, which a
 * plain `border` does not do cleanly at this radius.
 */
export function Card({ children, className, background = 'surface', padding = '400' }: CardProps) {
  return (
    <div
      className={cn('overflow-hidden', className)}
      style={{
        background: `var(--p-color-bg-${background})`,
        padding: `var(--p-space-${padding})`,
        borderRadius: 'var(--p-border-radius-300)',
        boxShadow: 'var(--p-shadow-100)',
        outline: 'var(--p-border-width-025) solid var(--p-color-border)',
        outlineOffset: 'calc(var(--p-border-width-025) * -1)',
      }}
    >
      {children}
    </div>
  );
}
