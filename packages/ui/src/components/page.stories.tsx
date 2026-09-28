import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page } from './page.js';

const meta = {
  title: 'layout/Page',
  component: Page,
  parameters: {
    docs: {
      description: {
        component: 'Page shell: title, breadcrumbs, primary action, secondary actions. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'Page', children: 'Page content.' },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
