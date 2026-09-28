import type { Meta, StoryObj } from '@storybook/react-vite';
import { FooterHelp } from './footer-help.js';

const meta = {
  title: 'components/FooterHelp',
  component: FooterHelp,
  parameters: { docs: { description: { component: 'Centred help text at the foot of a page.' } } },
  args: { children: 'Learn more about fulfilling orders' },
} satisfies Meta<typeof FooterHelp>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
