import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cn } from '../lib/cn';
import type { BorderRadiusScale, ShadowScale, SpaceScale } from '../lib/tokens';
import '../styles/polaris/box.css';

export interface BoxProps {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  id?: string;

  /** Token suffix from --p-color-*, e.g. "bg-surface". Polaris naming. */
  background?: string;
  color?: string;

  padding?: SpaceScale;
  paddingBlock?: SpaceScale;
  paddingBlockStart?: SpaceScale;
  paddingBlockEnd?: SpaceScale;
  paddingInline?: SpaceScale;
  paddingInlineStart?: SpaceScale;
  paddingInlineEnd?: SpaceScale;

  borderColor?: string | 'transparent';
  borderStyle?: 'solid' | 'dashed' | 'none';
  borderWidth?: '0' | '025' | '050' | '100';
  borderRadius?: BorderRadiusScale;

  outlineColor?: string;
  outlineStyle?: 'solid' | 'dashed' | 'none';
  outlineWidth?: '0' | '025' | '050' | '100';

  shadow?: ShadowScale;
  minHeight?: string;
  minWidth?: string;
  maxWidth?: string;
  width?: string;
  overflowX?: 'hidden' | 'clip' | 'scroll' | 'visible';
  overflowY?: 'hidden' | 'clip' | 'scroll' | 'visible';
  position?: CSSProperties['position'];
  zIndex?: string;
  opacity?: string;
  visuallyHidden?: boolean;
  printHidden?: boolean;
}

/**
 * Box — Polaris's layout primitive.
 *
 * Props are written as `--pc-box-*` custom properties which `.Polaris-Box`
 * consumes, rather than as inline styles. That is not incidental: the class
 * carries the responsive fallback chain (`xs` through `lg`) and the
 * interaction between padding shorthands and their directional overrides.
 * Setting inline styles instead produces something that looks right until the
 * first breakpoint, which is how the earlier version of this file was wrong.
 */
export function Box({
  as: Component = 'div',
  children,
  className,
  id,
  background,
  color,
  padding,
  paddingBlock,
  paddingBlockStart,
  paddingBlockEnd,
  paddingInline,
  paddingInlineStart,
  paddingInlineEnd,
  borderColor,
  borderStyle,
  borderWidth,
  borderRadius,
  outlineColor,
  outlineStyle,
  outlineWidth,
  shadow,
  minHeight,
  minWidth,
  maxWidth,
  width,
  overflowX,
  overflowY,
  position,
  zIndex,
  opacity,
  visuallyHidden = false,
  printHidden = false,
}: BoxProps) {
  // Polaris infers a style when a colour or width is given without one, so a
  // border appears rather than silently doing nothing.
  const resolvedBorderStyle = borderStyle ?? (borderColor || borderWidth ? 'solid' : undefined);
  const resolvedOutlineStyle = outlineStyle ?? (outlineColor || outlineWidth ? 'solid' : undefined);

  const space = (value?: SpaceScale) => (value ? `var(--p-space-${value})` : undefined);

  const style = {
    '--pc-box-color': color ? `var(--p-color-${color})` : undefined,
    '--pc-box-background': background ? `var(--p-color-${background})` : undefined,
    '--pc-box-border-color':
      borderColor === 'transparent'
        ? 'transparent'
        : borderColor
          ? `var(--p-color-${borderColor})`
          : undefined,
    '--pc-box-border-style': resolvedBorderStyle,
    '--pc-box-border-radius': borderRadius ? `var(--p-border-radius-${borderRadius})` : undefined,
    '--pc-box-border-width': borderWidth ? `var(--p-border-width-${borderWidth})` : undefined,
    '--pc-box-outline-color': outlineColor ? `var(--p-color-${outlineColor})` : undefined,
    '--pc-box-outline-style': resolvedOutlineStyle,
    '--pc-box-outline-width': outlineWidth ? `var(--p-border-width-${outlineWidth})` : undefined,
    // The xs suffix is the base step of Polaris's responsive chain; larger
    // breakpoints fall back to it when unset.
    '--pc-box-padding-block-start-xs': space(paddingBlockStart ?? paddingBlock ?? padding),
    '--pc-box-padding-block-end-xs': space(paddingBlockEnd ?? paddingBlock ?? padding),
    '--pc-box-padding-inline-start-xs': space(paddingInlineStart ?? paddingInline ?? padding),
    '--pc-box-padding-inline-end-xs': space(paddingInlineEnd ?? paddingInline ?? padding),
    '--pc-box-shadow': shadow ? `var(--p-shadow-${shadow})` : undefined,
    '--pc-box-min-height': minHeight,
    '--pc-box-min-width': minWidth,
    '--pc-box-max-width': maxWidth,
    '--pc-box-width': width,
    '--pc-box-overflow-x': overflowX,
    '--pc-box-overflow-y': overflowY,
    position,
    zIndex,
    opacity,
  } as CSSProperties;

  return (
    <Component
      id={id}
      className={cn(
        'Polaris-Box',
        visuallyHidden && 'Polaris-Box--visuallyHidden',
        printHidden && 'Polaris-Box--printHidden',
        Component === 'ul' && 'Polaris-Box--listReset',
        className,
      )}
      style={style}
    >
      {children}
    </Component>
  );
}
