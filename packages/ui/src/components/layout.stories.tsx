import type { Meta, StoryObj } from '@storybook/react-vite';
import { Layout } from './layout';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'layout/Layout',
  component: Layout,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Page body regions: primary and secondary sections.',
      },
    },
  },
} satisfies Meta<typeof Layout>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Layout" />,
};
