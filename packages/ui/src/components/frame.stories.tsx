import type { Meta, StoryObj } from '@storybook/react-vite';
import { Frame } from './frame.js';

const meta = {
  title: 'layout/Frame',
  component: Frame,
  parameters: {
    docs: {
      description: {
        component: 'Application shell hosting nav, top bar, toasts and loading. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'Frame', children: 'Page content.' },
} satisfies Meta<typeof Frame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
