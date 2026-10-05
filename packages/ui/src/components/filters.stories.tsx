import type { Meta, StoryObj } from '@storybook/react-vite';
import { Filters } from './filters';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/Filters',
  component: Filters,
  parameters: {
    controls: { disable: true },
    docs: {
      description: { component: 'Filter bar with applied-filter chips.' },
    },
  },
} satisfies Meta<typeof Filters>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Filters" />,
};
