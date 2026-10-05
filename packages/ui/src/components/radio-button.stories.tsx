import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButton } from './radio-button';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/RadioButton',
  component: RadioButton,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'One choice from a set.' } },
  },
} satisfies Meta<typeof RadioButton>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="RadioButton" />,
};
export const Disabled: Story = {
  render: () => <ComponentExample name="RadioButton" state="disabled" />,
};
export const WithError: Story = {
  render: () => <ComponentExample name="RadioButton" state="error" />,
};
