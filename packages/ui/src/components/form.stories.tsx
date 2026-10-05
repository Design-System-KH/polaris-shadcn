import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from './form';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/Form',
  component: Form,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Form element with submit handling.' } },
  },
} satisfies Meta<typeof Form>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Form" />,
};
