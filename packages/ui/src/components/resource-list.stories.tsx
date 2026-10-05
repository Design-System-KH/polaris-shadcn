import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResourceList } from './resource-list';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'components/ResourceList',
  component: ResourceList,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Rich object list, as distinct from a column table.',
      },
    },
  },
} satisfies Meta<typeof ResourceList>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="ResourceList" />,
};
export const Empty: Story = {
  render: () => <ComponentExample name="ResourceList" state="empty" />,
};
export const Loading: Story = {
  render: () => <ComponentExample name="ResourceList" state="loading" />,
};
export const FilteredEmpty: Story = {
  render: () => <ComponentExample name="ResourceList" state="filtered" />,
};
