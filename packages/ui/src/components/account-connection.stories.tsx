import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccountConnection } from './account-connection';

const meta = {
  title: 'patterns/AccountConnection',
  component: AccountConnection,
  parameters: {
    docs: {
      description: {
        component:
          'Connect or disconnect a third-party account. The action is primary while ' +
          'disconnected and secondary once connected, so emphasis follows what you ' +
          'want the reader to do next.',
      },
    },
  },
  argTypes: {
    connected: {
      control: 'boolean',
      description:
        'Shows the avatar and drops the action to secondary emphasis.',
    },
  },
  args: {
    accountName: 'Example App',
    title: 'Example App',
    details: 'No account connected',
    action: { content: 'Connect' },
    termsOfService:
      'By clicking Connect, you agree to accept Example App’s terms and conditions. ' +
      'You will pay a commission rate of 15% on sales made through the app.',
  },
} satisfies Meta<typeof AccountConnection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Connected: Story = {
  args: {
    connected: true,
    details: 'Account connected',
    action: { content: 'Disconnect' },
  },
};

export const ConnectedWithAvatar: Story = {
  args: {
    connected: true,
    accountName: 'Dana Whitfield',
    title: 'Dana Whitfield',
    details: 'Connected on 4 March',
    avatarUrl: 'https://placehold.co/80',
    action: { content: 'Disconnect' },
  },
};

/** Initials stand in when there is no avatar URL. */
export const ConnectedWithInitials: Story = {
  args: {
    connected: true,
    accountName: 'Dana Whitfield',
    details: 'Connected on 4 March',
    action: { content: 'Disconnect' },
    termsOfService: undefined,
  },
};

export const WithoutTermsOfService: Story = {
  args: { termsOfService: undefined },
};

/** While the connection request is in flight the control keeps its size. */
export const ActionLoading: Story = {
  args: { action: { content: 'Connect', loading: true } },
};
