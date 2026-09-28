import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkeletonThumbnail } from './skeleton-thumbnail.js';

const meta = {
  title: 'components/SkeletonThumbnail',
  component: SkeletonThumbnail,
  parameters: {
    docs: {
      description: {
        component: 'Placeholder for a thumbnail. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { lines: 3 },
} satisfies Meta<typeof SkeletonThumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
