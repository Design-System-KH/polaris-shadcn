import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './link.js';

const meta = {
  title: 'primitives/Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component: 'Navigation. A link goes somewhere; a button does something. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Link' },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
