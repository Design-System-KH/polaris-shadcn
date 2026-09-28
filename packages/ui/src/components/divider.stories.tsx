import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './divider.js';

const meta = {
  title: 'primitives/Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: 'Decorative horizontal rule. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: {},
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
