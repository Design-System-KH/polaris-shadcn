import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from './form.js';

const meta = {
  title: 'forms/Form',
  component: Form,
  parameters: {
    docs: {
      description: {
        component: 'Form element with submit handling. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
