import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlineGrid } from './inline-grid';
import { Card } from './card';
const meta = {
  title: 'primitives/InlineGrid',
  component: InlineGrid,
  args: {
    columns: 3,
    gap: '400',
    children: (
      <>
        <Card>Total products: 12</Card>
        <Card>Active products: 8</Card>
        <Card>Draft products: 4</Card>
      </>
    ),
  },
} satisfies Meta<typeof InlineGrid>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const TwoColumns: Story = { args: { columns: 2 } };
export const UnequalColumns: Story = {
  args: { columns: ['2fr', '1fr', '1fr'] },
};
