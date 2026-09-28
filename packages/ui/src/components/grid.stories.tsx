import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './grid.js';

const meta = {
  title: 'primitives/Grid',
  component: Grid,
  parameters: {
    docs: {
      description: {
        component: 'Responsive 12-column grid with per-breakpoint spans. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
