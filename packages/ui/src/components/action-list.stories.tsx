import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActionList } from './action-list.js';

const meta = {
  title: 'components/ActionList',
  component: ActionList,
  parameters: {
    docs: {
      description: {
        component: 'List of actions, usually inside a Popover. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { items: [{ id: '1', content: 'First item' }, { id: '2', content: 'Second item' }] },
} satisfies Meta<typeof ActionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true, items: [] } };
export const EmptyFirstRun: Story = { args: { items: [] } };
export const EmptyFiltered: Story = { args: { items: [], isFiltered: true } };
