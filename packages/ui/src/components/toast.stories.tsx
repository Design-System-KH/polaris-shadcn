import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './toast.js';

const meta = {
  title: 'components/Toast',
  component: Toast,
  parameters: {
    docs: {
      description: {
        component: 'Brief confirmation. Never the only path to an action. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'Toast', children: 'Something happened worth reporting.' },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Critical: Story = { args: { tone: 'critical' } };
export const Success: Story = { args: { tone: 'success' } };
export const Warning: Story = { args: { tone: 'warning' } };
