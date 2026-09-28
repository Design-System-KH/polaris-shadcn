import type { Meta, StoryObj } from '@storybook/react-vite';
import { KeyboardKey } from './keyboard-key.js';

const meta = {
  title: 'primitives/KeyboardKey',
  component: KeyboardKey,
  parameters: {
    docs: {
      description: {
        component: 'A keyboard key, rendered as a key cap. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'KeyboardKey' },
} satisfies Meta<typeof KeyboardKey>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
