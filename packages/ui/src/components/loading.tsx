import { useEffect, useState } from 'react';
// Loading lives under Frame in Polaris's stylesheet.
import '../styles/polaris/frame.css';

export interface LoadingProps {
  /** Announced to assistive technology while the page works. */
  accessibilityLabel?: string;
}

/**
 * Loading — the page-level progress bar.
 *
 * Indeterminate on purpose: it says work is happening without implying a
 * completion estimate the app cannot actually make. A fake percentage that
 * stalls at 90% is worse than no percentage.
 */
export function Loading({ accessibilityLabel = 'Page loading' }: LoadingProps) {
  const [progress, setProgress] = useState(0);

  // Eases toward, but never reaches, the end — arrival is the page's job.
  useEffect(() => {
    const id = setInterval(() => setProgress((p) => p + (90 - p) * 0.12), 200);
    return () => clearInterval(id);
  }, []);

  return (
    <div role="progressbar" aria-label={accessibilityLabel} aria-valuemin={0} aria-valuemax={100}>
      <div className="Polaris-Frame-Loading">
        <div className="Polaris-Frame-Loading__Level" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
