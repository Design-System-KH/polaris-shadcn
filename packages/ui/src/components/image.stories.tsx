import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image } from './image.js';

const meta = {
  title: 'components/Image',
  component: Image,
  parameters: {
    docs: {
      description: {
        component:
          'A plain img with a srcset helper. Exists so sourceSet can be written as data, and so alt is required by the type rather than forgotten.',
      },
    },
  },
  args: { source: 'https://placehold.co/400x200', alt: 'A placeholder' },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithSourceSet: Story = {
  args: {
    sourceSet: [
      { source: 'https://placehold.co/400x200', descriptor: '400w' },
      { source: 'https://placehold.co/800x400', descriptor: '800w' },
    ],
  },
};
/** An empty alt marks it decorative, so it is skipped rather than unlabelled. */
export const Decorative: Story = { args: { alt: '' } };
