import type { ReactNode } from 'react';
import { cn } from '../lib/cn';
import type { SpaceScale } from '../lib/tokens';

export interface InlineGridProps {
  children?: ReactNode;
  className?: string;
  /** A column count, or explicit track sizes. */
  columns?: number | string | string[];
  gap?: SpaceScale;
  alignItems?: 'start' | 'center' | 'end';
}

const templateFrom = (columns?: number | string | string[]) => {
  if (columns === undefined) return undefined;
  if (typeof columns === 'number') return `repeat(${columns}, minmax(0, 1fr))`;
  if (Array.isArray(columns)) return columns.join(' ');
  return columns;
};

/** Equal-width columns. For a responsive page grid use Grid instead. */
export function InlineGrid({ children, className, columns, gap, alignItems }: InlineGridProps) {
  return (
    <div
      className={cn(className)}
      style={{
        display: 'grid',
        gridTemplateColumns: templateFrom(columns),
        gap: gap ? `var(--p-space-${gap})` : undefined,
        alignItems,
      }}
    >
      {children}
    </div>
  );
}
