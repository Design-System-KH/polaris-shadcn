import type { Meta, StoryObj } from '@storybook/react-vite';
import { List } from './list.js';

const meta = {
  title: 'components/List',
  component: List,
  parameters: {
    docs: {
      description: {
        component: 'Bulleted or numbered list. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { items: [{ id: '1', content: 'First item' }, { id: '2', content: 'Second item' }] },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true, items: [] } };
export const EmptyFirstRun: Story = { args: { items: [] } };
export const EmptyFiltered: Story = { args: { items: [], isFiltered: true } };
