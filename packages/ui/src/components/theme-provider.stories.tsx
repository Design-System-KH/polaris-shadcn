import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from './theme-provider.js';

const meta = {
  title: 'util/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    docs: {
      description: {
        component: 'Applies a theme to its subtree. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Wrapped content.' },
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
