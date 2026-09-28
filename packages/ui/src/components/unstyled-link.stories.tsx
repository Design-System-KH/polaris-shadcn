import type { Meta, StoryObj } from '@storybook/react-vite';
import { UnstyledLink } from './unstyled-link.js';

const meta = {
  title: 'primitives/UnstyledLink',
  component: UnstyledLink,
  parameters: {
    docs: {
      description: {
        component: 'A link with no visual styling. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'UnstyledLink' },
} satisfies Meta<typeof UnstyledLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
