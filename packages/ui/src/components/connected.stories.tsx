import type { Meta, StoryObj } from '@storybook/react-vite';
import { Connected } from './connected.js';

const meta = {
  title: 'forms/Connected',
  component: Connected,
  parameters: {
    docs: {
      description: {
        component: 'Joins a control to leading or trailing elements. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof Connected>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
