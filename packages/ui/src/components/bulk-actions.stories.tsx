import type { Meta, StoryObj } from '@storybook/react-vite';
import { BulkActions } from './bulk-actions.js';

const meta = {
  title: 'components/BulkActions',
  component: BulkActions,
  parameters: {
    docs: {
      description: {
        component: 'Actions applying to the current selection. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof BulkActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
