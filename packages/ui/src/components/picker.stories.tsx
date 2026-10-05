import type { Meta, StoryObj } from '@storybook/react-vite';
import { Picker } from './picker';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/Picker',
  component: Picker,
  parameters: {
    controls: { disable: true },
    docs: {
      description: { component: 'Searchable picker for a large option set.' },
    },
  },
} satisfies Meta<typeof Picker>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Picker" />,
};
export const Disabled: Story = {
  render: () => <ComponentExample name="Picker" state="disabled" />,
};
export const WithError: Story = {
  render: () => <ComponentExample name="Picker" state="error" />,
};
