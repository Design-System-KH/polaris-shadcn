import '../styles/polaris/skeleton-body-text.css';

export interface SkeletonBodyTextProps {
  lines?: number;
}

/**
 * SkeletonBodyText — placeholder lines while body text loads.
 *
 * aria-hidden: a placeholder has nothing to announce, and announcing it
 * interrupts a screen-reader user with noise while they wait.
 */
export function SkeletonBodyText({ lines = 3 }: SkeletonBodyTextProps) {
  return (
    <div className="Polaris-SkeletonBodyText__SkeletonBodyTextContainer" aria-hidden>
      {Array.from({ length: lines }, (_, i) => (
        <div className="Polaris-SkeletonBodyText" key={i} />
      ))}
    </div>
  );
}
