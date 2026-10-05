import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './breadcrumbs';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Path to here. Earns its space at three levels or more.',
      },
    },
  },
} satisfies Meta<typeof Breadcrumbs>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Breadcrumbs" />,
};
