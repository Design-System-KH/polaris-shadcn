import type { Meta, StoryObj } from '@storybook/react-vite';
import { RangeSlider } from './range-slider.js';

const meta = {
  title: 'forms/RangeSlider',
  component: RangeSlider,
  parameters: {
    docs: {
      description: {
        component: 'Numeric input across a range. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { label: 'RangeSlider', helpText: 'Persistent guidance for this field.' },
} satisfies Meta<typeof RangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithError: Story = { args: { error: 'Enter a value to continue.' } };
export const Disabled: Story = { args: { disabled: true } };
