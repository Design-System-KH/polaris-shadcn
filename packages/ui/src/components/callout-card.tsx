import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import { Card } from './card.js';
import { Text } from './text.js';
import { Button } from './button.js';
import '../styles/polaris/callout-card.css';

export interface CalloutCardAction {
  content: string;
  onAction?: () => void;
  url?: string;
}

export interface CalloutCardProps {
  title: string;
  children?: ReactNode;
  illustration: string;
  primaryAction: CalloutCardAction;
  secondaryAction?: CalloutCardAction;
  /** Adds a dismiss control. Only offer it if dismissal actually persists. */
  onDismiss?: () => void;
}

/**
 * CalloutCard — a card promoting one action, with an illustration.
 *
 * Exactly one primary action, because the whole component exists to point at
 * a single next step. A callout with two equal actions is just a card.
 */
export function CalloutCard({
  title,
  children,
  illustration,
  primaryAction,
  secondaryAction,
  onDismiss,
}: CalloutCardProps) {
  return (
    <Card>
      <div
        className={cn(
          'Polaris-CalloutCard__Container',
          onDismiss && 'Polaris-CalloutCard--hasDismiss',
        )}
      >
        <div className="Polaris-CalloutCard">
          <div className="Polaris-CalloutCard__Content">
            <div className="Polaris-CalloutCard__Title">
              <Text variant="headingSm" as="h2">
                {title}
              </Text>
            </div>
            <Text as="span" variant="bodyMd">
              {children}
            </Text>
            <div className="Polaris-CalloutCard__Buttons">
              <Button onClick={primaryAction.onAction}>{primaryAction.content}</Button>
              {secondaryAction ? (
                <Button variant="plain" onClick={secondaryAction.onAction}>
                  {secondaryAction.content}
                </Button>
              ) : null}
            </div>
          </div>
          <img
            // Decorative: the title carries the meaning, so announcing the
            // illustration would only repeat it.
            alt=""
            role="presentation"
            src={illustration}
            className={cn(
              'Polaris-CalloutCard__Image',
              onDismiss && 'Polaris-CalloutCard__DismissImage',
            )}
          />
        </div>
        {onDismiss ? (
          <div className="Polaris-CalloutCard__Dismiss">
            <Button variant="plain" onClick={onDismiss} aria-label="Dismiss card">
              <span aria-hidden>&#215;</span>
            </Button>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
