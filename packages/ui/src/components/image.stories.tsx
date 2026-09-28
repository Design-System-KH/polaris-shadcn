import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image } from './image.js';

const meta = {
  title: 'components/Image',
  component: Image,
  parameters: {
    docs: {
      description: {
        component: 'Image with dimensions reserved to prevent layout shift. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { alt: 'Example' },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithImage: Story = { args: { source: 'https://placehold.co/80', alt: 'Example product' } };
export const Large: Story = { args: { size: 'large' } };
