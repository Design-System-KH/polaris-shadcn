import type { Meta, StoryObj } from '@storybook/react-vite';
import { KeypressListener } from './keypress-listener';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'util/KeypressListener',
  component: KeypressListener,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Declarative key handler.' } },
  },
} satisfies Meta<typeof KeypressListener>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="KeypressListener" />,
};
