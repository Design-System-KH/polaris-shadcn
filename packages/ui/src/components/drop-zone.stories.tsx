import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropZone } from './drop-zone';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/DropZone',
  component: DropZone,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'File upload by drop or browse.' } },
  },
} satisfies Meta<typeof DropZone>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="DropZone" />,
};
export const Disabled: Story = {
  render: () => <ComponentExample name="DropZone" state="disabled" />,
};
export const WithError: Story = {
  render: () => <ComponentExample name="DropZone" state="error" />,
};
