import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names, with later Tailwind utilities winning over earlier ones.
 *
 * Without the merge step a caller's `className` cannot override a component's
 * default — `p-400` and `p-200` would both land and the cascade would decide,
 * which is not something a caller can reason about.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
