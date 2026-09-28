import type { Meta, StoryObj } from '@storybook/react-vite';
import { Backdrop } from './backdrop.js';

const meta = {
  title: 'overlays/Backdrop',
  component: Backdrop,
  parameters: {
    docs: {
      description: {
        component: 'Scrim behind an overlay. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Wrapped content.' },
} satisfies Meta<typeof Backdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
