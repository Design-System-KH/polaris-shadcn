import type { Meta, StoryObj } from '@storybook/react-vite';
import { LegacyCard } from './legacy-card.js';

const meta = {
  title: 'components/LegacyCard',
  component: LegacyCard,
  parameters: {
    docs: {
      description: {
        component: 'Previous-generation card with sections. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'LegacyCard', children: 'Content' },
} satisfies Meta<typeof LegacyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
