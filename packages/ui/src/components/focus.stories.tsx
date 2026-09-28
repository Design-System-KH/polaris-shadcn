import type { Meta, StoryObj } from '@storybook/react-vite';
import { Focus } from './focus.js';

const meta = {
  title: 'util/Focus',
  component: Focus,
  parameters: {
    docs: {
      description: {
        component: 'Moves focus to its child when it becomes active. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Wrapped content.' },
} satisfies Meta<typeof Focus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
