import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './text-field';

const meta = {
  title: 'forms/TextField',
  component: TextField,
  parameters: {
    docs: {
      description: {
        component:
          'Accessible single-line and multiline inputs with controlled values, validation, and disabled states.',
      },
    },
  },
  args: { label: 'TextField', helpText: 'Persistent guidance for this field.' },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithError: Story = {
  args: { error: 'Enter a value to continue.' },
};
export const Disabled: Story = { args: { disabled: true } };
export const Multiline: Story = {
  args: {
    label: 'Description',
    multiline: 5,
    defaultValue: 'A lightweight hoodie for everyday adventures.',
  },
};
export const WithPrefix: Story = {
  args: { label: 'Price', prefix: '$', type: 'number', defaultValue: '49.00' },
};
