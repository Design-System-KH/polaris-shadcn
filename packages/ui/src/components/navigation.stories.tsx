import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navigation } from './navigation';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'navigation/Navigation',
  component: Navigation,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Primary application navigation.' } },
  },
} satisfies Meta<typeof Navigation>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Navigation" />,
};
