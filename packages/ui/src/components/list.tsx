import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import '../styles/polaris/list.css';

export interface ListProps {
  children?: ReactNode;
  type?: 'bullet' | 'number';
  gap?: 'loose' | 'tight';
}

export interface ListItemProps {
  children?: ReactNode;
}

function ListItem({ children }: ListItemProps) {
  return <li className="Polaris-List__Item">{children}</li>;
}

/**
 * List — a bulleted or numbered list.
 *
 * `type="number"` renders an `ol`. A numbered list built from a `ul` with
 * counters reads as unordered to a screen reader, which is the one thing the
 * numbering was there to convey.
 */
export function List({ children, type = 'bullet', gap = 'loose' }: ListProps) {
  const Element = type === 'number' ? 'ol' : 'ul';
  return (
    <Element
      className={cn(
        'Polaris-List',
        type === 'number' && 'Polaris-List--typeNumber',
        gap === 'loose' && 'Polaris-List--spacingLoose',
      )}
    >
      {children}
    </Element>
  );
}

List.Item = ListItem;
