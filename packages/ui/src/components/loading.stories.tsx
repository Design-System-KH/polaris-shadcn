import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loading } from './loading.js';

const meta = {
  title: 'components/Loading',
  component: Loading,
  parameters: {
    docs: {
      description: {
        component: 'Page-level loading indicator. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'Loading', children: 'Something happened worth reporting.' },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Critical: Story = { args: { tone: 'critical' } };
export const Success: Story = { args: { tone: 'success' } };
export const Warning: Story = { args: { tone: 'warning' } };
