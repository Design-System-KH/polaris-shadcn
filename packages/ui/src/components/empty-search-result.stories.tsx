import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptySearchResult } from './empty-search-result.js';

const meta = {
  title: 'patterns/EmptySearchResult',
  component: EmptySearchResult,
  parameters: {
    docs: {
      description: {
        component: 'Filtered-empty state. Different words from first-run. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'EmptySearchResult', children: 'Content' },
} satisfies Meta<typeof EmptySearchResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
