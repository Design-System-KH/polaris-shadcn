import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup } from './button-group';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'primitives/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    controls: { disable: true },
    docs: {
      description: { component: 'Related buttons, optionally segmented.' },
    },
  },
} satisfies Meta<typeof ButtonGroup>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="ButtonGroup" />,
};
