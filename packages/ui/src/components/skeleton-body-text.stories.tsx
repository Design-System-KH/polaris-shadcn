import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkeletonBodyText } from './skeleton-body-text';

const meta = {
  title: 'components/SkeletonBodyText',
  component: SkeletonBodyText,
  parameters: {
    docs: {
      description: {
        component:
          'Placeholder lines while body text loads. aria-hidden: a placeholder has nothing to announce.',
      },
    },
  },
  args: {},
} satisfies Meta<typeof SkeletonBodyText>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const OneLine: Story = { args: { lines: 1 } };
export const ManyLines: Story = { args: { lines: 8 } };
