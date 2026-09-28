import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectAllActions } from './select-all-actions.js';

const meta = {
  title: 'components/SelectAllActions',
  component: SelectAllActions,
  parameters: {
    docs: {
      description: {
        component:
          'The select-all affordance above a list. It exists because a header checkbox selects the visible page, not the whole result set, and users assume otherwise — stating the numbers prevents a bulk action hitting the wrong count.',
      },
    },
  },
  args: {
    label: '50 orders selected',
    selectAllAction: { content: 'Select all 1,284 orders' },
  },
} satisfies Meta<typeof SelectAllActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllSelected: Story = {
  args: { label: undefined, paginatedSelectAllText: 'All 1,284 orders are selected', selectAllAction: undefined },
};
export const Sticky: Story = { args: { isSticky: true } };
