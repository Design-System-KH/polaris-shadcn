import { cn } from '../lib/cn.js';
import '../styles/polaris/skeleton-thumbnail.css';

export type SkeletonThumbnailSize = 'extraSmall' | 'small' | 'medium' | 'large';

export interface SkeletonThumbnailProps {
  size?: SkeletonThumbnailSize;
}

const SIZES: Record<SkeletonThumbnailSize, string> = {
  extraSmall: 'Polaris-SkeletonThumbnail--sizeExtraSmall',
  small: 'Polaris-SkeletonThumbnail--sizeSmall',
  medium: 'Polaris-SkeletonThumbnail--sizeMedium',
  large: 'Polaris-SkeletonThumbnail--sizeLarge',
};

/** SkeletonThumbnail — placeholder for a thumbnail, sized to match the real one. */
export function SkeletonThumbnail({ size = 'medium' }: SkeletonThumbnailProps) {
  return <div aria-hidden className={cn('Polaris-SkeletonThumbnail', SIZES[size])} />;
}
