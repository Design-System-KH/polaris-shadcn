import type { Meta, StoryObj } from '@storybook/react-vite';
import { OptionList } from './option-list.js';

const meta = {
  title: 'forms/OptionList',
  component: OptionList,
  parameters: {
    docs: {
      description: {
        component: 'Selectable option list with sections. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { items: [{ id: '1', content: 'First item' }, { id: '2', content: 'Second item' }] },
} satisfies Meta<typeof OptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true, items: [] } };
export const EmptyFirstRun: Story = { args: { items: [] } };
export const EmptyFiltered: Story = { args: { items: [], isFiltered: true } };
