import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sticky } from './sticky';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'util/Sticky',
  component: Sticky,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Sticks its children while the container scrolls.',
      },
    },
  },
} satisfies Meta<typeof Sticky>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Sticky" />,
};
