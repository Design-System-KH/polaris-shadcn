import { useState, useRef, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Button } from './button';
import { Popover } from './popover';
import { ActionList } from './action-list';
import '../styles/polaris/action-menu.css';
import './internal/components.css';

export interface ActionMenuAction {
  content: string;
  onAction?: () => void;
  url?: string;
  disabled?: boolean;
  destructive?: boolean;
}
export interface ActionMenuProps {
  actions?: ActionMenuAction[];
  primaryAction?: ActionMenuAction;
  className?: string;
  children?: ReactNode;
  visibleActions?: number;
}
export function ActionMenu({
  actions = [],
  primaryAction,
  className,
  children,
  visibleActions = 2,
}: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const inline = actions.slice(0, visibleActions),
    overflow = actions.slice(visibleActions);
  const actionButton = (action: ActionMenuAction, primary = false) =>
    action.url && !action.disabled ? (
      <Button
        key={action.content}
        asChild
        variant={primary ? 'primary' : 'secondary'}
      >
        <a href={action.url}>{action.content}</a>
      </Button>
    ) : (
      <Button
        key={action.content}
        variant={primary ? 'primary' : 'secondary'}
        tone={action.destructive ? 'critical' : undefined}
        disabled={action.disabled}
        onClick={action.onAction}
      >
        {action.content}
      </Button>
    );
  return (
    <div
      ref={container}
      className={cn('Polaris-ActionMenu ps-row ps-wrap', className)}
    >
      {inline.map((action) => actionButton(action))}
      {overflow.length > 0 && (
        <Popover
          open={open}
          onOpenChange={setOpen}
          activator={<Button disclosure>More actions</Button>}
        >
          <ActionList
            items={overflow.map((action) => ({
              ...action,
              onAction: () => {
                action.onAction?.();
                setOpen(false);
              },
            }))}
          />
        </Popover>
      )}
      {children}
      {primaryAction && actionButton(primaryAction, true)}
    </div>
  );
}
