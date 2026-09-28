import type { Meta, StoryObj } from '@storybook/react-vite';
import { BulkActions } from './bulk-actions.js';

const meta = {
  title: 'components/BulkActions',
  component: BulkActions,
  parameters: {
    docs: {
      description: {
        component:
          'Actions applying to the current selection. The count is shown rather than implied: users routinely believe they selected every matching record when they selected only the visible page.',
      },
    },
  },
  args: {
    selectedItemsCount: 3,
    promotedActions: [{ content: 'Fulfil orders' }, { content: 'Print labels' }],
    actions: [{ content: 'Delete', destructive: true }],
    onSelectModeToggle: () => {},
  },
} satisfies Meta<typeof BulkActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllSelected: Story = { args: { selectedItemsCount: 'All' } };
export const Disabled: Story = { args: { disabled: true } };
