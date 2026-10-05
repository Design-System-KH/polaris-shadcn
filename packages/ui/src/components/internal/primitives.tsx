'use client';

import {
  forwardRef,
  useContext,
  type ReactNode,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ComponentType,
  type SVGProps,
} from 'react';
import { cn } from '../../lib/cn';
import { AppContext } from './utilities';
import './components.css';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  url?: string;
  external?: boolean;
  monochrome?: boolean;
  removeUnderline?: boolean;
}
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    url,
    href,
    external,
    monochrome,
    removeUnderline,
    className,
    children,
    ...rest
  },
  ref,
) {
  const { linkComponent } = useContext(AppContext);
  const Component = linkComponent ?? 'a';
  return (
    <Component
      {...rest}
      href={url ?? href ?? '#'}
      ref={ref}
      target={external ? '_blank' : rest.target}
      rel={external ? 'noreferrer noopener' : rest.rel}
      className={cn(
        'ps-link',
        monochrome && 'ps-link-monochrome',
        removeUnderline && 'ps-no-underline',
        className,
      )}
    >
      {children}
    </Component>
  );
});
export type UnstyledLinkProps = LinkProps;
export const UnstyledLink = forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  function UnstyledLink({ url, href, external, children, ...rest }, ref) {
    return (
      <a
        {...rest}
        ref={ref}
        href={url ?? href ?? '#'}
        target={external ? '_blank' : rest.target}
        rel={external ? 'noreferrer noopener' : rest.rel}
      >
        {children}
      </a>
    );
  },
);
export interface UnstyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  url?: string;
}
export const UnstyledButton = forwardRef<
  HTMLButtonElement,
  UnstyledButtonProps
>(function UnstyledButton({ children, ...props }, ref) {
  return (
    <button type="button" {...props} ref={ref}>
      {children}
    </button>
  );
});
export interface InlineCodeProps {
  children?: ReactNode;
  className?: string;
}
export function InlineCode({ children, className }: InlineCodeProps) {
  return <code className={cn('ps-code', className)}>{children}</code>;
}
export type KeyboardKeyProps = InlineCodeProps;
export function KeyboardKey({ children, className }: KeyboardKeyProps) {
  return <kbd className={cn('ps-key', className)}>{children}</kbd>;
}
export interface TruncateProps extends InlineCodeProps {
  title?: string;
}
export function Truncate({ children, title, className }: TruncateProps) {
  return (
    <span
      className={cn('ps-truncate', className)}
      title={title ?? (typeof children === 'string' ? children : undefined)}
    >
      {children}
    </span>
  );
}
export interface LabelProps extends InlineCodeProps {
  id?: string;
  htmlFor?: string;
  required?: boolean;
  hidden?: boolean;
}
export function Label({
  children,
  id,
  htmlFor,
  required,
  hidden,
  className,
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor ?? id}
      className={cn(hidden && 'ps-visually-hidden', className)}
    >
      {children}
      {required && <span aria-hidden> *</span>}
    </label>
  );
}
export interface InlineErrorProps {
  message?: string;
  fieldID?: string;
  children?: ReactNode;
  tone?: string;
  title?: string;
  className?: string;
}
export function InlineError({
  message,
  fieldID,
  children,
  title,
  className,
}: InlineErrorProps) {
  return (
    <div
      className={cn('ps-error', className)}
      id={fieldID ? `${fieldID}-error` : undefined}
      role="alert"
    >
      <span aria-hidden>ⓘ </span>
      {message ?? children ?? title}
    </div>
  );
}
export interface LabelledProps {
  label?: string;
  id?: string;
  children?: ReactNode;
  helpText?: ReactNode;
  error?: string;
  labelHidden?: boolean;
  className?: string;
  gap?: string;
  padding?: string;
}
export function Labelled({
  label,
  id,
  children,
  helpText,
  error,
  labelHidden,
  className,
}: LabelledProps) {
  return (
    <div className={cn('ps-field', className)}>
      {label && (
        <Label htmlFor={id} hidden={labelHidden}>
          {label}
        </Label>
      )}
      {children}
      {helpText && (
        <div id={`${id}-help`} className="ps-help">
          {helpText}
        </div>
      )}
      {error && <InlineError fieldID={id} message={error} />}
    </div>
  );
}
export interface IconProps {
  source?: string | ComponentType<SVGProps<SVGSVGElement>>;
  alt?: string;
  accessibilityLabel?: string;
  tone?: 'base' | 'subdued' | 'critical' | 'success' | 'warning' | 'info';
  size?: 'extraSmall' | 'small' | 'medium' | 'large';
  className?: string;
}
export function Icon({
  source,
  alt,
  accessibilityLabel,
  tone = 'base',
  size = 'small',
  className,
}: IconProps) {
  const label = accessibilityLabel ?? alt,
    Source = typeof source === 'function' ? source : null;
  return (
    <span
      className={cn('ps-icon', `ps-icon-${tone}`, className)}
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      style={{
        width: size === 'large' ? 32 : 20,
        height: size === 'large' ? 32 : 20,
      }}
    >
      {Source ? (
        <Source aria-hidden />
      ) : source ? (
        <img src={source as string} alt="" />
      ) : (
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm1 12H9V9h2v5Zm0-7H9V5h2v2Z" />
        </svg>
      )}
    </span>
  );
}
export interface ConnectedProps {
  children?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
  gap?: string;
  padding?: string;
}
export function Connected({
  children,
  left,
  right,
  className,
}: ConnectedProps) {
  return (
    <div className={cn('ps-connected', className)}>
      {left}
      <div className="ps-grow">{children}</div>
      {right}
    </div>
  );
}
