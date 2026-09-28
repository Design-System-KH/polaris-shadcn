import type { Meta, StoryObj } from '@storybook/react-vite';
import { FullscreenBar } from './fullscreen-bar.js';

const meta = {
  title: 'layout/FullscreenBar',
  component: FullscreenBar,
  parameters: {
    docs: {
      description: {
        component: 'Bar shown while in a fullscreen editing context. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'FullscreenBar', children: 'Page content.' },
} satisfies Meta<typeof FullscreenBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
