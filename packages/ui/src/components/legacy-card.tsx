import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import { Text } from './text.js';
import '../styles/polaris/legacy-card.css';

export interface LegacyCardProps {
  children?: ReactNode;
  title?: ReactNode;
  subdued?: boolean;
  sectioned?: boolean;
  footerActions?: ReactNode;
  hideOnPrint?: boolean;
}

export interface LegacyCardSectionProps {
  children?: ReactNode;
  title?: ReactNode;
  subdued?: boolean;
  /** Removes padding, for a section holding a full-width table or image. */
  flush?: boolean;
  fullWidth?: boolean;
  hideOnPrint?: boolean;
}

function LegacyCardSection({
  children,
  title,
  subdued = false,
  flush = false,
  fullWidth = false,
  hideOnPrint = false,
}: LegacyCardSectionProps) {
  return (
    <div
      className={cn(
        'Polaris-LegacyCard__Section',
        flush && 'Polaris-LegacyCard__Section--flush',
        fullWidth && 'Polaris-LegacyCard__Section--fullWidth',
        subdued && 'Polaris-LegacyCard__Section--subdued',
        hideOnPrint && 'Polaris-LegacyCard__Section--hideOnPrint',
      )}
    >
      {title ? (
        <div className="Polaris-LegacyCard__SectionHeader">
          {typeof title === 'string' ? (
            <Text variant="headingSm" as="h3">
              {title}
            </Text>
          ) : (
            title
          )}
        </div>
      ) : null}
      {children}
    </div>
  );
}

function LegacyCardSubsection({ children }: { children?: ReactNode }) {
  return <div className="Polaris-LegacyCard__Subsection">{children}</div>;
}

/**
 * LegacyCard — the previous-generation card, with sections.
 *
 * Kept because a real admin has screens still built on it, and migrating them
 * all at once is a bigger change than it looks. New work should use `Card`,
 * which composes Box and ShadowBevel instead.
 */
export function LegacyCard({
  children,
  title,
  subdued = false,
  sectioned = false,
  footerActions,
  hideOnPrint = false,
}: LegacyCardProps) {
  return (
    <div
      className={cn(
        'Polaris-LegacyCard',
        subdued && 'Polaris-LegacyCard--subdued',
        hideOnPrint && 'Polaris-LegacyCard--hideOnPrint',
      )}
    >
      {title ? (
        <div className="Polaris-LegacyCard__Header">
          {typeof title === 'string' ? (
            <Text variant="headingSm" as="h2">
              {title}
            </Text>
          ) : (
            title
          )}
        </div>
      ) : null}
      {sectioned ? <LegacyCardSection>{children}</LegacyCardSection> : children}
      {footerActions ? (
        <div className="Polaris-LegacyCard__Footer">{footerActions}</div>
      ) : null}
    </div>
  );
}

LegacyCard.Section = LegacyCardSection;
LegacyCard.Subsection = LegacyCardSubsection;
