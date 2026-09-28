import type { Meta, StoryObj } from '@storybook/react-vite';
import { Filters } from './filters.js';

const meta = {
  title: 'forms/Filters',
  component: Filters,
  parameters: {
    docs: {
      description: {
        component: 'Filter bar with applied-filter chips. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof Filters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
