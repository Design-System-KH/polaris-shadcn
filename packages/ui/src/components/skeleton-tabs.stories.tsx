import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkeletonTabs } from './skeleton-tabs.js';

const meta = {
  title: 'components/SkeletonTabs',
  component: SkeletonTabs,
  parameters: {
    docs: {
      description: {
        component: 'Placeholder for a tab bar. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { lines: 3 },
} satisfies Meta<typeof SkeletonTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
