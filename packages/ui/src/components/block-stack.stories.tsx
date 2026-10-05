import type { Meta, StoryObj } from '@storybook/react-vite';
import { BlockStack } from './block-stack';
import { Badge } from './badge';
import { Button } from './button';
const meta = {
  title: 'primitives/BlockStack',
  component: BlockStack,
  args: {
    gap: '400',
    children: (
      <>
        <strong>Trail Hoodie</strong>
        <Badge tone="success">Active</Badge>
        <Button>View product</Button>
      </>
    ),
  },
} satisfies Meta<typeof BlockStack>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Centered: Story = { args: { inlineAlign: 'center' } };
export const ReverseOrder: Story = { args: { reverseOrder: true } };
