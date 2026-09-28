import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './tag.js';

const meta = {
  title: 'components/Tag',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component: 'A removable label, usually a filter or category. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'Tag', children: 'Something happened worth reporting.' },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Critical: Story = { args: { tone: 'critical' } };
export const Success: Story = { args: { tone: 'success' } };
export const Warning: Story = { args: { tone: 'warning' } };
