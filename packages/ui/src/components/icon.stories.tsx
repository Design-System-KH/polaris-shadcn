import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './icon';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'primitives/Icon',
  component: Icon,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'An icon with a tone, decorative unless labelled.',
      },
    },
  },
} satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Icon" />,
};
