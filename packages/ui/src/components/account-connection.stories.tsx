import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccountConnection } from './account-connection.js';

const meta = {
  title: 'patterns/AccountConnection',
  component: AccountConnection,
  parameters: {
    docs: {
      description: {
        component: 'Third-party account connect and disconnect. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'AccountConnection', children: 'Content' },
} satisfies Meta<typeof AccountConnection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
