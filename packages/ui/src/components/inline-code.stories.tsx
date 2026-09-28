import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlineCode } from './inline-code.js';

const meta = {
  title: 'primitives/InlineCode',
  component: InlineCode,
  parameters: {
    docs: {
      description: {
        component: 'Monospace inline code. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'InlineCode' },
} satisfies Meta<typeof InlineCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
