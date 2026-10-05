import type { Meta, StoryObj } from '@storybook/react-vite';
import { PortalsManager } from './portals-manager';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'util/PortalsManager',
  component: PortalsManager,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Coordinates portal containers.' } },
  },
} satisfies Meta<typeof PortalsManager>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="PortalsManager" />,
};
