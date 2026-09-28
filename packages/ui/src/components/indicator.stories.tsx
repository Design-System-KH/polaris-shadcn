import type { Meta, StoryObj } from '@storybook/react-vite';
import { Indicator } from './indicator.js';

const meta = {
  title: 'components/Indicator',
  component: Indicator,
  parameters: {
    docs: {
      description: {
        component: 'Small unread or attention dot. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'Indicator', children: 'Something happened worth reporting.' },
} satisfies Meta<typeof Indicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Critical: Story = { args: { tone: 'critical' } };
export const Success: Story = { args: { tone: 'success' } };
export const Warning: Story = { args: { tone: 'warning' } };
