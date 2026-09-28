import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkeletonDisplayText } from './skeleton-display-text.js';

const meta = {
  title: 'components/SkeletonDisplayText',
  component: SkeletonDisplayText,
  parameters: {
    docs: {
      description: {
        component: 'Placeholder for a heading. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { lines: 3 },
} satisfies Meta<typeof SkeletonDisplayText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
