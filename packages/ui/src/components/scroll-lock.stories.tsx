import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollLock } from './scroll-lock';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'util/ScrollLock',
  component: ScrollLock,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Locks body scroll while mounted.' } },
  },
} satisfies Meta<typeof ScrollLock>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="ScrollLock" />,
};
