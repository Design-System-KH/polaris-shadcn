import type { Meta, StoryObj } from '@storybook/react-vite';
import { Listbox } from './listbox.js';

const meta = {
  title: 'forms/Listbox',
  component: Listbox,
  parameters: {
    docs: {
      description: {
        component: 'Keyboard-navigable option list. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { items: [{ id: '1', content: 'First item' }, { id: '2', content: 'Second item' }] },
} satisfies Meta<typeof Listbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true, items: [] } };
export const EmptyFirstRun: Story = { args: { items: [] } };
export const EmptyFiltered: Story = { args: { items: [], isFiltered: true } };
