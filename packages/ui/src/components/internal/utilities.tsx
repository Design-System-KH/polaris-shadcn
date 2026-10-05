'use client';

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  type ReactNode,
  type RefObject,
  type CSSProperties,
  type ComponentType,
  type AnchorHTMLAttributes,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cn';
import './components.css';

interface AppContextValue {
  i18n?: Record<string, unknown>;
  linkComponent?: ComponentType<AnchorHTMLAttributes<HTMLAnchorElement>>;
}
export const AppContext = createContext<AppContextValue>({});
export interface AppProviderProps extends AppContextValue {
  children?: ReactNode;
  theme?: 'light' | 'dark';
}
export function AppProvider({
  children,
  i18n,
  linkComponent,
  theme = 'light',
}: AppProviderProps) {
  return (
    <AppContext.Provider value={{ i18n, linkComponent }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
}
export interface ThemeProviderProps {
  children?: ReactNode;
  theme?: 'light' | 'dark';
  className?: string;
}
export function ThemeProvider({
  children,
  theme = 'light',
  className,
}: ThemeProviderProps) {
  return (
    <div
      className={cn('ps-theme', className)}
      data-theme={theme}
      style={{ colorScheme: theme }}
    >
      {children}
    </div>
  );
}
export type PolarisTestProviderProps = AppProviderProps;
export const PolarisTestProvider = AppProvider;
const PortalContext = createContext<HTMLElement | null>(null);
export interface PortalsManagerProps {
  children?: ReactNode;
  container?: HTMLElement | null;
}
export function PortalsManager({
  children,
  container = null,
}: PortalsManagerProps) {
  return (
    <PortalContext.Provider value={container}>
      {children}
    </PortalContext.Provider>
  );
}
export interface PortalProps {
  children?: ReactNode;
  container?: HTMLElement | null;
  id?: string;
}
export function Portal({ children, container, id }: PortalProps) {
  const managed = useContext(PortalContext),
    [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted
    ? createPortal(
        <div id={id}>{children}</div>,
        container ?? managed ?? document.body,
      )
    : null;
}
export interface EventListenerProps {
  children?: ReactNode;
  event?: string;
  handler?: (event: Event) => void;
  capture?: boolean;
  target?: EventTarget | null;
}
export function EventListener({
  children,
  event,
  handler,
  capture = false,
  target,
}: EventListenerProps) {
  const handlerRef = useRef(handler);
  useLayoutEffect(() => {
    handlerRef.current = handler;
  });
  useEffect(() => {
    if (!event) return;
    const node = target ?? window;
    const listener = (e: Event) => handlerRef.current?.(e);
    node.addEventListener(event, listener, capture);
    return () => node.removeEventListener(event, listener, capture);
  }, [event, target, capture]);
  return <>{children}</>;
}
export interface KeypressListenerProps {
  children?: ReactNode;
  keyCode?: number;
  keyName?: string;
  handler?: (event: KeyboardEvent) => void;
  keyEvent?: 'keydown' | 'keyup';
  disabled?: boolean;
}
export function KeypressListener({
  children,
  keyCode,
  keyName,
  handler,
  keyEvent = 'keydown',
  disabled,
}: KeypressListenerProps) {
  return (
    <EventListener
      event={disabled ? undefined : keyEvent}
      handler={(event) => {
        const e = event as KeyboardEvent;
        const target = e.target as HTMLElement | null;
        if (
          target instanceof Element &&
          target.matches('input, textarea, select, [contenteditable="true"]')
        )
          return;
        if (keyName ? e.key === keyName : e.keyCode === keyCode) handler?.(e);
      }}
    >
      {children}
    </EventListener>
  );
}
let locks = 0,
  priorOverflow = '',
  priorPadding = '';
export interface ScrollLockProps {
  children?: ReactNode;
  active?: boolean;
}
export function ScrollLock({ children, active = true }: ScrollLockProps) {
  useEffect(() => {
    if (!active) return;
    if (locks++ === 0) {
      priorOverflow = document.body.style.overflow;
      priorPadding = document.body.style.paddingRight;
      const scrollbar = Math.max(
        0,
        window.innerWidth - document.documentElement.clientWidth,
      );
      document.body.style.overflow = 'hidden';
      if (scrollbar) document.body.style.paddingRight = `${scrollbar}px`;
    }
    return () => {
      if (--locks === 0) {
        document.body.style.overflow = priorOverflow;
        document.body.style.paddingRight = priorPadding;
      }
    };
  }, [active]);
  return <>{children}</>;
}
export interface StickyProps {
  children?: ReactNode;
  offset?: number;
  className?: string;
}
export function Sticky({ children, offset = 0, className }: StickyProps) {
  return (
    <div
      className={className}
      style={{ position: 'sticky', top: offset, zIndex: 10 }}
    >
      {children}
    </div>
  );
}
export interface FocusProps {
  children?: ReactNode;
  active?: boolean;
  className?: string;
}
export function Focus({ children, active = true, className }: FocusProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (active)
      (
        ref.current?.querySelector<HTMLElement>(
          'input, button, a[href], textarea, select, [tabindex="0"]',
        ) ?? ref.current
      )?.focus();
  }, [active]);
  return (
    <div ref={ref} tabIndex={-1} className={className}>
      {children}
    </div>
  );
}
const focusSelector =
  'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';
export interface TrapFocusProps extends FocusProps {
  trapping?: boolean;
}
export function TrapFocus({
  children,
  active = true,
  trapping,
  className,
}: TrapFocusProps) {
  const ref = useRef<HTMLDivElement>(null),
    enabled = trapping ?? active;
  useEffect(() => {
    if (!enabled || !ref.current) return;
    const root = ref.current,
      previous = document.activeElement as HTMLElement | null;
    const candidates = () =>
      Array.from(root.querySelectorAll<HTMLElement>(focusSelector)).filter(
        (node) => !node.closest('[hidden], [aria-hidden="true"]'),
      );
    (candidates()[0] ?? root).focus();
    const keydown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const list = candidates(),
        first = list[0],
        last = list[list.length - 1];
      if (!first) {
        e.preventDefault();
        root.focus();
      } else if (
        e.shiftKey &&
        (document.activeElement === first || document.activeElement === root)
      ) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const focusin = (e: FocusEvent) => {
      if (!root.contains(e.target as Node)) (candidates()[0] ?? root).focus();
    };
    root.addEventListener('keydown', keydown);
    document.addEventListener('focusin', focusin);
    return () => {
      root.removeEventListener('keydown', keydown);
      document.removeEventListener('focusin', focusin);
      if (previous?.isConnected) previous.focus();
    };
  }, [enabled]);
  return (
    <div ref={ref} className={className} tabIndex={-1}>
      {children}
    </div>
  );
}
export interface PositionedOverlayProps {
  children?: ReactNode;
  activator?: RefObject<HTMLElement | null> | HTMLElement | null;
  active?: boolean;
  preferredPosition?: 'above' | 'below';
  className?: string;
}
export function PositionedOverlay({
  children,
  activator,
  active = true,
  preferredPosition = 'below',
  className,
}: PositionedOverlayProps) {
  const [style, setStyle] = useState<CSSProperties>({ position: 'fixed' });
  useEffect(() => {
    if (!active) return;
    const element =
      activator && 'current' in activator ? activator.current : activator;
    if (!element) return;
    const update = () => {
      const rect = element.getBoundingClientRect();
      setStyle({
        position: 'fixed',
        left: Math.max(8, Math.min(rect.left, window.innerWidth - 280)),
        top: preferredPosition === 'below' ? rect.bottom + 8 : rect.top - 8,
        transform:
          preferredPosition === 'above' ? 'translateY(-100%)' : undefined,
        maxWidth: 'calc(100vw - 16px)',
        zIndex: 500,
      });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [activator, active, preferredPosition]);
  return active ? (
    <Portal>
      <div className={cn('ps-popover', className)} style={style}>
        {children}
      </div>
    </Portal>
  ) : null;
}
export interface ScrollableProps {
  children?: ReactNode;
  className?: string;
  horizontal?: boolean;
  vertical?: boolean;
  shadow?: boolean;
  height?: string | number;
  gap?: string;
  padding?: string;
}
export function Scrollable({
  children,
  className,
  horizontal,
  vertical = true,
  shadow = true,
  height = 240,
  gap,
  padding,
}: ScrollableProps) {
  const [start, setStart] = useState(true),
    [end, setEnd] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const update = () => {
    const node = ref.current;
    if (!node) return;
    setStart(node.scrollTop <= 0);
    setEnd(node.scrollTop + node.clientHeight >= node.scrollHeight - 1);
  };
  useEffect(update, [children]);
  return (
    <div
      ref={ref}
      className={cn('ps-scrollable', className)}
      onScroll={update}
      style={{
        height,
        overflowX: horizontal ? 'auto' : 'hidden',
        overflowY: vertical ? 'auto' : 'hidden',
        boxShadow: shadow
          ? `${!start ? 'inset 0 10px 10px -10px #0003' : 'inset 0 0 transparent'}, ${!end ? 'inset 0 -10px 10px -10px #0003' : 'inset 0 0 transparent'}`
          : undefined,
        gap: gap && `var(--p-space-${gap})`,
        padding: padding && `var(--p-space-${padding})`,
      }}
    >
      {children}
    </div>
  );
}
