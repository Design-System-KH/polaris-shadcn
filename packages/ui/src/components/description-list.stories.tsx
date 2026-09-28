import type { Meta, StoryObj } from '@storybook/react-vite';
import { DescriptionList } from './description-list.js';

const meta = {
  title: 'components/DescriptionList',
  component: DescriptionList,
  parameters: {
    docs: {
      description: {
        component: 'Term and description pairs. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { items: [{ id: '1', content: 'First item' }, { id: '2', content: 'Second item' }] },
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true, items: [] } };
export const EmptyFirstRun: Story = { args: { items: [] } };
export const EmptyFiltered: Story = { args: { items: [], isFiltered: true } };
