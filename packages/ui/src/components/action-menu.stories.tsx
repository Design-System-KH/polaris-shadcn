import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActionMenu } from './action-menu';

const meta = {
  title: 'components/ActionMenu',
  component: ActionMenu,
  parameters: {
    docs: {
      description: {
        component:
          'Page-level actions with primary emphasis and an accessible overflow menu.',
      },
    },
  },
  args: {
    actions: [{ content: 'Duplicate' }, { content: 'Export' }],
    primaryAction: { content: 'Save' },
  },
} satisfies Meta<typeof ActionMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithDestructive: Story = {
  args: {
    actions: [
      { content: 'Duplicate' },
      { content: 'Delete', destructive: true },
    ],
  },
};
export const WithoutPrimary: Story = { args: { primaryAction: undefined } };
