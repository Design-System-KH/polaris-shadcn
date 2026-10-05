import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable } from './data-table';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'components/DataTable',
  component: DataTable,
  parameters: {
    controls: { disable: true },
    docs: {
      description: { component: 'Tabular data with sorting and totals.' },
    },
  },
} satisfies Meta<typeof DataTable>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="DataTable" />,
};
export const Empty: Story = {
  render: () => <ComponentExample name="DataTable" state="empty" />,
};
export const Loading: Story = {
  render: () => <ComponentExample name="DataTable" state="loading" />,
};
export const FilteredEmpty: Story = {
  render: () => <ComponentExample name="DataTable" state="filtered" />,
};
