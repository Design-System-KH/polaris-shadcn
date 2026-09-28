import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageActions } from './page-actions.js';

const meta = {
  title: 'layout/PageActions',
  component: PageActions,
  parameters: {
    docs: {
      description: {
        component: 'Primary and secondary actions at the foot of a page. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'PageActions', children: 'Page content.' },
} satisfies Meta<typeof PageActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
