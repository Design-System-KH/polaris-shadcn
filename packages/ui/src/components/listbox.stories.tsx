import type { Meta, StoryObj } from '@storybook/react-vite';
import { Listbox } from './listbox';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/Listbox',
  component: Listbox,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Keyboard-navigable option list.' } },
  },
} satisfies Meta<typeof Listbox>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Listbox" />,
};
export const Empty: Story = {
  render: () => <ComponentExample name="Listbox" state="empty" />,
};
export const Loading: Story = {
  render: () => <ComponentExample name="Listbox" state="loading" />,
};
export const FilteredEmpty: Story = {
  render: () => <ComponentExample name="Listbox" state="filtered" />,
};
