import type { Meta, StoryObj } from '@storybook/react-vite';
import { Labelled } from './labelled.js';

const meta = {
  title: 'forms/Labelled',
  component: Labelled,
  parameters: {
    docs: {
      description: {
        component: 'Label, help text and error wrapper for a control. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof Labelled>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
