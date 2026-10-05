import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormLayout } from './form-layout';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/FormLayout',
  component: FormLayout,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Consistent spacing and grouping for form fields.',
      },
    },
  },
} satisfies Meta<typeof FormLayout>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="FormLayout" />,
};
