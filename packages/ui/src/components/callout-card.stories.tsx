import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalloutCard } from './callout-card.js';

const meta = {
  title: 'components/CalloutCard',
  component: CalloutCard,
  parameters: {
    docs: {
      description: {
        component: 'Card promoting one action, with illustration. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'CalloutCard', children: 'Content' },
} satisfies Meta<typeof CalloutCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
