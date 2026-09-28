import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup } from './button-group.js';

const meta = {
  title: 'primitives/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    docs: {
      description: {
        component: 'Related buttons, optionally segmented. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
