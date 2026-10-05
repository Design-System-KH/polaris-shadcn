import type { Meta, StoryObj } from '@storybook/react-vite';
import { OptionList } from './option-list';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/OptionList',
  component: OptionList,
  parameters: {
    controls: { disable: true },
    docs: {
      description: { component: 'Selectable option list with sections.' },
    },
  },
} satisfies Meta<typeof OptionList>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="OptionList" />,
};
export const Empty: Story = {
  render: () => <ComponentExample name="OptionList" state="empty" />,
};
export const Loading: Story = {
  render: () => <ComponentExample name="OptionList" state="loading" />,
};
export const FilteredEmpty: Story = {
  render: () => <ComponentExample name="OptionList" state="filtered" />,
};
