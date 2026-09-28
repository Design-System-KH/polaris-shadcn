import type { Meta, StoryObj } from '@storybook/react-vite';
import { BlockStack } from './block-stack.js';

const meta = {
  title: 'primitives/BlockStack',
  component: BlockStack,
  parameters: {
    docs: {
      description: {
        component: 'Vertical stack with token-scale spacing. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof BlockStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
