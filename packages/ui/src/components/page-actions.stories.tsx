import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageActions } from './page-actions';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'layout/PageActions',
  component: PageActions,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Primary and secondary actions at the foot of a page.',
      },
    },
  },
} satisfies Meta<typeof PageActions>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="PageActions" />,
};
