import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sheet } from './sheet.js';

const meta = {
  title: 'overlays/Sheet',
  component: Sheet,
  parameters: {
    docs: {
      description: {
        component: 'Panel sliding from the edge of the viewport. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { open: true, title: 'Sheet', children: 'Overlay content.' },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
