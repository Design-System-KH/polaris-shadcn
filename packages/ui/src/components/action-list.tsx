import { forwardRef, useCallback, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import '../styles/polaris/action-list.css';

export interface ActionListItemDescriptor {
  /** Stable identity. Also used as the React key. */
  id?: string;
  content?: string;
  /** Secondary line, shown under the content. */
  helpText?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  active?: boolean;
  destructive?: boolean;
  url?: string;
  external?: boolean;
  onAction?: () => void;
  /** Announced instead of `content` when the visible label is ambiguous. */
  accessibilityLabel?: string;
}

export interface ActionListSection {
  title?: string;
  items: ActionListItemDescriptor[];
}

export interface ActionListProps {
  items?: ActionListItemDescriptor[];
  sections?: ActionListSection[];
  /**
   * `menuitem` is for an ActionList inside a Popover: it renders as a menu and
   * takes roving focus. `text` is a plain list of links.
   */
  actionRole?: 'menuitem' | 'option' | 'text';
  className?: string;
  onActionAnyItem?: () => void;
}

/**
 * ActionList — a list of actions, usually inside a Popover.
 *
 * Appearance comes from Polaris's own stylesheet rather than a re-derivation of
 * it, so details like the focus ring being an `::after` inset by -0.0625rem are
 * exact rather than close. Behaviour is ours: roving focus, correct element
 * choice and activation live here, in source you own.
 */
export const ActionList = forwardRef<HTMLDivElement, ActionListProps>(function ActionList(
  { items, sections, actionRole = 'menuitem', className, onActionAnyItem },
  ref,
) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const allSections: ActionListSection[] = sections ?? (items ? [{ items }] : []);
  const isMenu = actionRole === 'menuitem';

  /**
   * Roving focus. A menu moves with the arrow keys and keeps exactly one item
   * in the tab order, so Tab leaves the menu rather than walking every option.
   * A list of plain buttons gets this wrong, and the difference is obvious to
   * anyone navigating by keyboard.
   */
  const moveFocus = useCallback((from: HTMLElement, delta: number) => {
    const focusable = Array.from(
      listRef.current?.querySelectorAll<HTMLElement>(
        '[data-action-item]:not([aria-disabled="true"])',
      ) ?? [],
    );
    if (focusable.length === 0) return;
    const index = focusable.indexOf(from);
    const next = focusable[(index + delta + focusable.length) % focusable.length];
    next?.focus();
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (!isMenu) return;
      const target = event.currentTarget;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        moveFocus(target, 1);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        moveFocus(target, -1);
      }
    },
    [isMenu, moveFocus],
  );

  let itemIndex = 0;

  const renderItem = (item: ActionListItemDescriptor, index: number) => {
    const {
      id,
      content,
      helpText,
      prefix,
      suffix,
      icon,
      disabled = false,
      active = false,
      destructive = false,
      url,
      external,
      onAction,
      accessibilityLabel,
    } = item;

    const itemClass = cn(
      'Polaris-ActionList__Item',
      active && 'Polaris-ActionList--active',
      destructive && 'Polaris-ActionList--destructive',
      disabled && 'Polaris-ActionList--disabled',
      isMenu && 'Polaris-ActionList--menu',
    );

    const body = (
      <>
        {prefix ?? icon ? <span className="Polaris-ActionList__Prefix">{prefix ?? icon}</span> : null}
        <span className="Polaris-ActionList__Text">
          {content}
          {helpText ? (
            <span style={{ color: 'var(--p-color-text-secondary)', display: 'block' }}>{helpText}</span>
          ) : null}
        </span>
        {suffix ? <span className="Polaris-ActionList__Suffix">{suffix}</span> : null}
      </>
    );

    const handle = () => {
      if (disabled) return;
      onAction?.();
      onActionAnyItem?.();
    };

    const shared = {
      className: itemClass,
      'data-action-item': true,
      // Roving tabindex: one entry point into the menu, arrows to move within.
      tabIndex: isMenu ? (index === 0 ? 0 : -1) : undefined,
      'aria-disabled': disabled || undefined,
      'aria-label': accessibilityLabel,
      onKeyDown,
    };

    // A link goes somewhere; a button does something. Rendering the right
    // element is what makes middle-click, copy-link and the status bar work.
    return url ? (
      <a
        key={id ?? content ?? index}
        href={disabled ? undefined : url}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        role={isMenu ? 'menuitem' : actionRole === 'option' ? 'option' : undefined}
        onClick={handle}
        {...shared}
      >
        {body}
      </a>
    ) : (
      <button
        key={id ?? content ?? index}
        type="button"
        disabled={disabled}
        role={isMenu ? 'menuitem' : actionRole === 'option' ? 'option' : undefined}
        onClick={handle}
        {...shared}
      >
        {body}
      </button>
    );
  };

  return (
    <div
      ref={(node) => {
        listRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={cn(className)}
      role={isMenu ? 'menu' : actionRole === 'option' ? 'listbox' : undefined}
    >
      {allSections.map((section, sectionIndex) => (
        <div key={section.title ?? sectionIndex} role={isMenu ? 'presentation' : undefined}>
          {section.title ? (
            <p
              style={{
                padding: 'var(--p-space-200) var(--p-space-300)',
                fontSize: 'var(--p-font-size-300)',
                fontWeight: 'var(--p-font-weight-medium)',
                color: 'var(--p-color-text-secondary)',
              }}
            >
              {section.title}
            </p>
          ) : null}
          {section.items.map((item) => renderItem(item, itemIndex++))}
        </div>
      ))}
    </div>
  );
});
