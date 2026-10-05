import type { Meta, StoryObj } from '@storybook/react-vite';
import { LegacyStack } from './legacy-stack';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'primitives/LegacyStack',
  component: LegacyStack,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Previous-generation flex stack.' } },
  },
} satisfies Meta<typeof LegacyStack>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="LegacyStack" />,
};
