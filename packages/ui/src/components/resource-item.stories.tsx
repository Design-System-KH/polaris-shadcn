import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResourceItem } from './resource-item.js';

const meta = {
  title: 'components/ResourceItem',
  component: ResourceItem,
  parameters: {
    docs: {
      description: {
        component: 'A single row within a ResourceList. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof ResourceItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
