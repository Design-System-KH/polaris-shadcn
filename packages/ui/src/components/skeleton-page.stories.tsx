import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkeletonPage } from './skeleton-page.js';

const meta = {
  title: 'components/SkeletonPage',
  component: SkeletonPage,
  parameters: {
    docs: {
      description: {
        component: 'Whole-page placeholder matching the loaded layout. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { lines: 3 },
} satisfies Meta<typeof SkeletonPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
