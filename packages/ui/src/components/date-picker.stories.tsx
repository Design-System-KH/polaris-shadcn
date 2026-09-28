import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker } from './date-picker.js';

const meta = {
  title: 'forms/DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: 'Calendar for a date or a date range. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { label: 'DatePicker', helpText: 'Persistent guidance for this field.' },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithError: Story = { args: { error: 'Enter a value to continue.' } };
export const Disabled: Story = { args: { disabled: true } };
