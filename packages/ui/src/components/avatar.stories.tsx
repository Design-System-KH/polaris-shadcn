import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './avatar.js';

const meta = {
  title: 'components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: 'Person or entity, with initials fallback. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { alt: 'Example' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithImage: Story = { args: { source: 'https://placehold.co/80', alt: 'Example product' } };
export const Large: Story = { args: { size: 'large' } };
