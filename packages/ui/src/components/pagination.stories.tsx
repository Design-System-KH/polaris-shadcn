import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './pagination.js';

const meta = {
  title: 'navigation/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: 'Previous and next across a result set. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { items: [{ id: 'a', label: 'First', selected: true }, { id: 'b', label: 'Second' }] },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
