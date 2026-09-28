import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlineGrid } from './inline-grid.js';

const meta = {
  title: 'primitives/InlineGrid',
  component: InlineGrid,
  parameters: {
    docs: {
      description: {
        component: 'Equal-width column grid. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof InlineGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
