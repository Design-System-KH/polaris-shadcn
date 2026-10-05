import { useEffect, useState } from 'react';
import { cn } from '../lib/cn';
import '../styles/polaris/progress-bar.css';

export interface ProgressBarProps {
  /** 0–100. Clamped, because a bar past its track reads as a rendering bug. */
  progress?: number;
  size?: 'small' | 'medium' | 'large';
  tone?: 'highlight' | 'primary' | 'success' | 'critical';
  animated?: boolean;
  ariaLabelledBy?: string;
}

const cap = (v: string) => v.charAt(0).toUpperCase() + v.slice(1);

/**
 * ProgressBar — determinate progress.
 *
 * A real `progress` element, so the value is exposed to assistive technology
 * without ARIA. A styled div would need role, valuenow, valuemin and valuemax
 * to say the same thing, and usually ends up saying none of it.
 */
export function ProgressBar({
  progress = 0,
  size = 'medium',
  tone = 'highlight',
  animated = true,
  ariaLabelledBy,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));
  const [appeared, setAppeared] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAppeared(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={cn(
        'Polaris-ProgressBar',
        `Polaris-ProgressBar--size${cap(size)}`,
        `Polaris-ProgressBar--tone${cap(tone)}`,
      )}
    >
      <progress
        className="Polaris-ProgressBar__Progress"
        value={clamped}
        max={100}
        aria-labelledby={ariaLabelledBy}
      />
      <div
        className={cn(
          'Polaris-ProgressBar__Indicator',
          animated && appeared && 'Polaris-ProgressBar__IndicatorAppearActive',
          !animated && 'Polaris-ProgressBar__IndicatorAppearDone',
        )}
        style={{ width: `${clamped}%` }}
      >
        <span className="Polaris-ProgressBar__Label">{clamped}%</span>
      </div>
    </div>
  );
}
