import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './badge.js';

const meta = {
  title: 'components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: 'Status as a label; colour never carries meaning alone. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Fulfilled', tone: 'success' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
