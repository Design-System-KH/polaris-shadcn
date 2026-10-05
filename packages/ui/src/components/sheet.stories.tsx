import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sheet } from './sheet';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'overlays/Sheet',
  component: Sheet,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Panel sliding from the edge of the viewport.',
      },
    },
  },
} satisfies Meta<typeof Sheet>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Sheet" />,
};
