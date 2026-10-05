import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './tooltip';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'overlays/Tooltip',
  component: Tooltip,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Supplementary text on hover and focus. Never the only source.',
      },
    },
  },
} satisfies Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Tooltip" />,
};
