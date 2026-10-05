import type { Meta, StoryObj } from '@storybook/react-vite';
import { Focus } from './focus';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'util/Focus',
  component: Focus,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Moves focus to its child when it becomes active.',
      },
    },
  },
} satisfies Meta<typeof Focus>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Focus" />,
};
