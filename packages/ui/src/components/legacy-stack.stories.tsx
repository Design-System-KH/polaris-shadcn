import type { Meta, StoryObj } from '@storybook/react-vite';
import { LegacyStack } from './legacy-stack.js';

const meta = {
  title: 'primitives/LegacyStack',
  component: LegacyStack,
  parameters: {
    docs: {
      description: {
        component: 'Previous-generation flex stack. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof LegacyStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
