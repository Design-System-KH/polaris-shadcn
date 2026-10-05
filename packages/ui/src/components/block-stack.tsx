import type { ElementType, ReactNode } from 'react';
import { cn } from '../lib/cn';
import type { SpaceScale } from '../lib/tokens';

export interface BlockStackProps {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  /** Space between children, from the Polaris space scale. */
  gap?: SpaceScale;
  align?: 'start' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly';
  inlineAlign?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  reverseOrder?: boolean;
}

const ALIGN: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  'space-around': 'space-around',
  'space-between': 'space-between',
  'space-evenly': 'space-evenly',
};

const INLINE_ALIGN: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  baseline: 'baseline',
  stretch: 'stretch',
};

/** Vertical stack. Spacing is the stack's job, never the child's margin. */
export function BlockStack({
  as: Component = 'div',
  children,
  className,
  gap,
  align,
  inlineAlign,
  reverseOrder = false,
}: BlockStackProps) {
  return (
    <Component
      className={cn(className)}
      style={{
        display: 'flex',
        flexDirection: reverseOrder ? 'column-reverse' : 'column',
        gap: gap ? `var(--p-space-${gap})` : undefined,
        justifyContent: align ? ALIGN[align] : undefined,
        alignItems: inlineAlign ? INLINE_ALIGN[inlineAlign] : undefined,
      }}
    >
      {children}
    </Component>
  );
}
