import { cn } from '../lib/cn.js';

export interface ImageProps {
  source?: string;
  /** Empty string marks it decorative; omit it and the image is unlabelled. */
  alt: string;
  size?: 'extraSmall' | 'small' | 'medium' | 'large';
  className?: string;
}

const SIZES: Record<NonNullable<ImageProps['size']>, string> = {
  extraSmall: '1.5rem',
  small: '2rem',
  medium: '2.5rem',
  large: '5rem',
};

/**
 * Image — Image with dimensions reserved to prevent layout shift.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function Image({ source, alt, size = 'medium', className }: ImageProps) {
  const dimension = SIZES[size];
  return source ? (
    // width and height are set so the box is reserved before the image loads.
    <img
      src={source}
      alt={alt}
      width={dimension}
      height={dimension}
      className={cn('object-cover', className)}
      style={{ width: dimension, height: dimension, borderRadius: 'var(--p-border-radius-200)' }}
    />
  ) : (
    <span
      role="img"
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={cn('inline-flex items-center justify-center', className)}
      style={{
        width: dimension,
        height: dimension,
        background: 'var(--p-color-bg-fill-secondary)',
        borderRadius: 'var(--p-border-radius-200)',
        color: 'var(--p-color-text-secondary)',
        fontSize: 'var(--p-font-size-300)',
      }}
    >
      {alt ? alt.slice(0, 2).toUpperCase() : null}
    </span>
  );
}
