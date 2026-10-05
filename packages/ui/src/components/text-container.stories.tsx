import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextContainer } from './text-container';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'primitives/TextContainer',
  component: TextContainer,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Vertical rhythm for prose.' } },
  },
} satisfies Meta<typeof TextContainer>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="TextContainer" />,
};
