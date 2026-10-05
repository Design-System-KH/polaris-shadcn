import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './tabs';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'navigation/Tabs',
  component: Tabs,
  parameters: {
    controls: { disable: true },
    docs: {
      description: { component: 'Alternate views of one subject. Not steps.' },
    },
  },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Tabs" />,
};
export const Overflow: Story = {
  render: () => <ComponentExample name="Tabs" state="overflow" />,
};
