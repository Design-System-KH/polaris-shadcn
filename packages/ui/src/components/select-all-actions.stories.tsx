import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectAllActions } from './select-all-actions.js';

const meta = {
  title: 'components/SelectAllActions',
  component: SelectAllActions,
  parameters: {
    docs: {
      description: {
        component: 'Select-all affordance above a resource list. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof SelectAllActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
