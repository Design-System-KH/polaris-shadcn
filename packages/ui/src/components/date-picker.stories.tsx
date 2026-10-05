import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker } from './date-picker';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/DatePicker',
  component: DatePicker,
  parameters: {
    controls: { disable: true },
    docs: {
      description: { component: 'Calendar for a date or a date range.' },
    },
  },
} satisfies Meta<typeof DatePicker>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="DatePicker" />,
};
