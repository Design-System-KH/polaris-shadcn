import type { Meta, StoryObj } from '@storybook/react-vite';
import { TrapFocus } from './trap-focus.js';

const meta = {
  title: 'util/TrapFocus',
  component: TrapFocus,
  parameters: {
    docs: {
      description: {
        component: 'Keeps focus within its children while active. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Wrapped content.' },
} satisfies Meta<typeof TrapFocus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
