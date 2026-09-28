import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActionMenu } from './action-menu.js';

const meta = {
  title: 'components/ActionMenu',
  component: ActionMenu,
  parameters: {
    docs: {
      description: {
        component: 'Page-level action menu with rollup behaviour. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { items: [{ id: 'a', label: 'First', selected: true }, { id: 'b', label: 'Second' }] },
} satisfies Meta<typeof ActionMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
