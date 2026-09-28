import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bleed } from './bleed.js';

const meta = {
  title: 'primitives/Bleed',
  component: Bleed,
  parameters: {
    docs: {
      description: {
        component: 'Escapes a parent padding for full-bleed content. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof Bleed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
