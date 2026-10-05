import type { Meta, StoryObj } from '@storybook/react-vite';
import { IndexFilters } from './index-filters';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/IndexFilters',
  component: IndexFilters,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Filtering, sorting and saved views for an index.',
      },
    },
  },
} satisfies Meta<typeof IndexFilters>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="IndexFilters" />,
};
