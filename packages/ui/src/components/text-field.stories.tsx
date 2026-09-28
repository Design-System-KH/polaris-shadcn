import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './text-field.js';

const meta = {
  title: 'forms/TextField',
  component: TextField,
  parameters: {
    docs: {
      description: {
        component: 'Single-line or multiline text input. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { label: 'TextField', helpText: 'Persistent guidance for this field.' },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithError: Story = { args: { error: 'Enter a value to continue.' } };
export const Disabled: Story = { args: { disabled: true } };
