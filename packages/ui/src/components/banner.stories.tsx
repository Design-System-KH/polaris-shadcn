import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banner } from './banner.js';

const meta = {
  title: 'components/Banner',
  component: Banner,
  parameters: {
    docs: {
      description: {
        component: 'Page-level message with a tone and optional actions. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'Banner', children: 'Something happened worth reporting.' },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Critical: Story = { args: { tone: 'critical' } };
export const Success: Story = { args: { tone: 'success' } };
export const Warning: Story = { args: { tone: 'warning' } };
