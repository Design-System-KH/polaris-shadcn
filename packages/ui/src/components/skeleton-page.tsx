import { cn } from '../lib/cn.js';

export interface SkeletonPageProps {
  lines?: number;
  className?: string;
}

/**
 * SkeletonPage — Whole-page placeholder matching the loaded layout.
 *
 * FIRST PASS. Tokens, prop surface and semantics are real; behaviour is
 * minimal. See STATUS.md for what that means before relying on it.
 */
export function SkeletonPage({ lines = 3, className }: SkeletonPageProps) {
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
