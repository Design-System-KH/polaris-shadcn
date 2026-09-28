import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './label.js';

const meta = {
  title: 'forms/Label',
  component: Label,
  parameters: {
    docs: {
      description: {
        component: 'A field label, associated by id. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Label' },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
