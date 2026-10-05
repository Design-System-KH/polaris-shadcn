import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkeletonThumbnail } from './skeleton-thumbnail';

const meta = {
  title: 'components/SkeletonThumbnail',
  component: SkeletonThumbnail,
  parameters: {
    docs: {
      description: {
        component:
          'Placeholder for a thumbnail. Size it to the real one so the row height does not change.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['extraSmall', 'small', 'medium', 'large'],
    },
  },
  args: {},
} satisfies Meta<typeof SkeletonThumbnail>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Small: Story = { args: { size: 'small' } };
export const Large: Story = { args: { size: 'large' } };
