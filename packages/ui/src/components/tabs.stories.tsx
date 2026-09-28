import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './tabs.js';

const meta = {
  title: 'navigation/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: 'Alternate views of one subject. Not steps. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { items: [{ id: 'a', label: 'First', selected: true }, { id: 'b', label: 'Second' }] },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
