import type { Meta, StoryObj } from '@storybook/react-vite';
import { MediaCard } from './media-card.js';

const meta = {
  title: 'components/MediaCard',
  component: MediaCard,
  parameters: {
    docs: {
      description: {
        component: 'Card pairing media with text and actions. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'MediaCard', children: 'Content' },
} satisfies Meta<typeof MediaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
