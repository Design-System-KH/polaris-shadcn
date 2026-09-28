import type { Meta, StoryObj } from '@storybook/react-vite';
import { PortalsManager } from './portals-manager.js';

const meta = {
  title: 'util/PortalsManager',
  component: PortalsManager,
  parameters: {
    docs: {
      description: {
        component: 'Coordinates portal containers. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Wrapped content.' },
} satisfies Meta<typeof PortalsManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
