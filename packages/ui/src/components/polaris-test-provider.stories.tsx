import type { Meta, StoryObj } from '@storybook/react-vite';
import { PolarisTestProvider } from './polaris-test-provider';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'util/PolarisTestProvider',
  component: PolarisTestProvider,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Provider stub for tests.' } },
  },
} satisfies Meta<typeof PolarisTestProvider>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="PolarisTestProvider" />,
};
