import { cn } from '../lib/cn';
import { SkeletonDisplayText } from './skeleton-display-text';
import '../styles/polaris/skeleton-tabs.css';

export interface SkeletonTabsProps {
  count?: number;
  fitted?: boolean;
}

/** SkeletonTabs — placeholder for a tab bar, matching the real bar's height. */
export function SkeletonTabs({ count = 2, fitted = false }: SkeletonTabsProps) {
  return (
    <div className={cn('Polaris-SkeletonTabs__Tabs', fitted && 'Polaris-SkeletonTabs--fitted')} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <div className="Polaris-SkeletonTabs__Tab" key={i}>
          <span className="Polaris-SkeletonTabs__TabText">
            <SkeletonDisplayText size="small" />
          </span>
        </div>
      ))}
    </div>
  );
}
