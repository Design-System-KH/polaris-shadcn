import type { Meta, StoryObj } from '@storybook/react-vite';
import { Indicator } from './indicator';

const meta = {
  title: 'components/Indicator',
  component: Indicator,
  parameters: {
    docs: {
      description: {
        component:
          'A small unread or attention dot. Decorative — label the thing it marks, not the dot.',
      },
    },
  },
  args: {},
} satisfies Meta<typeof Indicator>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithoutPulse: Story = { args: { pulse: false } };
