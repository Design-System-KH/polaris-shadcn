import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './text.js';

const meta = {
  title: 'primitives/Text',
  component: Text,
  parameters: {
    docs: {
      description: {
        component: 'All text output. Element and size are separate decisions. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Text' },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
