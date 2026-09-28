import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import '../styles/polaris/exception-list.css';

export interface ExceptionListItem {
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** Raises the tone. Reserve critical for something that blocks the user. */
  status?: 'warning' | 'critical';
  truncate?: boolean;
}

export interface ExceptionListProps {
  items: ExceptionListItem[];
}

const cap = (v: string) => v.charAt(0).toUpperCase() + v.slice(1);

/**
 * ExceptionList — short warnings or exceptions attached to a resource.
 *
 * An `ul`, because it is a list and the count matters: a screen-reader user
 * hears "3 items" and knows how much is wrong before reading any of it.
 */
export function ExceptionList({ items }: ExceptionListProps) {
  return (
    <ul className="Polaris-ExceptionList">
      {items.map(({ icon, title, description, status, truncate = false }, index) => (
        <li
          key={index}
          className={cn('Polaris-ExceptionList__Item', status && `Polaris-ExceptionList--status${cap(status)}`)}
        >
          {icon ? (
            <span className="Polaris-ExceptionList__Icon">{icon}</span>
          ) : (
            <span className="Polaris-ExceptionList__Bullet" aria-hidden />
          )}
          {title ? <span className="Polaris-ExceptionList__Title">{title}</span> : null}
          {description ? (
            <span
              className="Polaris-ExceptionList__Description"
              style={truncate ? { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } : undefined}
            >
              {description}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
