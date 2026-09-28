import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlineStack } from './inline-stack.js';

const meta = {
  title: 'primitives/InlineStack',
  component: InlineStack,
  parameters: {
    docs: {
      description: {
        component: 'Horizontal stack that wraps by default. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof InlineStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
