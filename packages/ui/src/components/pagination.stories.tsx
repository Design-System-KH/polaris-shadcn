import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './pagination';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'navigation/Pagination',
  component: Pagination,
  parameters: {
    controls: { disable: true },
    docs: {
      description: { component: 'Previous and next across a result set.' },
    },
  },
} satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Pagination" />,
};
