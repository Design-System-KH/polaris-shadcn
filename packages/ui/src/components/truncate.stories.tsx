import type { Meta, StoryObj } from '@storybook/react-vite';
import { Truncate } from './truncate';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'primitives/Truncate',
  component: Truncate,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Single-line truncation with a title fallback.',
      },
    },
  },
} satisfies Meta<typeof Truncate>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Truncate" />,
};
