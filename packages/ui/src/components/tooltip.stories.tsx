import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './tooltip.js';

const meta = {
  title: 'overlays/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: 'Supplementary text on hover and focus. Never the only source. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { open: true, title: 'Tooltip', children: 'Overlay content.' },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
