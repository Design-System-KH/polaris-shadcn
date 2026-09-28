import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContextualSaveBar } from './contextual-save-bar.js';

const meta = {
  title: 'layout/ContextualSaveBar',
  component: ContextualSaveBar,
  parameters: {
    docs: {
      description: {
        component: 'Unsaved-changes bar with save and discard. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'ContextualSaveBar', children: 'Page content.' },
} satisfies Meta<typeof ContextualSaveBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
