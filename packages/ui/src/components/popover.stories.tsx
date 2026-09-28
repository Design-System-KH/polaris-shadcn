import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from './popover.js';

const meta = {
  title: 'overlays/Popover',
  component: Popover,
  parameters: {
    docs: {
      description: {
        component: 'Anchored overlay for actions or secondary content. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { open: true, title: 'Popover', children: 'Overlay content.' },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
