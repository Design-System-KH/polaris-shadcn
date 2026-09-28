import type { ReactNode } from 'react';
import { LegacyCard } from './legacy-card.js';
import { Button } from './button.js';
import '../styles/polaris/setting-action.css';

export interface SettingToggleAction {
  content: string;
  onAction?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export interface SettingToggleProps {
  children?: ReactNode;
  action?: SettingToggleAction;
  enabled?: boolean;
}

/**
 * SettingToggle — a setting with an enable or disable action.
 *
 * The action is a button, not a switch, because the change is not immediate:
 * it submits. A switch implies the state flipped the moment you touched it,
 * and using one here is how a user walks away believing something saved.
 *
 * `aria-pressed` carries the current state, so the control announces "Disable,
 * pressed" rather than leaving the state visible only in the surrounding text.
 */
export function SettingToggle({ children, action, enabled = false }: SettingToggleProps) {
  return (
    <LegacyCard sectioned>
      <div className="Polaris-SettingAction">
        <div className="Polaris-SettingAction__Setting">{children}</div>
        <div className="Polaris-SettingAction__Action">
          {action ? (
            <Button
              variant={enabled ? undefined : 'primary'}
              tone={enabled ? 'critical' : undefined}
              disabled={action.disabled}
              loading={action.loading}
              pressed={enabled}
              onClick={action.onAction}
            >
              {action.content}
            </Button>
          ) : null}
        </div>
      </div>
    </LegacyCard>
  );
}
