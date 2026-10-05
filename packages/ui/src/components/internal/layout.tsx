'use client';

import {
  useId,
  type ReactNode,
  type CSSProperties,
  type FormHTMLAttributes,
} from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../button';
import { Popover } from './overlays';
import { useValue } from './controls';
import './components.css';

export interface ContainerProps {
  children?: ReactNode;
  className?: string;
  gap?: string;
  padding?: string;
}
export interface GridProps extends ContainerProps {
  columns?: number;
}
export function Grid({
  children,
  className,
  columns = 12,
  gap = '400',
}: GridProps) {
  return (
    <div
      className={cn('ps-grid', className)}
      style={
        {
          '--ps-columns': columns,
          gap: `var(--p-space-${gap})`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
Grid.Cell = function Cell({
  children,
  columnSpan = 6,
}: {
  children?: ReactNode;
  columnSpan?:
    | number
    | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
}) {
  const spans =
    typeof columnSpan === 'number'
      ? { xs: columnSpan, md: columnSpan }
      : columnSpan;
  return (
    <div
      className="ps-grid-cell"
      style={
        {
          '--ps-span': spans.xs ?? 12,
          '--ps-span-md': spans.md ?? spans.sm ?? spans.xs ?? 6,
          '--ps-span-lg': spans.lg ?? spans.xl ?? spans.md ?? 6,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
};
export interface LayoutProps extends ContainerProps {
  title?: string;
  primaryAction?: ReactNode;
  secondaryActions?: ReactNode;
}
export function Layout({ children, className }: LayoutProps) {
  return <div className={cn('ps-layout', className)}>{children}</div>;
}
Layout.Section = function Section({
  children,
  variant,
  secondary,
}: {
  children?: ReactNode;
  variant?: 'oneHalf' | 'oneThird' | 'fullWidth';
  secondary?: boolean;
}) {
  return (
    <section
      className={cn(
        'ps-layout-section',
        (secondary || variant === 'oneThird') && 'ps-layout-secondary',
        variant === 'oneHalf' && 'ps-layout-half',
        variant === 'fullWidth' && 'ps-layout-full',
      )}
    >
      {children}
    </section>
  );
};
Layout.AnnotatedSection = function AnnotatedSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="ps-annotated">
      <div>
        <h2 className="ps-heading">{title}</h2>
        <p className="ps-help">{description}</p>
      </div>
      <div>{children}</div>
    </section>
  );
};
export interface PageAction {
  content: string;
  onAction?: () => void;
  url?: string;
  disabled?: boolean;
  loading?: boolean;
  destructive?: boolean;
}
function Action({
  action,
  primary,
}: {
  action: PageAction | ReactNode;
  primary?: boolean;
}) {
  if (typeof action === 'object' && action && 'content' in action) {
    const a = action as PageAction;
    return a.url ? (
      <Button variant={primary ? 'primary' : 'secondary'} asChild>
        <a href={a.url}>{a.content}</a>
      </Button>
    ) : (
      <Button
        variant={primary ? 'primary' : 'secondary'}
        disabled={a.disabled}
        loading={a.loading}
        tone={a.destructive ? 'critical' : undefined}
        onClick={a.onAction}
      >
        {a.content}
      </Button>
    );
  }
  return <>{action as ReactNode}</>;
}
export interface PageProps {
  children?: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  titleMetadata?: ReactNode;
  additionalMetadata?: ReactNode;
  primaryAction?: PageAction | ReactNode;
  secondaryActions?: PageAction[] | ReactNode;
  backAction?: { content: string; url?: string; onAction?: () => void };
  fullWidth?: boolean;
  narrowWidth?: boolean;
}
export function Page({
  children,
  className,
  title,
  subtitle,
  titleMetadata,
  additionalMetadata,
  primaryAction,
  secondaryActions,
  backAction,
  fullWidth,
  narrowWidth,
}: PageProps) {
  return (
    <div
      className={cn(
        'ps-page',
        fullWidth && 'ps-page-full',
        narrowWidth && 'ps-page-narrow',
        className,
      )}
    >
      {backAction &&
        (backAction.url ? (
          <a className="ps-back" href={backAction.url}>
            ← {backAction.content}
          </a>
        ) : (
          <button
            type="button"
            className="ps-back"
            onClick={backAction.onAction}
          >
            ← {backAction.content}
          </button>
        ))}
      {(title || primaryAction || secondaryActions) && (
        <header className="ps-page-header">
          <div>
            <div className="ps-row ps-wrap">
              <h1>{title}</h1>
              {titleMetadata}
            </div>
            {subtitle && <p className="ps-help">{subtitle}</p>}
            {additionalMetadata && (
              <p className="ps-help">{additionalMetadata}</p>
            )}
          </div>
          <div className="ps-row ps-wrap">
            {Array.isArray(secondaryActions)
              ? secondaryActions.map((action, i) => (
                  <Action key={i} action={action} />
                ))
              : secondaryActions}
            {primaryAction && <Action action={primaryAction} primary />}
          </div>
        </header>
      )}
      {children}
    </div>
  );
}
export type PageActionsProps = Pick<
  PageProps,
  'primaryAction' | 'secondaryActions' | 'className' | 'children' | 'title'
>;
export function PageActions({
  primaryAction,
  secondaryActions,
  className,
  children,
}: PageActionsProps) {
  return (
    <div className={cn('ps-page-actions', className)}>
      <div className="ps-row">
        {Array.isArray(secondaryActions)
          ? secondaryActions.map((a, i) => <Action key={i} action={a} />)
          : secondaryActions}
      </div>
      <div className="ps-row">
        {children}
        {primaryAction && <Action action={primaryAction} primary />}
      </div>
    </div>
  );
}
export interface FrameProps extends PageProps {
  topBar?: ReactNode;
  navigation?: ReactNode;
  showMobileNavigation?: boolean;
  onNavigationDismiss?: () => void;
}
export function Frame({
  children,
  topBar,
  navigation,
  showMobileNavigation,
  onNavigationDismiss,
  className,
  title,
  primaryAction,
  secondaryActions,
}: FrameProps) {
  return (
    <div className={cn('ps-frame', className)}>
      <a className="ps-skip-link" href="#ps-main-content">
        Skip to content
      </a>
      {topBar}
      <div className="ps-frame-body">
        {navigation && (
          <>
            <aside
              className={cn(
                'ps-frame-nav',
                showMobileNavigation && 'ps-frame-nav-open',
              )}
            >
              {navigation}
            </aside>
            {showMobileNavigation && (
              <button
                className="ps-mobile-scrim"
                aria-label="Close navigation"
                onClick={onNavigationDismiss}
              />
            )}
          </>
        )}
        <main id="ps-main-content" className="ps-frame-main">
          {title ? (
            <Page
              title={title}
              primaryAction={primaryAction}
              secondaryActions={secondaryActions}
            >
              {children}
            </Page>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
export interface FullscreenBarProps {
  children?: ReactNode;
  title?: string;
  onAction?: () => void;
  onExit?: () => void;
  className?: string;
  primaryAction?: ReactNode;
  secondaryActions?: ReactNode;
}
export function FullscreenBar({
  children,
  title,
  onAction,
  onExit,
  className,
  primaryAction,
  secondaryActions,
}: FullscreenBarProps) {
  return (
    <header className={cn('ps-fullscreen-bar', className)}>
      <Button onClick={onExit ?? onAction}>← Exit</Button>
      <strong>{title}</strong>
      <div className="ps-row">
        {children}
        {secondaryActions}
        {primaryAction}
      </div>
    </header>
  );
}
export interface ContextualSaveBarProps extends FullscreenBarProps {
  message?: string;
  saveAction?: Partial<PageAction>;
  discardAction?: Partial<PageAction>;
}
export function ContextualSaveBar({
  message = 'Unsaved changes',
  saveAction,
  discardAction,
  className,
  primaryAction,
  secondaryActions,
}: ContextualSaveBarProps) {
  return (
    <div
      className={cn('ps-save-bar', className)}
      role="region"
      aria-label="Unsaved changes"
    >
      <strong>{message}</strong>
      <div className="ps-row">
        {secondaryActions}
        <Button
          onClick={discardAction?.onAction}
          disabled={discardAction?.disabled}
        >
          {discardAction?.content ?? 'Discard'}
        </Button>
        {primaryAction ?? (
          <Button
            variant="primary"
            onClick={saveAction?.onAction}
            disabled={saveAction?.disabled}
            loading={saveAction?.loading}
          >
            {saveAction?.content ?? 'Save'}
          </Button>
        )}
      </div>
    </div>
  );
}
export interface ButtonGroupProps extends ContainerProps {
  segmented?: boolean;
  fullWidth?: boolean;
}
export function ButtonGroup({
  children,
  className,
  segmented,
  fullWidth,
  gap = '200',
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        'ps-button-group',
        segmented && 'ps-segmented',
        fullWidth && 'ps-button-group-full',
        className,
      )}
      style={{ gap: segmented ? 0 : `var(--p-space-${gap})` }}
    >
      {children}
    </div>
  );
}
export interface FormProps extends Omit<
  FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
> {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  gap?: string;
  padding?: string;
  preventDefault?: boolean;
}
export function Form({
  children,
  onSubmit,
  preventDefault = true,
  gap = '400',
  padding,
  className,
  ...rest
}: FormProps) {
  return (
    <form
      {...rest}
      className={cn('ps-stack', className)}
      style={{
        gap: `var(--p-space-${gap})`,
        padding: padding && `var(--p-space-${padding})`,
      }}
      onSubmit={(event) => {
        if (preventDefault) event.preventDefault();
        onSubmit?.(event);
      }}
    >
      {children}
    </form>
  );
}
export type FormLayoutProps = ContainerProps;
export function FormLayout({
  children,
  className,
  gap = '400',
}: FormLayoutProps) {
  return (
    <div
      className={cn('ps-stack', className)}
      style={{ gap: `var(--p-space-${gap})` }}
    >
      {children}
    </div>
  );
}
FormLayout.Group = function Group({ children }: { children?: ReactNode }) {
  return <div className="ps-form-group">{children}</div>;
};
export interface LegacyStackProps extends ContainerProps {
  vertical?: boolean;
  distribution?: 'equalSpacing' | 'fill' | 'center' | 'leading' | 'trailing';
  alignment?: 'center' | 'leading' | 'trailing' | 'fill';
  spacing?: 'extraTight' | 'tight' | 'loose' | 'extraLoose';
}
export function LegacyStack({
  children,
  className,
  vertical,
  gap = '400',
  spacing,
  distribution,
  alignment,
}: LegacyStackProps) {
  return (
    <div
      className={cn(vertical ? 'ps-stack' : 'ps-row ps-wrap', className)}
      style={{
        gap: `var(--p-space-${spacing ? { extraTight: '100', tight: '200', loose: '500', extraLoose: '600' }[spacing] : gap})`,
        justifyContent:
          distribution === 'equalSpacing'
            ? 'space-between'
            : distribution === 'center'
              ? 'center'
              : undefined,
        alignItems:
          alignment === 'leading'
            ? 'flex-start'
            : alignment === 'trailing'
              ? 'flex-end'
              : alignment === 'fill'
                ? 'stretch'
                : 'center',
      }}
    >
      {children}
    </div>
  );
}
LegacyStack.Item = function Item({
  children,
  fill,
}: {
  children?: ReactNode;
  fill?: boolean;
}) {
  return <div style={{ flex: fill ? 1 : undefined }}>{children}</div>;
};
export interface TextContainerProps extends ContainerProps {
  spacing?: 'tight' | 'loose';
}
export function TextContainer({
  children,
  className,
  spacing,
}: TextContainerProps) {
  return (
    <div
      className={cn('ps-stack', className)}
      style={{ gap: spacing === 'tight' ? 8 : spacing === 'loose' ? 24 : 16 }}
    >
      {children}
    </div>
  );
}
export interface NavigationItem {
  id?: string;
  label: string;
  href?: string;
  url?: string;
  selected?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  badge?: ReactNode;
  onClick?: () => void;
  subNavigationItems?: NavigationItem[];
}
export interface NavigationProps {
  items?: NavigationItem[];
  location?: string;
  ariaLabel?: string;
  children?: ReactNode;
  className?: string;
}
function NavigationLinks({
  items,
  location,
}: {
  items: NavigationItem[];
  location?: string;
}) {
  return (
    <ul className="ps-nav-list">
      {items.map((item, i) => (
        <li key={item.id ?? i}>
          {item.disabled ? (
            <span className="ps-nav-link ps-disabled">{item.label}</span>
          ) : (
            <a
              className={cn(
                'ps-nav-link',
                (item.selected || location === (item.url ?? item.href)) &&
                  'ps-nav-selected',
              )}
              href={item.url ?? item.href ?? '#'}
              aria-current={
                item.selected || location === (item.url ?? item.href)
                  ? 'page'
                  : undefined
              }
              onClick={item.onClick}
            >
              {item.icon}
              <span className="ps-grow">{item.label}</span>
              {item.badge}
            </a>
          )}
          {item.subNavigationItems && (
            <div className="ps-nav-sub">
              <NavigationLinks
                items={item.subNavigationItems}
                location={location}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
export function Navigation({
  items = [],
  location,
  ariaLabel = 'Main navigation',
  children,
  className,
}: NavigationProps) {
  return (
    <nav aria-label={ariaLabel} className={cn('ps-navigation', className)}>
      <NavigationLinks items={items} location={location} />
      {children}
    </nav>
  );
}
Navigation.Section = function NavigationSection({
  items = [],
  title,
}: {
  items?: NavigationItem[];
  title?: string;
}) {
  return (
    <section>
      {title && <h2 className="ps-nav-heading">{title}</h2>}
      <NavigationLinks items={items} />
    </section>
  );
};
export interface TopBarProps {
  children?: ReactNode;
  className?: string;
  items?: NavigationItem[];
  ariaLabel?: string;
  searchField?: ReactNode;
  userMenu?: ReactNode;
  contextControl?: ReactNode;
  onNavigationToggle?: () => void;
  showNavigationToggle?: boolean;
}
export function TopBar({
  children,
  className,
  searchField,
  userMenu,
  contextControl,
  onNavigationToggle,
  showNavigationToggle,
  items = [],
}: TopBarProps) {
  return (
    <header className={cn('ps-topbar', className)}>
      {showNavigationToggle && (
        <button
          type="button"
          className="ps-topbar-toggle"
          aria-label="Open navigation"
          onClick={onNavigationToggle}
        >
          ☰
        </button>
      )}
      <div>{contextControl ?? <strong>My store</strong>}</div>
      <div className="ps-topbar-search">{searchField}</div>
      {items.map((item) => (
        <a key={item.id ?? item.label} href={item.url ?? item.href}>
          {item.label}
        </a>
      ))}
      {children}
      {userMenu}
    </header>
  );
}
TopBar.SearchField = function SearchField({
  value = '',
  onChange,
  placeholder = 'Search',
}: {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      aria-label="Search"
      className="ps-input"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
    />
  );
};
TopBar.UserMenu = function UserMenu({
  name,
  detail,
  initials,
  open,
  onToggle,
}: {
  name: string;
  detail?: string;
  initials?: string;
  open?: boolean;
  onToggle?: () => void;
}) {
  return (
    <Popover
      open={open}
      onOpenChange={onToggle}
      activator={
        <button className="ps-user-button" type="button">
          <span>{initials ?? name.charAt(0)}</span>
          {name}
        </button>
      }
      title="Account"
    >
      <strong>{name}</strong>
      <p className="ps-help">{detail}</p>
    </Popover>
  );
};
export interface BreadcrumbsProps {
  items?: {
    id?: string;
    label?: string;
    content?: string;
    href?: string;
    url?: string;
  }[];
  backAction?: { content: string; url?: string; onAction?: () => void };
  className?: string;
  ariaLabel?: string;
  children?: ReactNode;
}
export function Breadcrumbs({
  items = [],
  backAction,
  className,
  ariaLabel = 'Breadcrumbs',
}: BreadcrumbsProps) {
  return (
    <nav aria-label={ariaLabel} className={className}>
      {backAction ? (
        backAction.url ? (
          <a href={backAction.url} className="ps-back">
            ← {backAction.content}
          </a>
        ) : (
          <button
            className="ps-back"
            type="button"
            onClick={backAction.onAction}
          >
            ← {backAction.content}
          </button>
        )
      ) : (
        <ol className="ps-breadcrumbs">
          {items.map((item, i) => (
            <li key={item.id ?? i}>
              {i > 0 && <span aria-hidden>/ </span>}
              <a
                href={item.url ?? item.href ?? '#'}
                aria-current={i === items.length - 1 ? 'page' : undefined}
              >
                {item.content ?? item.label}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
export interface PaginationProps {
  hasPrevious?: boolean;
  hasNext?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  label?: ReactNode;
  className?: string;
  items?: NavigationItem[];
  children?: ReactNode;
  ariaLabel?: string;
}
export function Pagination({
  hasPrevious = false,
  hasNext = false,
  onPrevious,
  onNext,
  label,
  className,
}: PaginationProps) {
  return (
    <nav aria-label="Pagination" className={cn('ps-row', className)}>
      <Button
        aria-label="Previous page"
        disabled={!hasPrevious}
        onClick={onPrevious}
      >
        ‹
      </Button>
      {label && <span aria-live="polite">{label}</span>}
      <Button aria-label="Next page" disabled={!hasNext} onClick={onNext}>
        ›
      </Button>
    </nav>
  );
}
export interface TabsProps {
  tabs?: {
    id: string;
    content: string;
    badge?: ReactNode;
    disabled?: boolean;
  }[];
  items?: NavigationItem[];
  selected?: number;
  onSelect?: (selected: number) => void;
  children?: ReactNode;
  ariaLabel?: string;
  className?: string;
}
export function Tabs({
  tabs,
  items = [],
  selected,
  onSelect,
  children,
  ariaLabel = 'Views',
  className,
}: TabsProps) {
  const instanceId = useId();
  const entries =
    tabs ??
    items.map((item, i) => ({
      id: item.id ?? `tab-${i}`,
      content: item.label,
      badge: item.badge,
      disabled: item.disabled,
    }));
  const [index, change] = useValue(
    selected,
    Math.max(
      0,
      items.findIndex((item) => item.selected),
    ),
    onSelect,
  );
  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="ps-tabs"
        onKeyDown={(e) => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key))
            return;
          e.preventDefault();
          const enabled = entries
            .map((entry, i) => (entry.disabled ? -1 : i))
            .filter((i) => i >= 0);
          if (!enabled.length) return;
          const current = enabled.indexOf(index);
          const next =
            e.key === 'Home'
              ? enabled[0]
              : e.key === 'End'
                ? enabled[enabled.length - 1]
                : enabled[
                    (current +
                      (e.key === 'ArrowRight' ? 1 : -1) +
                      enabled.length) %
                      enabled.length
                  ];
          if (next !== undefined) {
            change(next);
            const buttons =
              e.currentTarget.querySelectorAll<HTMLButtonElement>(
                '[role="tab"]',
              );
            buttons[next]?.focus();
          }
        }}
      >
        {entries.map((tab, i) => (
          <button
            type="button"
            key={tab.id}
            id={`${instanceId}-${tab.id}`}
            role="tab"
            aria-selected={i === index}
            aria-controls={
              children ? `${instanceId}-${tab.id}-panel` : undefined
            }
            tabIndex={i === index ? 0 : -1}
            disabled={tab.disabled}
            className={cn('ps-tab', i === index && 'ps-tab-selected')}
            onClick={() => change(i)}
          >
            {tab.content}
            {tab.badge}
          </button>
        ))}
      </div>
      {children && entries[index] && (
        <div
          className="ps-tab-panel"
          role="tabpanel"
          id={`${instanceId}-${entries[index].id}-panel`}
          aria-labelledby={`${instanceId}-${entries[index].id}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
export type LegacyTabsProps = TabsProps;
export const LegacyTabs = Tabs;
