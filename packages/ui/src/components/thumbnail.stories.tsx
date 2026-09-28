import type { Meta, StoryObj } from '@storybook/react-vite';
import { Thumbnail } from './thumbnail.js';

const meta = {
  title: 'components/Thumbnail',
  component: Thumbnail,
  parameters: {
    docs: {
      description: {
        component: 'Small product or file image. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { alt: 'Example' },
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithImage: Story = { args: { source: 'https://placehold.co/80', alt: 'Example product' } };
export const Large: Story = { args: { size: 'large' } };
