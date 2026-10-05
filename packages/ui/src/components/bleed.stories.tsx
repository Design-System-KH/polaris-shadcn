import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bleed } from './bleed';
import { Card } from './card';
import { Box } from './box';
const meta = {
  title: 'primitives/Bleed',
  component: Bleed,
  args: {
    marginInline: '400',
    children: (
      <Box padding="400" background="bg-surface-secondary">
        This section spans the card's inner edges.
      </Box>
    ),
  },
  render: (args) => (
    <Card>
      <p>Product summary</p>
      <Bleed {...args} />
    </Card>
  ),
} satisfies Meta<typeof Bleed>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
