import type { Meta, StoryObj } from '@storybook/react-vite';
import { VideoThumbnail } from './video-thumbnail.js';

const meta = {
  title: 'components/VideoThumbnail',
  component: VideoThumbnail,
  parameters: {
    docs: {
      description: {
        component: 'Video poster with a play affordance and duration. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { alt: 'Example' },
} satisfies Meta<typeof VideoThumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithImage: Story = { args: { source: 'https://placehold.co/80', alt: 'Example product' } };
export const Large: Story = { args: { size: 'large' } };
