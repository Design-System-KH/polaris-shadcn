import type { Meta, StoryObj } from '@storybook/react-vite';
import { UnstyledLink } from './unstyled-link';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'primitives/UnstyledLink',
  component: UnstyledLink,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'A link with no visual styling.' } },
  },
} satisfies Meta<typeof UnstyledLink>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="UnstyledLink" />,
};
