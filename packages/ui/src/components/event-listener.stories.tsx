import type { Meta, StoryObj } from '@storybook/react-vite';
import { EventListener } from './event-listener';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'util/EventListener',
  component: EventListener,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Declarative window event listener.' } },
  },
} satisfies Meta<typeof EventListener>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="EventListener" />,
};
