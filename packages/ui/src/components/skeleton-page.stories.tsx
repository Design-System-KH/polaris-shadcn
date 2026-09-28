import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkeletonPage } from './skeleton-page.js';
import { SkeletonBodyText } from './skeleton-body-text.js';
import { Card } from './card.js';

const meta = {
  title: 'components/SkeletonPage',
  component: SkeletonPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A whole-page placeholder. It must match the layout that replaces it: a mismatched skeleton makes everything jump on arrival, which is worse than showing nothing.',
      },
    },
  },
  args: {
    children: (
      <Card>
        <SkeletonBodyText />
      </Card>
    ),
  },
} satisfies Meta<typeof SkeletonPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithRealTitle: Story = { args: { title: 'Products' } };
export const Narrow: Story = { args: { narrowWidth: true } };
export const WithPrimaryAction: Story = { args: { primaryAction: true } };
