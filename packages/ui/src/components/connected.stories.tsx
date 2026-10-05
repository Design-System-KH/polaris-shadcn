import type { Meta, StoryObj } from '@storybook/react-vite';
import { Connected } from './connected';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/Connected',
  component: Connected,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Joins a control to leading or trailing elements.',
      },
    },
  },
} satisfies Meta<typeof Connected>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Connected" />,
};
