import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextContainer } from './text-container.js';

const meta = {
  title: 'primitives/TextContainer',
  component: TextContainer,
  parameters: {
    docs: {
      description: {
        component: 'Vertical rhythm for prose. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof TextContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
