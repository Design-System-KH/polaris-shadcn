import type { Meta, StoryObj } from '@storybook/react-vite';
import { FullscreenBar } from './fullscreen-bar';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'layout/FullscreenBar',
  component: FullscreenBar,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Bar shown while in a fullscreen editing context.',
      },
    },
  },
} satisfies Meta<typeof FullscreenBar>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="FullscreenBar" />,
};
