import { useId, useState, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import '../styles/polaris/resource-item.css';

export interface ResourceItemProps {
  id: string;
  children?: ReactNode;
  /** Renders the row as a link. A link goes somewhere; a button does something. */
  url?: string;
  onClick?: (id: string) => void;
  media?: ReactNode;
  shortcutActions?: ReactNode;
  /** Shown on hover or focus. Hidden actions are undiscoverable on touch. */
  persistActions?: boolean;
  selectable?: boolean;
  selected?: boolean;
  onSelectionChange?: (selected: boolean, id: string) => void;
  disabled?: boolean;
  /** Names the row for the checkbox and for assistive technology. */
  accessibilityLabel?: string;
  name?: string;
  verticalAlignment?: 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';
}

/**
 * ResourceItem — one row in a ResourceList.
 *
 * The whole row is the target, and the checkbox is a separate control inside
 * it. That means the click handler has to ignore events originating in the
 * checkbox, or selecting a row would also navigate away from it.
 */
export function ResourceItem({
  id,
  children,
  url,
  onClick,
  media,
  shortcutActions,
  persistActions = false,
  selectable = false,
  selected = false,
  onSelectionChange,
  disabled = false,
  accessibilityLabel,
  name,
}: ResourceItemProps) {
  const [focused, setFocused] = useState(false);
  const [focusedInner, setFocusedInner] = useState(false);
  const checkboxId = useId();

  const label =
    accessibilityLabel ?? (name ? `View details for ${name}` : `View details`);

  const handleActivate = () => {
    if (disabled) return;
    onClick?.(id);
  };

  const content = (
    <div
      className="Polaris-ResourceItem__ItemWrapper"
      style={{ display: 'flex', alignItems: 'center', gap: 16 }}
    >
      {selectable ? (
        <div
          className="Polaris-ResourceItem__CheckboxWrapper"
          style={{ position: 'relative' }}
          // Stops a checkbox click from also activating the row behind it.
          onClick={(event) => event.stopPropagation()}
        >
          <input
            id={checkboxId}
            type="checkbox"
            checked={selected}
            disabled={disabled}
            aria-label={name ? `Select ${name}` : 'Select item'}
            onChange={(event) =>
              onSelectionChange?.(event.currentTarget.checked, id)
            }
          />
        </div>
      ) : null}
      {media}
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      {shortcutActions ? (
        <div
          className="Polaris-ResourceItem__Actions"
          onClick={(event) => event.stopPropagation()}
          style={{
            position: 'relative',
            zIndex: 2,
            visibility: persistActions || focused ? 'visible' : undefined,
          }}
        >
          {shortcutActions}
        </div>
      ) : null}
    </div>
  );

  return (
    <li
      className={cn(
        'Polaris-ResourceItem__ListItem',
        selectable && 'Polaris-ResourceItem--selectable',
        selected && 'Polaris-ResourceItem--selected',
        disabled && 'Polaris-ResourceItem--disabled',
        focused && 'Polaris-ResourceItem--focused',
        focusedInner && 'Polaris-ResourceItem--focusedInner',
      )}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div
        className="Polaris-ResourceItem"
        style={{ position: 'relative', padding: 16, minHeight: 44 }}
      >
        {url ? (
          <a
            className="Polaris-ResourceItem__Link"
            href={disabled ? undefined : url}
            aria-label={label}
            onFocus={() => setFocusedInner(true)}
            onBlur={() => setFocusedInner(false)}
          />
        ) : (
          <button
            type="button"
            className="Polaris-ResourceItem__Button"
            aria-label={label}
            disabled={disabled}
            onClick={handleActivate}
            onFocus={() => setFocusedInner(true)}
            onBlur={() => setFocusedInner(false)}
          />
        )}
        {content}
      </div>
    </li>
  );
}
