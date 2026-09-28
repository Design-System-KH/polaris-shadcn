import { cn } from '../lib/cn.js';
import { Text } from './text.js';
import '../styles/polaris/select-all-actions.css';

export interface SelectAllActionsProps {
  /** e.g. "50 orders selected" — spell out what the number counts. */
  label?: string;
  /** Offers to extend the selection past the current page. */
  selectAllAction?: { content: string; onAction?: () => void };
  /** Shown when the whole matching set is already selected. */
  paginatedSelectAllText?: string;
  disabled?: boolean;
  isSticky?: boolean;
  hasPagination?: boolean;
}

/**
 * SelectAllActions — the select-all affordance above a resource list.
 *
 * This bar exists for one reason: a checkbox in a table header selects the
 * visible page, not the whole result set, and users assume otherwise. Saying
 * "50 selected" and offering "Select all 1,284" makes the difference explicit
 * before a bulk action is applied to the wrong number of records.
 */
export function SelectAllActions({
  label,
  selectAllAction,
  paginatedSelectAllText,
  disabled = false,
  isSticky = false,
  hasPagination = false,
}: SelectAllActionsProps) {
  return (
    <div
      // Announced politely: the count changing is information, not an
      // interruption of whatever the user is doing.
      role="status"
      aria-live="polite"
      className={cn(
        'Polaris-SelectAllActions',
        !isSticky && 'Polaris-SelectAllActions--selectAllActionsNotSticky',
        hasPagination && 'Polaris-SelectAllActions__SelectAllActions--hasPagination',
      )}
    >
      {label ? (
        <Text as="span" variant="bodySm">
          {label}
        </Text>
      ) : null}

      {paginatedSelectAllText ? (
        <Text as="span" variant="bodySm">
          {paginatedSelectAllText}
        </Text>
      ) : null}

      {selectAllAction ? (
        <button
          type="button"
          className="Polaris-SelectAllActions__AllAction"
          disabled={disabled}
          onClick={selectAllAction.onAction}
        >
          {selectAllAction.content}
        </button>
      ) : null}
    </div>
  );
}
