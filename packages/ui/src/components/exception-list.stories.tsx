import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExceptionList } from './exception-list.js';

const meta = {
  title: 'components/ExceptionList',
  component: ExceptionList,
  parameters: {
    docs: {
      description: {
        component: 'Short list of warnings or exceptions on a resource. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { items: [{ id: '1', content: 'First item' }, { id: '2', content: 'Second item' }] },
} satisfies Meta<typeof ExceptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true, items: [] } };
export const EmptyFirstRun: Story = { args: { items: [] } };
export const EmptyFiltered: Story = { args: { items: [], isFiltered: true } };
