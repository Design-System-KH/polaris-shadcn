import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './empty-state.js';

const meta = {
  title: 'patterns/EmptyState',
  component: EmptyState,
  parameters: {
    docs: {
      description: {
        component: 'First-run empty state with one clear action. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'EmptyState', children: 'Content' },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
