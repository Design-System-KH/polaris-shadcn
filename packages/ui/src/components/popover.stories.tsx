import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from './popover';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'overlays/Popover',
  component: Popover,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Anchored overlay for actions or secondary content.',
      },
    },
  },
} satisfies Meta<typeof Popover>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Popover" />,
};
