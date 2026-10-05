import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlineCode } from './inline-code';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'primitives/InlineCode',
  component: InlineCode,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Monospace inline code.' } },
  },
} satisfies Meta<typeof InlineCode>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="InlineCode" />,
};
