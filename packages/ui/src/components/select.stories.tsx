import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './select.js';

const meta = {
  title: 'forms/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: 'Single-choice dropdown. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { label: 'Select', helpText: 'Persistent guidance for this field.' },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithError: Story = { args: { error: 'Enter a value to continue.' } };
export const Disabled: Story = { args: { disabled: true } };
