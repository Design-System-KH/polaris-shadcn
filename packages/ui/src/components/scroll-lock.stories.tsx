import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollLock } from './scroll-lock.js';

const meta = {
  title: 'util/ScrollLock',
  component: ScrollLock,
  parameters: {
    docs: {
      description: {
        component: 'Locks body scroll while mounted. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Wrapped content.' },
} satisfies Meta<typeof ScrollLock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
