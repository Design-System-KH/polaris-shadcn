import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './select';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/Select',
  component: Select,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Single-choice dropdown.' } },
  },
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Select" />,
};
export const Disabled: Story = {
  render: () => <ComponentExample name="Select" state="disabled" />,
};
export const WithError: Story = {
  render: () => <ComponentExample name="Select" state="error" />,
};
