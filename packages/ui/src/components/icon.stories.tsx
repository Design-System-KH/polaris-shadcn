import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './icon.js';

const meta = {
  title: 'primitives/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: 'An icon with a tone, decorative unless labelled. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { alt: 'Example' },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithImage: Story = { args: { source: 'https://placehold.co/80', alt: 'Example product' } };
export const Large: Story = { args: { size: 'large' } };
