import type { ReactNode } from 'react';
import { Card } from './card';
import { InlineStack } from './inline-stack';
import { BlockStack } from './block-stack';
import { Box } from './box';
import { Text } from './text';
import { Button } from './button';
import { Avatar } from './avatar';
import '../styles/polaris/setting-action.css';

export interface AccountConnectionAction {
  content: string;
  onAction?: () => void;
  url?: string;
  disabled?: boolean;
  loading?: boolean;
}

export interface AccountConnectionProps {
  /** Drives both the avatar and the action's emphasis. */
  connected?: boolean;
  action?: AccountConnectionAction;
  avatarUrl?: string;
  accountName?: string;
  /** Defaults to `accountName` when omitted, as in Polaris. */
  title?: ReactNode;
  details?: ReactNode;
  /** Rendered below the card body, separated by a block-start pad. */
  termsOfService?: ReactNode;
}

/**
 * AccountConnection — connect or disconnect a third-party account.
 *
 * Pure composition: Polaris ships no CSS of its own for this component, only
 * for the SettingAction row it uses, whose negative margins produce the
 * wrap-and-align behaviour when the action drops below the text on narrow
 * viewports. That stylesheet is imported here rather than reimplemented.
 *
 * The action is primary when disconnected and secondary when connected — the
 * emphasis follows what you want the reader to do next, which is connect.
 */
export function AccountConnection({
  connected = false,
  action,
  avatarUrl,
  accountName = '',
  title,
  details,
  termsOfService,
}: AccountConnectionProps) {
  const initials = accountName
    ? accountName
        .split(/\s+/)
        .map((name) => name[0])
        .join('')
    : undefined;

  const actionElement = action ? (
    action.url ? (
      <Button
        asChild
        variant={connected ? undefined : 'primary'}
        disabled={action.disabled}
        loading={action.loading}
      >
        <a href={action.url}>{action.content}</a>
      </Button>
    ) : (
      <Button
        variant={connected ? undefined : 'primary'}
        disabled={action.disabled}
        loading={action.loading}
        onClick={action.onAction}
      >
        {action.content}
      </Button>
    )
  ) : null;

  return (
    <Card>
      <div className="Polaris-SettingAction">
        <div className="Polaris-SettingAction__Setting">
          <InlineStack gap="400">
            {connected ? (
              <span>
                {/* Empty label: the account name is already beside it, so
                    announcing the avatar would just repeat it. */}
                <Avatar accessibilityLabel="" name={accountName} initials={initials} source={avatarUrl} />
              </span>
            ) : null}
            <BlockStack gap="100">
              <Text as="h2" variant="headingSm">
                {title ?? accountName}
              </Text>
              {details ? (
                <Text as="span" variant="bodyMd" tone="subdued">
                  {details}
                </Text>
              ) : null}
            </BlockStack>
          </InlineStack>
        </div>
        <div className="Polaris-SettingAction__Action">{actionElement}</div>
      </div>
      {termsOfService ? (
        <Box paddingBlockStart="400">
          <Text as="span" variant="bodyMd">
            {termsOfService}
          </Text>
        </Box>
      ) : null}
    </Card>
  );
}
