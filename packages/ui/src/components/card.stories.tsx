import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './card';
import { Text } from './text';
import { BlockStack } from './block-stack';
import { Badge } from './badge';
const meta = {
  title: 'components/Card',
  component: Card,
  args: {
    children: (
      <BlockStack gap="300">
        <Text as="h2" variant="headingSm">
          Product status
        </Text>
        <Badge tone="success">Active</Badge>
        <p>This product is available in your online store.</p>
      </BlockStack>
    ),
  },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Subdued: Story = { args: { background: 'bg-surface-secondary' } };
export const Compact: Story = { args: { padding: '200' } };
export const AlwaysRounded: Story = { args: { roundedAbove: 'xs' } };
