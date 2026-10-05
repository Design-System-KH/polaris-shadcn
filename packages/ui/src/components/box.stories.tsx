import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from './box';
const meta = {
  title: 'primitives/Box',
  component: Box,
  args: {
    padding: '400',
    background: 'bg-surface',
    borderRadius: '300',
    children: '12 products ready to publish',
  },
} satisfies Meta<typeof Box>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithBorder: Story = {
  args: { borderColor: 'border', borderWidth: '025' },
};
export const Subdued: Story = { args: { background: 'bg-surface-secondary' } };
