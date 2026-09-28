import { cn } from '../lib/cn.js';
import '../styles/polaris/indicator.css';

export interface IndicatorProps {
  /** Animates attention. Off by default; a page of pulsing dots signals nothing. */
  pulse?: boolean;
}

/** Indicator — a small unread or attention dot. Decorative; label the thing it marks. */
export function Indicator({ pulse = true }: IndicatorProps) {
  return <span aria-hidden className={cn('Polaris-Indicator', pulse && 'Polaris-Indicator--pulseIndicator')} />;
}
