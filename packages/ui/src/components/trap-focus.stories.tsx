import type { Meta, StoryObj } from '@storybook/react-vite';
import { TrapFocus } from './trap-focus';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'util/TrapFocus',
  component: TrapFocus,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Keeps focus within its children while active.',
      },
    },
  },
} satisfies Meta<typeof TrapFocus>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="TrapFocus" />,
};
