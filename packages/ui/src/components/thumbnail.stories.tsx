import type { Meta, StoryObj } from '@storybook/react-vite';
import { Thumbnail } from './thumbnail.js';

const meta = {
  title: 'components/Thumbnail',
  component: Thumbnail,
  parameters: {
    docs: {
      description: {
        component:
          'A small product or file image. alt is required: pass an empty string to mark it decorative rather than omitting it.',
      },
    },
  },
  argTypes: { size: { control: 'select', options: ['extraSmall', 'small', 'medium', 'large'] } },
  args: { source: 'https://placehold.co/120', alt: 'Black leather belt' },
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: 'small' } };
export const Large: Story = { args: { size: 'large' } };
export const Transparent: Story = { args: { transparent: true } };
