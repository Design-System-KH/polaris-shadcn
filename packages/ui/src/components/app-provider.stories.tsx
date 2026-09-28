import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvider } from './app-provider.js';

const meta = {
  title: 'util/AppProvider',
  component: AppProvider,
  parameters: {
    docs: {
      description: {
        component: 'Root provider: theme, i18n, link component. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Wrapped content.' },
} satisfies Meta<typeof AppProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
