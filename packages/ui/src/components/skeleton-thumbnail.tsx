import { cn } from '../lib/cn.js';

export interface SkeletonThumbnailProps {
  lines?: number;
  className?: string;
}

/**
 * SkeletonThumbnail — Placeholder for a thumbnail.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function SkeletonThumbnail({ lines = 3, className }: SkeletonThumbnailProps) {
  return (
    // aria-hidden: a placeholder has nothing to announce, and announcing it
    // interrupts a screen-reader user with noise while they wait.
    <div aria-hidden className={cn('flex flex-col gap-[var(--p-space-200)]', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className="h-3 animate-pulse"
          style={{
            background: 'var(--p-color-bg-fill-disabled)',
            borderRadius: 'var(--p-border-radius-100)',
            width: i === lines - 1 ? '60%' : '100%',
          }}
        />
      ))}
    </div>
  );
}
