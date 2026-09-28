import type { Meta, StoryObj } from '@storybook/react-vite';
import { MediaCard } from './media-card.js';
import { VideoThumbnail } from './video-thumbnail.js';

const meta = {
  title: 'components/MediaCard',
  component: MediaCard,
  parameters: {
    docs: {
      description: {
        component:
          'A card pairing media with text. Use portrait when the media is tall: a tall image beside short text leaves a dead area that reads as a layout mistake.',
      },
    },
  },
  args: {
    title: 'Getting started with online sales',
    description: 'Learn how to set up your store and take your first order.',
    primaryAction: { content: 'Watch video' },
    media: <VideoThumbnail thumbnailUrl="https://placehold.co/600x340" videoLength={80} />,
  },
} satisfies Meta<typeof MediaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Portrait: Story = { args: { portrait: true } };
export const Small: Story = { args: { size: 'small' } };
export const WithSecondaryAction: Story = { args: { secondaryAction: { content: 'Dismiss' } } };
