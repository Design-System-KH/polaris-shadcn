import { useEffect, useRef } from 'react';
import { cn } from '../lib/cn';
// Toast lives under Frame in Polaris's stylesheet, as Polaris-Frame-Toast.
import '../styles/polaris/frame.css';

export interface ToastProps {
  content: string;
  onDismiss: () => void;
  /** Milliseconds. Polaris defaults to 5000, or 10000 with an action. */
  duration?: number;
  error?: boolean;
  action?: { content: string; onAction?: () => void };
}

const DEFAULT_DURATION = 5000;
const DURATION_WITH_ACTION = 10_000;

/**
 * Toast — a brief confirmation.
 *
 * Never put the only path to an action in a toast: it disappears, and anyone
 * who looked away has lost it. Errors that matter belong in a Banner, in the
 * page, where they persist.
 *
 * The dismiss timer pauses on hover and on focus. Without that, a toast with
 * an Undo button can vanish while the user is reaching for it.
 */
export function Toast({ content, onDismiss, duration, error = false, action }: ToastProps) {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = duration ?? (action ? DURATION_WITH_ACTION : DEFAULT_DURATION);

  const clear = () => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = null;
  };

  const start = () => {
    clear();
    timeout.current = setTimeout(onDismiss, total);
  };

  useEffect(() => {
    start();
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, total]);

  return (
    <div
      // Errors interrupt; confirmations wait for a pause.
      role={error ? 'alert' : 'status'}
      aria-live={error ? 'assertive' : 'polite'}
      className={cn('Polaris-Frame-Toast', error && 'Polaris-Frame-Toast--error')}
      onMouseEnter={clear}
      onMouseLeave={start}
      onFocus={clear}
      onBlur={start}
    >
      <span>{content}</span>
      {action ? (
        <button type="button" className="Polaris-Frame-Toast__Action" onClick={action.onAction}>
          {action.content}
        </button>
      ) : null}
      <button
        type="button"
        className="Polaris-Frame-Toast__CloseButton"
        aria-label="Dismiss notification"
        onClick={onDismiss}
      >
        <span aria-hidden>&#215;</span>
      </button>
    </div>
  );
}
