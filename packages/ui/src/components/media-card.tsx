import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import { Card } from './card.js';
import { Text } from './text.js';
import { Button } from './button.js';
import { BlockStack } from './block-stack.js';
import '../styles/polaris/media-card.css';

export interface MediaCardAction {
  content: string;
  onAction?: () => void;
}

export interface MediaCardProps {
  title: ReactNode;
  children?: ReactNode;
  /** A VideoThumbnail, an Image, or any media element. */
  media?: ReactNode;
  /** Stacks the media above the text instead of beside it. */
  portrait?: boolean;
  size?: 'small' | 'medium';
  description?: string;
  primaryAction?: MediaCardAction;
  secondaryAction?: MediaCardAction;
}

/**
 * MediaCard — a card pairing media with text and actions.
 *
 * Use `portrait` when the media is tall: a tall image beside short text leaves
 * a large dead area on the right, which reads as a layout mistake.
 */
export function MediaCard({
  title,
  children,
  media,
  portrait = false,
  size = 'medium',
  description,
  primaryAction,
  secondaryAction,
}: MediaCardProps) {
  return (
    <Card padding="0">
      <div
        className={cn(
          'Polaris-MediaCard',
          portrait && 'Polaris-MediaCard--portrait',
          size === 'small' && 'Polaris-MediaCard--sizeSmall',
        )}
      >
        <div className="Polaris-MediaCard__MediaContainer">{media}</div>
        <div className="Polaris-MediaCard__InfoContainer">
          <BlockStack gap="200">
            <Text variant="headingSm" as="h2">
              {title}
            </Text>
            {description ? (
              <Text as="p" variant="bodySm" tone="subdued">
                {description}
              </Text>
            ) : null}
            {children}
            {primaryAction || secondaryAction ? (
              <div className="Polaris-MediaCard__ActionContainer">
                {primaryAction ? (
                  <Button onClick={primaryAction.onAction}>{primaryAction.content}</Button>
                ) : null}
                {secondaryAction ? (
                  <Button variant="plain" onClick={secondaryAction.onAction}>
                    {secondaryAction.content}
                  </Button>
                ) : null}
              </div>
            ) : null}
          </BlockStack>
        </div>
      </div>
    </Card>
  );
}
