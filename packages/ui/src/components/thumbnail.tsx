import { cn } from '../lib/cn.js';
import '../styles/polaris/thumbnail.css';

export type ThumbnailSize = 'extraSmall' | 'small' | 'medium' | 'large';

export interface ThumbnailProps {
  source: string;
  /** Required. Empty string marks it decorative; omitting it leaves it unlabelled. */
  alt: string;
  size?: ThumbnailSize;
  transparent?: boolean;
}

const cap = (v: string) => v.charAt(0).toUpperCase() + v.slice(1);

/** Thumbnail — a small product or file image. */
export function Thumbnail({ source, alt, size = 'medium', transparent = false }: ThumbnailProps) {
  return (
    <span
      className={cn(
        'Polaris-Thumbnail',
        `Polaris-Thumbnail--size${cap(size)}`,
        transparent && 'Polaris-Thumbnail--transparent',
      )}
    >
      <img src={source} alt={alt} />
    </span>
  );
}
