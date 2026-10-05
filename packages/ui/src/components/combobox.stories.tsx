import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox } from './combobox';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/Combobox',
  component: Combobox,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Input plus listbox; the primitive under Autocomplete.',
      },
    },
  },
} satisfies Meta<typeof Combobox>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Combobox" />,
};
export const Disabled: Story = {
  render: () => <ComponentExample name="Combobox" state="disabled" />,
};
export const WithError: Story = {
  render: () => <ComponentExample name="Combobox" state="error" />,
};
