import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './divider';
const meta = {
  title: 'primitives/Divider',
  component: Divider,
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <p>Product details</p>
      <Divider {...args} />
      <p>Shipping information</p>
    </div>
  ),
} satisfies Meta<typeof Divider>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
