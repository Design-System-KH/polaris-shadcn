import type { Meta, StoryObj } from '@storybook/react-vite';
import { Labelled } from './labelled';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/Labelled',
  component: Labelled,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Label, help text and error wrapper for a control.',
      },
    },
  },
} satisfies Meta<typeof Labelled>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Labelled" />,
};
