import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkeletonTabs } from './skeleton-tabs';

const meta = {
  title: 'components/SkeletonTabs',
  component: SkeletonTabs,
  parameters: {
    docs: { description: { component: 'Placeholder for a tab bar.' } },
  },
  args: {},
} satisfies Meta<typeof SkeletonTabs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Fitted: Story = { args: { fitted: true, count: 3 } };
