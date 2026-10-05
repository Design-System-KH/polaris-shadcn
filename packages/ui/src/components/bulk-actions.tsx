import { cn } from '../lib/cn';
import { Button } from './button';
import { Text } from './text';
import '../styles/polaris/bulk-actions.css';

export interface BulkAction {
  content: string;
  onAction?: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

export interface BulkActionsProps {
  /** Actions shown inline. Keep to two or three; the rest go in the menu. */
  promotedActions?: BulkAction[];
  actions?: BulkAction[];
  selectMode?: boolean;
  /** How many rows are selected. Shown verbatim, because "all" is ambiguous. */
  selectedItemsCount?: number | 'All';
  /** Total available when the user asks to select beyond the current page. */
  accessibilityLabel?: string;
  disabled?: boolean;
  onSelectModeToggle?: (selectMode: boolean) => void;
}

/**
 * BulkActions — actions applying to the current selection.
 *
 * The count is displayed rather than implied. Users routinely believe they
 * selected every matching record when they selected only the visible page, and
 * the only thing that prevents it is showing the number before they act.
 */
export function BulkActions({
  promotedActions = [],
  actions = [],
  selectedItemsCount = 0,
  disabled = false,
  onSelectModeToggle,
}: BulkActionsProps) {
  const count = selectedItemsCount === 'All' ? 'All' : selectedItemsCount;

  return (
    <div className={cn('Polaris-BulkActions__BulkActionsLayout', disabled && 'Polaris-BulkActions--disabled')}>
      <div className="Polaris-BulkActions__BulkActionsSelectAllWrapper">
        <Text as="span" variant="bodySm">
          {count === 'All' ? 'All selected' : `${count} selected`}
        </Text>
        {onSelectModeToggle ? (
          <button
            type="button"
            className="Polaris-BulkActions__AllAction"
            onClick={() => onSelectModeToggle(false)}
          >
            Cancel
          </button>
        ) : null}
      </div>

      <div className="Polaris-BulkActions__BulkActionsPromotedActionsWrapper">
        {promotedActions.map((action) => (
          <div className="Polaris-BulkActions__BulkActionButton" key={action.content}>
            <Button
              size="slim"
              disabled={disabled || action.disabled}
              tone={action.destructive ? 'critical' : undefined}
              onClick={action.onAction}
            >
              {action.content}
            </Button>
          </div>
        ))}
        {actions.map((action) => (
          <div className="Polaris-BulkActions__BulkActionButton" key={action.content}>
            <Button
              size="slim"
              variant="tertiary"
              disabled={disabled || action.disabled}
              tone={action.destructive ? 'critical' : undefined}
              onClick={action.onAction}
            >
              {action.content}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
