import type { Meta, StoryObj } from '@storybook/react-vite';
import { PolarisTestProvider } from './polaris-test-provider.js';

const meta = {
  title: 'util/PolarisTestProvider',
  component: PolarisTestProvider,
  parameters: {
    docs: {
      description: {
        component: 'Provider stub for tests. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Wrapped content.' },
} satisfies Meta<typeof PolarisTestProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
