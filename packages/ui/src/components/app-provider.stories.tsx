import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppProvider } from './app-provider';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'util/AppProvider',
  component: AppProvider,
  parameters: {
    controls: { disable: true },
    docs: {
      description: { component: 'Root provider: theme, i18n, link component.' },
    },
  },
} satisfies Meta<typeof AppProvider>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="AppProvider" />,
};
