import type { Meta, StoryObj } from '@storybook/react-vite';
import { Collapsible } from './collapsible.js';

const meta = {
  title: 'overlays/Collapsible',
  component: Collapsible,
  parameters: {
    docs: {
      description: {
        component: 'Animated show and hide of a region. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
