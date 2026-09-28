import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banner } from './banner.js';

const meta = {
  title: 'components/Banner',
  component: Banner,
  parameters: {
    docs: {
      description: {
        component:
          'A page-level message. Critical banners announce assertively because they interrupt; the rest announce politely and wait for a pause.',
      },
    },
  },
  argTypes: { tone: { control: 'select', options: ['success', 'info', 'warning', 'critical'] } },
  args: { title: 'Order archived', children: 'This order was archived on 3 March.' },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Success: Story = { args: { tone: 'success', title: 'Changes saved' } };
export const Warning: Story = { args: { tone: 'warning', title: 'Payment is overdue' } };
export const Critical: Story = {
  args: { tone: 'critical', title: 'Payment failed', children: 'Update the card to retry.' },
};
export const WithActions: Story = {
  args: { action: { content: 'Retry payment' }, secondaryAction: { content: 'Learn more' } },
};
export const Dismissible: Story = { args: { onDismiss: () => {} } };
export const WithinCard: Story = { args: { withinContentContainer: true } };
export const WithoutTitle: Story = { args: { title: undefined } };
