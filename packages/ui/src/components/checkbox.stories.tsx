import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './checkbox';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/Checkbox',
  component: Checkbox,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Binary choice, independent of its neighbours.',
      },
    },
  },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Checkbox" />,
};
export const Disabled: Story = {
  render: () => <ComponentExample name="Checkbox" state="disabled" />,
};
export const WithError: Story = {
  render: () => <ComponentExample name="Checkbox" state="error" />,
};
