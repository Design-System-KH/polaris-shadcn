/**
 * Polaris scale names, exposed as types so component props accept exactly the
 * values the design system defines and nothing else.
 */
export const SPACE = [
  '0', '025', '050', '100', '150', '200', '300', '400',
  '500', '600', '800', '1000', '1200', '1600', '2000', '2400',
  '2800', '3200',
] as const;
export type SpaceScale = (typeof SPACE)[number];

export const RADIUS = ['0', '050', '100', '150', '200', '300', '400', '500', 'full'] as const;
export type BorderRadiusScale = (typeof RADIUS)[number];

export const SHADOW = [
  '0', '100', '200', '300', '400', '500', '600',
  'bevel-100', 'inset-100', 'inset-200', 'button', 'button-hover',
] as const;
export type ShadowScale = (typeof SHADOW)[number];

/** Polaris text variants, smallest to largest. */
export const TEXT_VARIANTS = [
  'bodyXs', 'bodySm', 'bodyMd', 'bodyLg',
  'headingXs', 'headingSm', 'headingMd', 'headingLg', 'headingXl', 'heading2xl', 'heading3xl',
] as const;
export type TextVariant = (typeof TEXT_VARIANTS)[number];

export type Tone =
  | 'base' | 'inherit' | 'disabled' | 'subdued' | 'caution'
  | 'critical' | 'info' | 'success' | 'warning' | 'magic' | 'emphasis';
