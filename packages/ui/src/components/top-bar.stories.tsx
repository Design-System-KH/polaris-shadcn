import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopBar } from './top-bar';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'navigation/TopBar',
  component: TopBar,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Application top bar: search, user menu, nav toggle.',
      },
    },
  },
} satisfies Meta<typeof TopBar>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="TopBar" />,
};
