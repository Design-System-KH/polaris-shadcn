import type { Meta, StoryObj } from '@storybook/react-vite';
import { LegacyTabs } from './legacy-tabs.js';

const meta = {
  title: 'navigation/LegacyTabs',
  component: LegacyTabs,
  parameters: {
    docs: {
      description: {
        component: 'Previous-generation tabs. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { items: [{ id: 'a', label: 'First', selected: true }, { id: 'b', label: 'Second' }] },
} satisfies Meta<typeof LegacyTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
