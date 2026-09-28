import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable } from './data-table.js';

const meta = {
  title: 'components/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component: 'Tabular data with sorting and totals. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { items: [{ id: '1', content: 'First item' }, { id: '2', content: 'Second item' }] },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true, items: [] } };
export const EmptyFirstRun: Story = { args: { items: [] } };
export const EmptyFiltered: Story = { args: { items: [], isFiltered: true } };
