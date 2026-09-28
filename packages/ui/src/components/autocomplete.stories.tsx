import type { Meta, StoryObj } from '@storybook/react-vite';
import { Autocomplete } from './autocomplete.js';

const meta = {
  title: 'forms/Autocomplete',
  component: Autocomplete,
  parameters: {
    docs: {
      description: {
        component: 'Text input with a filtered option list. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { label: 'Autocomplete', helpText: 'Persistent guidance for this field.' },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithError: Story = { args: { error: 'Enter a value to continue.' } };
export const Disabled: Story = { args: { disabled: true } };
