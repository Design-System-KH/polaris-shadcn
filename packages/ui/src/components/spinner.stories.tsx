import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './spinner.js';

const meta = {
  title: 'components/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component: 'Indeterminate progress. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'Spinner', children: 'Something happened worth reporting.' },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Critical: Story = { args: { tone: 'critical' } };
export const Success: Story = { args: { tone: 'success' } };
export const Warning: Story = { args: { tone: 'warning' } };
