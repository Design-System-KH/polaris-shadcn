import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChoiceList } from './choice-list';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/ChoiceList',
  component: ChoiceList,
  parameters: {
    controls: { disable: true },
    docs: {
      description: { component: 'A titled group of radios or checkboxes.' },
    },
  },
} satisfies Meta<typeof ChoiceList>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="ChoiceList" />,
};
export const Disabled: Story = {
  render: () => <ComponentExample name="ChoiceList" state="disabled" />,
};
export const WithError: Story = {
  render: () => <ComponentExample name="ChoiceList" state="error" />,
};
