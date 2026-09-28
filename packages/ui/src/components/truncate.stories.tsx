import type { Meta, StoryObj } from '@storybook/react-vite';
import { Truncate } from './truncate.js';

const meta = {
  title: 'primitives/Truncate',
  component: Truncate,
  parameters: {
    docs: {
      description: {
        component: 'Single-line truncation with a title fallback. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Truncate' },
} satisfies Meta<typeof Truncate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
