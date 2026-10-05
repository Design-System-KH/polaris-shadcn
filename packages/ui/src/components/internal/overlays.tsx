'use client';

import { useId, type ReactNode, type CSSProperties } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '../../lib/cn';
import { Button } from '../button';
import './components.css';

export interface OverlayAction {
  content: string;
  onAction?: () => void;
  disabled?: boolean;
  loading?: boolean;
  destructive?: boolean;
}
export interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  children?: ReactNode;
  className?: string;
  activator?: ReactNode;
  primaryAction?: OverlayAction;
  secondaryActions?: OverlayAction[];
  large?: boolean;
}
export function Modal({
  open,
  defaultOpen,
  onClose,
  onOpenChange,
  title = 'Dialog',
  children,
  className,
  activator,
  primaryAction,
  secondaryActions = [],
  large,
}: ModalProps) {
  return (
    <Dialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(value) => {
        onOpenChange?.(value);
        if (!value) onClose?.();
      }}
    >
      {activator && <Dialog.Trigger asChild>{activator}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="ps-backdrop" />
        <Dialog.Content
          className={cn('ps-modal', large && 'ps-modal-large', className)}
          aria-describedby={undefined}
        >
          <div className="ps-row ps-between ps-modal-header">
            <Dialog.Title className="ps-heading">{title}</Dialog.Title>
            <Dialog.Close className="ps-icon-button" aria-label="Close dialog">
              ×
            </Dialog.Close>
          </div>
          <div className="ps-modal-body">{children}</div>
          {(primaryAction || secondaryActions.length > 0) && (
            <footer className="ps-row ps-modal-footer">
              {secondaryActions.map((action) => (
                <Button
                  key={action.content}
                  disabled={action.disabled}
                  onClick={action.onAction}
                >
                  {action.content}
                </Button>
              ))}
              {primaryAction && (
                <Button
                  variant="primary"
                  tone={primaryAction.destructive ? 'critical' : undefined}
                  disabled={primaryAction.disabled}
                  loading={primaryAction.loading}
                  onClick={primaryAction.onAction}
                >
                  {primaryAction.content}
                </Button>
              )}
            </footer>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
Modal.Section = function ModalSection({ children }: { children?: ReactNode }) {
  return <section className="ps-modal-section">{children}</section>;
};
export interface SheetProps extends ModalProps {
  side?: 'left' | 'right';
}
export function Sheet({
  open,
  defaultOpen,
  onClose,
  onOpenChange,
  title = 'Panel',
  children,
  className,
  activator,
  side = 'right',
}: SheetProps) {
  return (
    <Dialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(value) => {
        onOpenChange?.(value);
        if (!value) onClose?.();
      }}
    >
      {activator && <Dialog.Trigger asChild>{activator}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="ps-backdrop" />
        <Dialog.Content
          className={cn('ps-sheet', `ps-sheet-${side}`, className)}
          aria-describedby={undefined}
        >
          <div className="ps-row ps-between ps-modal-header">
            <Dialog.Title className="ps-heading">{title}</Dialog.Title>
            <Dialog.Close className="ps-icon-button" aria-label="Close panel">
              ×
            </Dialog.Close>
          </div>
          <div className="ps-modal-body">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export interface PopoverProps {
  open?: boolean;
  active?: boolean;
  defaultOpen?: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  children?: ReactNode;
  className?: string;
  activator?: ReactNode;
  preferredPosition?: 'above' | 'below';
  align?: 'start' | 'center' | 'end';
}
export function Popover({
  open,
  active,
  defaultOpen,
  onClose,
  onOpenChange,
  title,
  children,
  className,
  activator,
  preferredPosition = 'below',
  align = 'start',
}: PopoverProps) {
  return (
    <PopoverPrimitive.Root
      open={active ?? open}
      defaultOpen={defaultOpen}
      onOpenChange={(value) => {
        onOpenChange?.(value);
        if (!value) onClose?.();
      }}
    >
      {activator && (
        <PopoverPrimitive.Trigger asChild>{activator}</PopoverPrimitive.Trigger>
      )}
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={cn('ps-popover', className)}
          side={preferredPosition === 'above' ? 'top' : 'bottom'}
          align={align}
          sideOffset={6}
          aria-label={title ?? 'Actions'}
        >
          {title && <h2 className="ps-heading">{title}</h2>}
          {children}
          <PopoverPrimitive.Arrow className="ps-popover-arrow" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
Popover.Pane = function Pane({ children }: { children?: ReactNode }) {
  return <div className="ps-stack">{children}</div>;
};
export interface TooltipProps {
  children?: ReactNode;
  content?: ReactNode;
  title?: string;
  open?: boolean;
  active?: boolean;
  onClose?: () => void;
  className?: string;
  dismissOnMouseOut?: boolean;
}
export function Tooltip({
  children,
  content,
  title,
  open,
  active,
  className,
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={250}>
      <TooltipPrimitive.Root open={active ?? open}>
        <TooltipPrimitive.Trigger asChild>
          {children ?? (
            <button
              type="button"
              className="ps-icon-button"
              aria-label="More information"
            >
              ?
            </button>
          )}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={6}
            className={cn('ps-tooltip', className)}
          >
            {content ?? title ?? 'More information'}
            <TooltipPrimitive.Arrow />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
export interface CollapsibleProps {
  open?: boolean;
  id?: string;
  children?: ReactNode;
  className?: string;
  gap?: string;
  padding?: string;
  transition?: { duration?: string; timingFunction?: string };
}
export function Collapsible({
  open = true,
  id,
  children,
  className,
  gap,
  padding,
}: CollapsibleProps) {
  const generated = useId();
  return (
    <div
      id={id ?? generated}
      hidden={!open}
      className={cn('ps-collapsible', className)}
      style={{
        gap: gap && `var(--p-space-${gap})`,
        padding: padding && `var(--p-space-${padding})`,
      }}
    >
      {children}
    </div>
  );
}
export interface BackdropProps {
  onClick?: () => void;
  onDismiss?: () => void;
  transparent?: boolean;
  belowNavigation?: boolean;
  children?: ReactNode;
  className?: string;
}
export function Backdrop({
  onClick,
  onDismiss,
  transparent,
  children,
  className,
}: BackdropProps) {
  return (
    <div
      className={cn('ps-backdrop', className)}
      aria-hidden="true"
      onClick={onClick ?? onDismiss}
      style={
        { background: transparent ? 'transparent' : undefined } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
