import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptySearchResult } from './empty-search-result.js';

const meta = {
  title: 'patterns/EmptySearchResult',
  component: EmptySearchResult,
  parameters: {
    docs: {
      description: {
        component:
          'The filtered-empty state: data exists, this query matched none of it. ' +
          'Say what was searched and what to try next — a bare "no results" leaves ' +
          'the reader with nowhere to go.',
      },
    },
  },
  argTypes: {
    withIllustration: { control: 'boolean' },
  },
  args: {
    title: 'No customers found',
    description: 'Try changing the filters or search term',
  },
} satisfies Meta<typeof EmptySearchResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIllustration: Story = {
  args: { withIllustration: true },
};

/** Title only. Acceptable when the filter bar above already shows the query. */
export const WithoutDescription: Story = {
  args: { description: undefined },
};

/**
 * Naming the constraint that excluded everything is what makes the state
 * recoverable — the reader knows which filter to relax.
 */
export const NamingTheFilter: Story = {
  args: {
    title: 'No orders match these filters',
    description: 'No orders are both unfulfilled and placed in the last 7 days.',
    withIllustration: true,
  },
};
