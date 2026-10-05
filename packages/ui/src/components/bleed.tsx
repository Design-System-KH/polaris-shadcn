import type { ReactNode } from 'react';
import { cn } from '../lib/cn';
import type { SpaceScale } from '../lib/tokens';

export interface BleedProps {
  children?: ReactNode;
  className?: string;
  marginInline?: SpaceScale;
  marginBlock?: SpaceScale;
  marginBlockStart?: SpaceScale;
  marginBlockEnd?: SpaceScale;
}

const neg = (v?: SpaceScale) => (v ? `calc(var(--p-space-${v}) * -1)` : undefined);

/**
 * Escapes a parent's padding — for a full-width image or divider inside a Card.
 * Negative margin is the mechanism, but stating it as "bleed" keeps the intent
 * legible at the call site.
 */
export function Bleed({
  children,
  className,
  marginInline,
  marginBlock,
  marginBlockStart,
  marginBlockEnd,
}: BleedProps) {
  return (
    <div
      className={cn(className)}
      style={{
        marginInline: neg(marginInline),
        marginBlock: neg(marginBlock),
        marginBlockStart: neg(marginBlockStart),
        marginBlockEnd: neg(marginBlockEnd),
      }}
    >
      {children}
    </div>
  );
}
