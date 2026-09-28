import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlineError } from './inline-error.js';

const meta = {
  title: 'forms/InlineError',
  component: InlineError,
  parameters: {
    docs: {
      description: {
        component: 'Field-level error, associated with its input. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'InlineError', children: 'Something happened worth reporting.' },
} satisfies Meta<typeof InlineError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Critical: Story = { args: { tone: 'critical' } };
export const Success: Story = { args: { tone: 'success' } };
export const Warning: Story = { args: { tone: 'warning' } };
