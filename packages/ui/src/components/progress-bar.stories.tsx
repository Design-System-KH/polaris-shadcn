import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './progress-bar.js';

const meta = {
  title: 'components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component: 'Determinate progress. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'ProgressBar', children: 'Something happened worth reporting.' },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Critical: Story = { args: { tone: 'critical' } };
export const Success: Story = { args: { tone: 'success' } };
export const Warning: Story = { args: { tone: 'warning' } };
