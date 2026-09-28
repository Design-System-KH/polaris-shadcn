import type { Meta, StoryObj } from '@storybook/react-vite';
import { KeypressListener } from './keypress-listener.js';

const meta = {
  title: 'util/KeypressListener',
  component: KeypressListener,
  parameters: {
    docs: {
      description: {
        component: 'Declarative key handler. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Wrapped content.' },
} satisfies Meta<typeof KeypressListener>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
