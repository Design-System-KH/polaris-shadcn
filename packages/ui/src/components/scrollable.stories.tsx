import type { Meta, StoryObj } from '@storybook/react-vite';
import { Scrollable } from './scrollable';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'util/Scrollable',
  component: Scrollable,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Scroll container with shadow affordances at the edges.',
      },
    },
  },
} satisfies Meta<typeof Scrollable>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Scrollable" />,
};
