import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from './box.js';

const meta = {
  title: 'primitives/Box',
  component: Box,
  parameters: {
    docs: {
      description: {
        component: 'The layout primitive every other component is built from. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
