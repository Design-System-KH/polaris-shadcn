import type { ReactNode } from 'react';
import { cn } from '../lib/cn.js';
import { Box } from './box.js';
import { Text } from './text.js';
import { Button } from './button.js';
import { BlockStack } from './block-stack.js';
import { InlineStack } from './inline-stack.js';
import '../styles/polaris/banner.css';

export type BannerTone = 'success' | 'info' | 'warning' | 'critical';

export interface BannerAction {
  content: string;
  onAction?: () => void;
  url?: string;
}

export interface BannerProps {
  title?: string;
  children?: ReactNode;
  tone?: BannerTone;
  icon?: ReactNode;
  hideIcon?: boolean;
  action?: BannerAction;
  secondaryAction?: BannerAction;
  onDismiss?: () => void;
  /** Reduces padding for a banner sitting inside a Card. */
  withinContentContainer?: boolean;
}

const BACKGROUND: Record<BannerTone, string> = {
  success: 'bg-surface-success',
  info: 'bg-surface-info',
  warning: 'bg-surface-warning',
  critical: 'bg-surface-critical',
};

const GLYPH: Record<BannerTone, string> = {
  success: '✓',
  info: 'i',
  warning: '!',
  critical: '!',
};

/**
 * Banner — a page-level message with a tone and optional actions.
 *
 * Critical banners are announced assertively because they interrupt what the
 * user was doing; everything else is announced politely and waits for a pause.
 * Getting that backwards either talks over people or lets a failure go unheard.
 */
export function Banner({
  title,
  children,
  tone = 'info',
  icon,
  hideIcon = false,
  action,
  secondaryAction,
  onDismiss,
  withinContentContainer = false,
}: BannerProps) {
  return (
    <div
      role={tone === 'critical' ? 'alert' : 'status'}
      aria-live={tone === 'critical' ? 'assertive' : 'polite'}
      className={cn(
        'Polaris-Banner',
        withinContentContainer
          ? 'Polaris-Banner--withinContentContainer'
          : 'Polaris-Banner--withinPage',
      )}
    >
      <Box
        background={BACKGROUND[tone]}
        padding={withinContentContainer ? '300' : '400'}
        borderRadius={withinContentContainer ? '200' : '300'}
      >
        <InlineStack gap="200" wrap={false}>
          {hideIcon ? null : (
            <span aria-hidden className={`Polaris-Banner__text--${tone}`}>
              {icon ?? GLYPH[tone]}
            </span>
          )}
          <BlockStack gap="200">
            {title ? (
              <Text as="h2" variant="headingSm">
                {title}
              </Text>
            ) : null}
            {children ? (
              <Text as="span" variant="bodyMd">
                {children}
              </Text>
            ) : null}
            {action || secondaryAction ? (
              <InlineStack gap="200">
                {action ? <Button onClick={action.onAction}>{action.content}</Button> : null}
                {secondaryAction ? (
                  <Button variant="plain" onClick={secondaryAction.onAction}>
                    {secondaryAction.content}
                  </Button>
                ) : null}
              </InlineStack>
            ) : null}
          </BlockStack>
          {onDismiss ? (
            <span className="Polaris-Banner__DismissIcon">
              <Button variant="tertiary" onClick={onDismiss} aria-label="Dismiss notification">
                <span aria-hidden>&#215;</span>
              </Button>
            </span>
          ) : null}
        </InlineStack>
      </Box>
    </div>
  );
}
