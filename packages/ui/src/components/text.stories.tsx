import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './text';
const meta = {
  title: 'primitives/Text',
  component: Text,
  args: { children: 'Products', as: 'h2', variant: 'headingLg' },
} satisfies Meta<typeof Text>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Body: Story = {
  args: {
    as: 'p',
    variant: 'bodyMd',
    children: 'Manage your products and collections.',
  },
};
export const Subdued: Story = {
  args: {
    as: 'p',
    variant: 'bodySm',
    tone: 'subdued',
    children: 'Last updated just now',
  },
};
export const Critical: Story = {
  args: {
    as: 'p',
    variant: 'bodyMd',
    tone: 'critical',
    children: 'This product needs a title.',
  },
};
