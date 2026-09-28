import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorPicker } from './color-picker.js';

const meta = {
  title: 'forms/ColorPicker',
  component: ColorPicker,
  parameters: {
    docs: {
      description: {
        component: 'Saturation, hue and alpha picker. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { label: 'ColorPicker', helpText: 'Persistent guidance for this field.' },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithError: Story = { args: { error: 'Enter a value to continue.' } };
export const Disabled: Story = { args: { disabled: true } };
