import type { Meta, StoryObj } from '@storybook/react-vite';
import { LegacyFilters } from './legacy-filters.js';

const meta = {
  title: 'forms/LegacyFilters',
  component: LegacyFilters,
  parameters: {
    docs: {
      description: {
        component: 'Previous-generation filter bar. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof LegacyFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
