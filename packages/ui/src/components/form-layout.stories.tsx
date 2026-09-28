import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormLayout } from './form-layout.js';

const meta = {
  title: 'forms/FormLayout',
  component: FormLayout,
  parameters: {
    docs: {
      description: {
        component: 'Consistent spacing and grouping for form fields. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof FormLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
