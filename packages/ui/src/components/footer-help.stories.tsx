import type { Meta, StoryObj } from '@storybook/react-vite';
import { FooterHelp } from './footer-help.js';

const meta = {
  title: 'components/FooterHelp',
  component: FooterHelp,
  parameters: {
    docs: {
      description: {
        component: 'Help text at the foot of a page. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof FooterHelp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
