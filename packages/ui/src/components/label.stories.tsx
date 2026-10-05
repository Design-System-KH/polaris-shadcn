import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './label';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/Label',
  component: Label,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'A field label, associated by id.' } },
  },
} satisfies Meta<typeof Label>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Label" />,
};
