import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import { Button } from './button.js';
import '../styles/polaris/action-menu.css';

export interface ActionMenuAction {
  content: string;
  onAction?: () => void;
  url?: string;
  disabled?: boolean;
  destructive?: boolean;
}

export interface ActionMenuProps {
  actions?: ActionMenuAction[];
  /** Rendered last and with primary emphasis. At most one. */
  primaryAction?: ActionMenuAction;
  className?: string;
  children?: ReactNode;
}

/**
 * ActionMenu — page-level actions.
 *
 * Polaris rolls overflowing actions into a menu once they stop fitting, which
 * needs width measurement. Until that lands here, actions all render inline;
 * keep the list short enough that they fit, which is good practice anyway.
 */
export function ActionMenu({ actions = [], primaryAction, className, children }: ActionMenuProps) {
  return (
    <div className={cn('Polaris-ActionMenu', className)}>
      {actions.map((action) => (
        <Button
          key={action.content}
          tone={action.destructive ? 'critical' : undefined}
          disabled={action.disabled}
          onClick={action.onAction}
        >
          {action.content}
        </Button>
      ))}
      {children}
      {primaryAction ? (
        <Button variant="primary" disabled={primaryAction.disabled} onClick={primaryAction.onAction}>
          {primaryAction.content}
        </Button>
      ) : null}
    </div>
  );
}
