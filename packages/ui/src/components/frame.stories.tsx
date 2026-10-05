import type { Meta, StoryObj } from '@storybook/react-vite';
import { Frame } from './frame';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'layout/Frame',
  component: Frame,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Application shell hosting nav, top bar, toasts and loading.',
      },
    },
  },
} satisfies Meta<typeof Frame>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Frame" />,
};
