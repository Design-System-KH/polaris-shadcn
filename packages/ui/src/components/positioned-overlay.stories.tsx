import type { Meta, StoryObj } from '@storybook/react-vite';
import { PositionedOverlay } from './positioned-overlay';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'util/PositionedOverlay',
  component: PositionedOverlay,
  parameters: {
    controls: { disable: true },
    docs: {
      description: { component: 'Positions an overlay against an activator.' },
    },
  },
} satisfies Meta<typeof PositionedOverlay>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="PositionedOverlay" />,
};
