import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import '../styles/polaris/description-list.css';

export interface DescriptionListItem {
  term: ReactNode;
  description: ReactNode;
}

export interface DescriptionListProps {
  items: DescriptionListItem[];
  spacing?: 'loose' | 'tight';
}

/**
 * DescriptionList — term and description pairs.
 *
 * A real `dl` rather than a two-column grid of divs: the pairing is the
 * semantics, and assistive technology reads term-and-value together only when
 * the elements say so.
 */
export function DescriptionList({ items, spacing = 'loose' }: DescriptionListProps) {
  return (
    <dl className={cn('Polaris-DescriptionList', spacing === 'tight' && 'Polaris-DescriptionList--spacingTight')}>
      {items.map(({ term, description }, index) => (
        <div key={index}>
          <dt className="Polaris-DescriptionList__Term">{term}</dt>
          <dd className="Polaris-DescriptionList__Description">{description}</dd>
        </div>
      ))}
    </dl>
  );
}
