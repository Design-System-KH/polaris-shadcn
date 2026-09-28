import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResourceList } from './resource-list.js';

const meta = {
  title: 'components/ResourceList',
  component: ResourceList,
  parameters: {
    docs: {
      description: {
        component: 'Rich object list, as distinct from a column table. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { items: [{ id: '1', content: 'First item' }, { id: '2', content: 'Second item' }] },
} satisfies Meta<typeof ResourceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true, items: [] } };
export const EmptyFirstRun: Story = { args: { items: [] } };
export const EmptyFiltered: Story = { args: { items: [], isFiltered: true } };
