import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExceptionList } from './exception-list';

const meta = {
  title: 'components/ExceptionList',
  component: ExceptionList,
  parameters: {
    docs: {
      description: {
        component:
          'Short warnings attached to a resource. A ul, so the count is announced before the contents are read.',
      },
    },
  },
  args: {
    items: [
      { description: 'This customer is high risk' },
      { status: 'warning', description: 'Address has not been verified' },
    ],
  },
} satisfies Meta<typeof ExceptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Critical: Story = {
  args: {
    items: [
      {
        status: 'critical',
        title: 'Payment failed',
        description: 'Retry before 3 March',
      },
    ],
  },
};
export const WithTitles: Story = {
  args: {
    items: [{ title: 'Note', description: 'Customer requested gift wrapping' }],
  },
};
