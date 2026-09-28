import type { Meta, StoryObj } from '@storybook/react-vite';
import { IndexFilters } from './index-filters.js';

const meta = {
  title: 'forms/IndexFilters',
  component: IndexFilters,
  parameters: {
    docs: {
      description: {
        component: 'Filtering, sorting and saved views for an index. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof IndexFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
