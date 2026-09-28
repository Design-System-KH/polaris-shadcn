import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './breadcrumbs.js';

const meta = {
  title: 'navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    docs: {
      description: {
        component: 'Path to here. Earns its space at three levels or more. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { items: [{ id: 'a', label: 'First', selected: true }, { id: 'b', label: 'Second' }] },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
