import type { Meta, StoryObj } from '@storybook/react-vite';
import { Portal } from './portal.js';

const meta = {
  title: 'util/Portal',
  component: Portal,
  parameters: {
    docs: {
      description: {
        component: 'Renders children outside the DOM hierarchy. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Wrapped content.' },
} satisfies Meta<typeof Portal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
