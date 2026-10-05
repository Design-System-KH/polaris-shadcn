import type { Meta, StoryObj } from '@storybook/react-vite';
import { Collapsible } from './collapsible';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'overlays/Collapsible',
  component: Collapsible,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Animated show and hide of a region.' } },
  },
} satisfies Meta<typeof Collapsible>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Collapsible" />,
};
