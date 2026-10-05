import type { ElementType, ReactNode } from 'react';
import { cn } from '../lib/cn';
import type { SpaceScale } from '../lib/tokens';

export interface InlineStackProps {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  gap?: SpaceScale;
  align?: 'start' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly';
  blockAlign?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  /** Wrapping is on by default: a row that cannot wrap overflows on mobile. */
  wrap?: boolean;
}

const ALIGN: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  'space-around': 'space-around',
  'space-between': 'space-between',
  'space-evenly': 'space-evenly',
};

const BLOCK_ALIGN: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  baseline: 'baseline',
  stretch: 'stretch',
};

/** Horizontal stack. */
export function InlineStack({
  as: Component = 'div',
  children,
  className,
  gap,
  align,
  blockAlign,
  wrap = true,
}: InlineStackProps) {
  return (
    <Component
      className={cn(className)}
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: wrap ? 'wrap' : 'nowrap',
        gap: gap ? `var(--p-space-${gap})` : undefined,
        justifyContent: align ? ALIGN[align] : undefined,
        alignItems: blockAlign ? BLOCK_ALIGN[blockAlign] : undefined,
      }}
    >
      {children}
    </Component>
  );
}
