import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlineStack } from './inline-stack';
import { Button } from './button';
const meta = {
  title: 'primitives/InlineStack',
  component: InlineStack,
  args: {
    gap: '200',
    children: (
      <>
        <Button variant="primary">Save product</Button>
        <Button>Discard</Button>
        <Button variant="plain">Preview</Button>
      </>
    ),
  },
} satisfies Meta<typeof InlineStack>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Centered: Story = { args: { align: 'center' } };
export const SpaceBetween: Story = { args: { align: 'space-between' } };
