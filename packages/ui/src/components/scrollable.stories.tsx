import type { Meta, StoryObj } from '@storybook/react-vite';
import { Scrollable } from './scrollable.js';

const meta = {
  title: 'util/Scrollable',
  component: Scrollable,
  parameters: {
    docs: {
      description: {
        component: 'Scroll container with shadow affordances at the edges. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof Scrollable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
