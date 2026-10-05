import type { Meta, StoryObj } from '@storybook/react-vite';
import { KeyboardKey } from './keyboard-key';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'primitives/KeyboardKey',
  component: KeyboardKey,
  parameters: {
    controls: { disable: true },
    docs: {
      description: { component: 'A keyboard key, rendered as a key cap.' },
    },
  },
} satisfies Meta<typeof KeyboardKey>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="KeyboardKey" />,
};
