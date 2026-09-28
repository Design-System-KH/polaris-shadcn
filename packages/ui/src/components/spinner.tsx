import { cn } from '../lib/cn.js';
import '../styles/polaris/spinner.css';

export interface SpinnerProps {
  size?: 'small' | 'large';
  /** Announced while work is in flight. Omit only if a sibling already says it. */
  accessibilityLabel?: string;
  /** Set false when a parent already owns the live region. */
  hasFocusableParent?: boolean;
}

/**
 * Spinner — indeterminate progress.
 *
 * `role="status"` announces politely rather than interrupting. A spinner with
 * no accessible name is a silent wait for anyone not looking at the screen.
 */
export function Spinner({ size = 'large', accessibilityLabel, hasFocusableParent }: SpinnerProps) {
  return (
    <span role={hasFocusableParent ? undefined : 'status'}>
      <svg
        className={cn('Polaris-Spinner', size === 'small' ? 'Polaris-Spinner--sizeSmall' : 'Polaris-Spinner--sizeLarge')}
        viewBox="0 0 20 20"
        aria-hidden
      >
        <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
      </svg>
      {accessibilityLabel ? <span className="Polaris-Text--visuallyHidden">{accessibilityLabel}</span> : null}
    </span>
  );
}
