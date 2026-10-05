import type { Meta, StoryObj } from '@storybook/react-vite';
import { UnstyledButton } from './unstyled-button';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'primitives/UnstyledButton',
  component: UnstyledButton,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'A button with no visual styling but full button semantics.',
      },
    },
  },
} satisfies Meta<typeof UnstyledButton>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="UnstyledButton" />,
};
