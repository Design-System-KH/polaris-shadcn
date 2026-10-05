import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorPicker } from './color-picker';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/ColorPicker',
  component: ColorPicker,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Saturation, hue and alpha picker.' } },
  },
} satisfies Meta<typeof ColorPicker>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="ColorPicker" />,
};
export const WithAlpha: Story = {
  render: () => <ColorPicker label="Brand color" allowAlpha />,
};
export const Disabled: Story = {
  render: () => <ComponentExample name="ColorPicker" state="disabled" />,
};
export const WithError: Story = {
  render: () => <ComponentExample name="ColorPicker" state="error" />,
};
