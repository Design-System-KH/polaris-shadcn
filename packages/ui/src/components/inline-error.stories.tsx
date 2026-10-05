import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlineError } from './inline-error';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/InlineError',
  component: InlineError,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Field-level error, associated with its input.',
      },
    },
  },
} satisfies Meta<typeof InlineError>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="InlineError" />,
};
