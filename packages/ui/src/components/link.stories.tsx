import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './link';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'primitives/Link',
  component: Link,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Navigation. A link goes somewhere; a button does something.',
      },
    },
  },
} satisfies Meta<typeof Link>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Link" />,
};
