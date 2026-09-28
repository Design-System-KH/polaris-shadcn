import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkeletonDisplayText } from './skeleton-display-text.js';

const meta = {
  title: 'components/SkeletonDisplayText',
  component: SkeletonDisplayText,
  parameters: { docs: { description: { component: 'Placeholder for a heading. Match the size to the heading it replaces or the layout jumps on arrival.' } } },
  argTypes: { size: { control: 'select', options: ['small', 'medium', 'large', 'extraLarge'] } },
  args: {},
} satisfies Meta<typeof SkeletonDisplayText>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Small: Story = { args: { size: 'small' } };
export const Large: Story = { args: { size: 'large' } };
export const ExtraLarge: Story = { args: { size: 'extraLarge' } };
