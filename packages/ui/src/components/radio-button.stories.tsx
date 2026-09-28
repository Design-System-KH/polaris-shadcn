import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButton } from './radio-button.js';

const meta = {
  title: 'forms/RadioButton',
  component: RadioButton,
  parameters: {
    docs: {
      description: {
        component: 'One choice from a set. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { label: 'RadioButton', helpText: 'Persistent guidance for this field.' },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithError: Story = { args: { error: 'Enter a value to continue.' } };
export const Disabled: Story = { args: { disabled: true } };
