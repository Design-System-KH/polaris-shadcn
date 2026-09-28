import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './checkbox.js';

const meta = {
  title: 'forms/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: 'Binary choice, independent of its neighbours. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { label: 'Checkbox', helpText: 'Persistent guidance for this field.' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithError: Story = { args: { error: 'Enter a value to continue.' } };
export const Disabled: Story = { args: { disabled: true } };
