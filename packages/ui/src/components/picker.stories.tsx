import type { Meta, StoryObj } from '@storybook/react-vite';
import { Picker } from './picker.js';

const meta = {
  title: 'forms/Picker',
  component: Picker,
  parameters: {
    docs: {
      description: {
        component: 'Searchable picker for a large option set. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { label: 'Picker', helpText: 'Persistent guidance for this field.' },
} satisfies Meta<typeof Picker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithError: Story = { args: { error: 'Enter a value to continue.' } };
export const Disabled: Story = { args: { disabled: true } };
