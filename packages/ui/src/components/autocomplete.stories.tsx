import type { Meta, StoryObj } from '@storybook/react-vite';
import { Autocomplete } from './autocomplete';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/Autocomplete',
  component: Autocomplete,
  parameters: {
    controls: { disable: true },
    docs: {
      description: { component: 'Text input with a filtered option list.' },
    },
  },
} satisfies Meta<typeof Autocomplete>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Autocomplete" />,
};
export const Disabled: Story = {
  render: () => <ComponentExample name="Autocomplete" state="disabled" />,
};
export const WithError: Story = {
  render: () => <ComponentExample name="Autocomplete" state="error" />,
};
