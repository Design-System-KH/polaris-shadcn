import type { Meta, StoryObj } from '@storybook/react-vite';
import { PositionedOverlay } from './positioned-overlay.js';

const meta = {
  title: 'util/PositionedOverlay',
  component: PositionedOverlay,
  parameters: {
    docs: {
      description: {
        component: 'Positions an overlay against an activator. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Wrapped content.' },
} satisfies Meta<typeof PositionedOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
