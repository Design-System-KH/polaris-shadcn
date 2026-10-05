import type { Meta, StoryObj } from '@storybook/react-vite';
import { Portal } from './portal';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'util/Portal',
  component: Portal,
  parameters: {
    controls: { disable: true },
    docs: {
      description: { component: 'Renders children outside the DOM hierarchy.' },
    },
  },
} satisfies Meta<typeof Portal>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Portal" />,
};
