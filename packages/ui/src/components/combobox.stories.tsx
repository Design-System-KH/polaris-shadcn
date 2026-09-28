import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox } from './combobox.js';

const meta = {
  title: 'forms/Combobox',
  component: Combobox,
  parameters: {
    docs: {
      description: {
        component: 'Input plus listbox; the primitive under Autocomplete. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { label: 'Combobox', helpText: 'Persistent guidance for this field.' },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithError: Story = { args: { error: 'Enter a value to continue.' } };
export const Disabled: Story = { args: { disabled: true } };
