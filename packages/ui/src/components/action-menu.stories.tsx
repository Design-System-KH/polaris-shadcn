import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActionMenu } from './action-menu.js';

const meta = {
  title: 'components/ActionMenu',
  component: ActionMenu,
  parameters: {
    docs: {
      description: {
        component:
          'Page-level actions. Polaris rolls overflowing actions into a menu once they stop fitting, which needs width measurement; until that lands here they render inline, so keep the list short.',
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
  args: { actions: [{ content: 'Duplicate' }, { content: 'Delete', destructive: true }] },
};
export const WithoutPrimary: Story = { args: { primaryAction: undefined } };
