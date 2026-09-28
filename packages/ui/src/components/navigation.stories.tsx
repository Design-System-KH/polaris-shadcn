import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navigation } from './navigation.js';

const meta = {
  title: 'navigation/Navigation',
  component: Navigation,
  parameters: {
    docs: {
      description: {
        component: 'Primary application navigation. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { items: [{ id: 'a', label: 'First', selected: true }, { id: 'b', label: 'Second' }] },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
