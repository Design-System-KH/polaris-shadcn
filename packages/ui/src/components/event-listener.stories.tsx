import type { Meta, StoryObj } from '@storybook/react-vite';
import { EventListener } from './event-listener.js';

const meta = {
  title: 'util/EventListener',
  component: EventListener,
  parameters: {
    docs: {
      description: {
        component: 'Declarative window event listener. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Wrapped content.' },
} satisfies Meta<typeof EventListener>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
