import type { Meta, StoryObj } from '@storybook/react-vite';
import { Backdrop } from './backdrop';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'overlays/Backdrop',
  component: Backdrop,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Scrim behind an overlay.' } },
  },
} satisfies Meta<typeof Backdrop>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Backdrop" />,
};
