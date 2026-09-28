import type { ElementType, ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import type { BorderRadiusScale, ShadowScale, SpaceScale } from '../lib/tokens.js';

export interface BoxProps {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  /** Maps to --p-color-bg-*; pass the token suffix, e.g. "surface". */
  background?: string;
  padding?: SpaceScale;
  paddingBlock?: SpaceScale;
  paddingInline?: SpaceScale;
  borderRadius?: BorderRadiusScale;
  borderWidth?: '0' | '025' | '050' | '100';
  borderColor?: string;
  shadow?: ShadowScale;
  minHeight?: string;
  width?: string;
  id?: string;
}

/**
 * The primitive every other layout component is built from.
 *
 * Props take Polaris token *names*, not CSS values. `padding="400"` is 1rem
 * because the token says so — a component that accepted "16px" would let a
 * caller step outside the scale, which is the thing a design system is for.
 */
export function Box({
  as: Component = 'div',
  children,
  className,
  background,
  padding,
  paddingBlock,
  paddingInline,
  borderRadius,
  borderWidth,
  borderColor,
  shadow,
  minHeight,
  width,
  id,
}: BoxProps) {
  return (
    <Component
      id={id}
      className={cn(className)}
      style={{
        background: background ? `var(--p-color-bg-${background})` : undefined,
        padding: padding ? `var(--p-space-${padding})` : undefined,
        paddingBlock: paddingBlock ? `var(--p-space-${paddingBlock})` : undefined,
        paddingInline: paddingInline ? `var(--p-space-${paddingInline})` : undefined,
        borderRadius: borderRadius ? `var(--p-border-radius-${borderRadius})` : undefined,
        borderWidth: borderWidth ? `var(--p-border-width-${borderWidth})` : undefined,
        borderStyle: borderWidth ? 'solid' : undefined,
        borderColor: borderColor ? `var(--p-color-border-${borderColor})` : undefined,
        boxShadow: shadow ? `var(--p-shadow-${shadow})` : undefined,
        minHeight,
        width,
      }}
    >
      {children}
    </Component>
  );
}
