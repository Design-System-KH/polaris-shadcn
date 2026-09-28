import type { Meta, StoryObj } from '@storybook/react-vite';
import { IndexTable } from './index-table.js';

const meta = {
  title: 'components/IndexTable',
  component: IndexTable,
  parameters: {
    docs: {
      description: {
        component: 'Resource index with selection and bulk actions. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { items: [{ id: '1', content: 'First item' }, { id: '2', content: 'Second item' }] },
} satisfies Meta<typeof IndexTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true, items: [] } };
export const EmptyFirstRun: Story = { args: { items: [] } };
export const EmptyFiltered: Story = { args: { items: [], isFiltered: true } };
