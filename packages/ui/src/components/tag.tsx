import type { ReactNode } from 'react';
import { cn } from '../lib/cn';
import '../styles/polaris/tag.css';

export interface TagProps {
  children?: ReactNode;
  disabled?: boolean;
  /** Renders a remove button. Give it an accessible name via the children text. */
  onRemove?: () => void;
  onClick?: () => void;
  url?: string;
  size?: 'medium' | 'large';
  /** Sits over an image or coloured surface. */
  overlay?: boolean;
}

/**
 * Tag — a removable label, usually a filter or a category.
 *
 * Only one of onClick, onRemove or url applies: a tag that is both clickable
 * and removable gives two targets in a very small box, and the user gets the
 * wrong one.
 */
export function Tag({ children, disabled = false, onRemove, onClick, url, size = 'medium', overlay = false }: TagProps) {
  const className = cn(
    'Polaris-Tag',
    disabled && 'Polaris-Tag--disabled',
    onClick && 'Polaris-Tag--clickable',
    url && 'Polaris-Tag--linkable',
    onRemove && 'Polaris-Tag--removable',
    size === 'large' && 'Polaris-Tag--sizeLarge',
    overlay && 'Polaris-Tag--overlay',
  );

  if (onClick) {
    return (
      <button type="button" disabled={disabled} className={className} onClick={onClick}>
        {children}
      </button>
    );
  }

  if (url) {
    return (
      <a href={disabled ? undefined : url} className={cn(className, 'Polaris-Tag__Link')}>
        {children}
      </a>
    );
  }

  return (
    <span className={className}>
      <span className="Polaris-Tag__Text" title={typeof children === 'string' ? children : undefined}>
        {children}
      </span>
      {onRemove ? (
        <button
          type="button"
          // The visible glyph is decorative; the name carries what is removed,
          // so a list of tags does not announce "remove" five times.
          aria-label={typeof children === 'string' ? `Remove ${children}` : 'Remove'}
          className="Polaris-Tag__Button"
          onClick={onRemove}
          disabled={disabled}
        >
          <span aria-hidden>&#215;</span>
        </button>
      ) : null}
    </span>
  );
}
