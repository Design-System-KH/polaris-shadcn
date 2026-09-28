import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkeletonBodyText } from './skeleton-body-text.js';

const meta = {
  title: 'components/SkeletonBodyText',
  component: SkeletonBodyText,
  parameters: {
    docs: {
      description: {
        component: 'Placeholder lines while body text loads. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { lines: 3 },
} satisfies Meta<typeof SkeletonBodyText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
