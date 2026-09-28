import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sticky } from './sticky.js';

const meta = {
  title: 'util/Sticky',
  component: Sticky,
  parameters: {
    docs: {
      description: {
        component: 'Sticks its children while the container scrolls. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Wrapped content.' },
} satisfies Meta<typeof Sticky>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
