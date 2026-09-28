import { useState } from 'react';
import { cn } from '../lib/cn.js';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  /**
   * Announced label. Pass an empty string when the name is already visible
   * beside the avatar — repeating it is noise for a screen-reader user.
   */
  accessibilityLabel?: string;
  name?: string;
  /** Falls back to initials derived from `name` when no image is available. */
  initials?: string;
  source?: string;
  size?: AvatarSize;
  className?: string;
  onError?: () => void;
}

const SIZES: Record<AvatarSize, string> = {
  xs: '1.5rem',
  sm: '2rem',
  md: '2.5rem',
  lg: '3rem',
  xl: '5rem',
};

const FONT: Record<AvatarSize, string> = {
  xs: 'var(--p-font-size-275)',
  sm: 'var(--p-font-size-300)',
  md: 'var(--p-font-size-325)',
  lg: 'var(--p-font-size-350)',
  xl: 'var(--p-font-size-500)',
};

/**
 * Avatar — a person or entity, with an initials fallback.
 *
 * The fallback is not decoration. An image that 404s leaves a broken icon and
 * a collapsed row unless something takes its place, so a load error swaps to
 * initials rather than leaving a hole in the layout.
 */
export function Avatar({
  accessibilityLabel,
  name,
  initials,
  source,
  size = 'md',
  className,
  onError,
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const dimension = SIZES[size];

  const derived =
    initials ??
    (name
      ? name
          .split(/\s+/)
          .map((part) => part[0])
          .join('')
          .slice(0, 2)
      : undefined);

  const label = accessibilityLabel ?? name;
  const showImage = Boolean(source) && !failed;

  return (
    <span
      // An empty accessibilityLabel means "decorative here", so the element is
      // hidden rather than announced as an unlabelled image.
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={cn('inline-flex shrink-0 items-center justify-center overflow-hidden', className)}
      style={{
        width: dimension,
        height: dimension,
        borderRadius: 'var(--p-border-radius-full)',
        background: showImage ? undefined : 'var(--p-color-bg-fill-tertiary)',
        color: 'var(--p-color-text)',
        fontSize: FONT[size],
        fontWeight: 'var(--p-font-weight-medium)',
      }}
    >
      {showImage ? (
        <img
          src={source}
          alt=""
          width={dimension}
          height={dimension}
          className="size-full object-cover"
          onError={() => {
            setFailed(true);
            onError?.();
          }}
        />
      ) : (
        (derived ?? '').toUpperCase()
      )}
    </span>
  );
}
