import { cn } from '../lib/cn';
import '../styles/polaris/skeleton-display-text.css';

export type SkeletonDisplayTextSize = 'small' | 'medium' | 'large' | 'extraLarge';

export interface SkeletonDisplayTextProps {
  size?: SkeletonDisplayTextSize;
  maxWidth?: `${number}%`;
}

const SIZES: Record<SkeletonDisplayTextSize, string> = {
  small: 'Polaris-SkeletonDisplayText--sizeSmall',
  medium: 'Polaris-SkeletonDisplayText--sizeMedium',
  large: 'Polaris-SkeletonDisplayText--sizeLarge',
  extraLarge: 'Polaris-SkeletonDisplayText--sizeExtraLarge',
};

/** SkeletonDisplayText — placeholder for a heading. */
export function SkeletonDisplayText({ size = 'medium', maxWidth }: SkeletonDisplayTextProps) {
  return (
    <div
      aria-hidden
      className={cn('Polaris-SkeletonDisplayText__DisplayText', SIZES[size])}
      style={maxWidth ? { maxWidth } : undefined}
    />
  );
}
