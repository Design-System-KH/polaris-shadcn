import type { Meta, StoryObj } from '@storybook/react-vite';
import { Layout } from './layout.js';

const meta = {
  title: 'layout/Layout',
  component: Layout,
  parameters: {
    docs: {
      description: {
        component: 'Page body regions: primary and secondary sections. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'Layout', children: 'Page content.' },
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
