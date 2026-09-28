import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopBar } from './top-bar.js';

const meta = {
  title: 'navigation/TopBar',
  component: TopBar,
  parameters: {
    docs: {
      description: {
        component: 'Application top bar: search, user menu, nav toggle. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { items: [{ id: 'a', label: 'First', selected: true }, { id: 'b', label: 'Second' }] },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
