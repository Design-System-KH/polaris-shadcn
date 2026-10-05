import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from './theme-provider';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'util/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Applies a theme to its subtree.' } },
  },
} satisfies Meta<typeof ThemeProvider>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="ThemeProvider" />,
};
