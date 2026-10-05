import type { Meta, StoryObj } from '@storybook/react-vite';
import { RangeSlider } from './range-slider';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/RangeSlider',
  component: RangeSlider,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Numeric input across a range.' } },
  },
} satisfies Meta<typeof RangeSlider>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="RangeSlider" />,
};
export const Disabled: Story = {
  render: () => <ComponentExample name="RangeSlider" state="disabled" />,
};
export const WithError: Story = {
  render: () => <ComponentExample name="RangeSlider" state="error" />,
};
