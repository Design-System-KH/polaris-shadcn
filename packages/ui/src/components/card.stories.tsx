import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './card.js';

const meta = {
  title: 'components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'The default grouping surface. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Card content' },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
