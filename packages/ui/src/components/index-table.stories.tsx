import type { Meta, StoryObj } from '@storybook/react-vite';
import { IndexTable } from './index-table';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'components/IndexTable',
  component: IndexTable,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Resource index with selection and bulk actions.',
      },
    },
  },
} satisfies Meta<typeof IndexTable>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="IndexTable" />,
};
export const Empty: Story = {
  render: () => <ComponentExample name="IndexTable" state="empty" />,
};
export const Loading: Story = {
  render: () => <ComponentExample name="IndexTable" state="loading" />,
};
export const FilteredEmpty: Story = {
  render: () => <ComponentExample name="IndexTable" state="filtered" />,
};
