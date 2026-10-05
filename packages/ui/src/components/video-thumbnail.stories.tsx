import type { Meta, StoryObj } from '@storybook/react-vite';
import { VideoThumbnail } from './video-thumbnail';

const meta = {
  title: 'components/VideoThumbnail',
  component: VideoThumbnail,
  parameters: {
    docs: {
      description: {
        component:
          'A video poster with a play affordance and duration. The duration shows as 2:31 but is announced as "2 minutes 31 seconds" — a screen reader reads the colon form as a time of day.',
      },
    },
  },
  args: { thumbnailUrl: 'https://placehold.co/600x340', videoLength: 151 },
} satisfies Meta<typeof VideoThumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithProgress: Story = {
  args: { showVideoProgress: true, videoProgress: 45 },
};
export const WithoutDuration: Story = { args: { videoLength: undefined } };
