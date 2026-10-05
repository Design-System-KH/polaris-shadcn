import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './badge';

const TONES = [
  'info',
  'success',
  'warning',
  'critical',
  'attention',
  'new',
  'magic',
  'read-only',
  'enabled',
] as const;

const meta = {
  title: 'components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'Status as a label. The text carries the meaning and the tone reinforces it, so it stays readable in greyscale and for colour vision deficiency.',
      },
    },
  },
  argTypes: {
    tone: { control: 'select', options: TONES },
    size: { control: 'select', options: ['medium', 'large'] },
    progress: {
      control: 'select',
      options: ['incomplete', 'partiallyComplete', 'complete'],
    },
    toneStrong: { control: 'boolean' },
  },
  args: { children: 'Fulfilled' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Success: Story = { args: { tone: 'success', children: 'Paid' } };
export const Critical: Story = {
  args: { tone: 'critical', children: 'Action required' },
};
export const Warning: Story = {
  args: { tone: 'warning', children: 'Overdue' },
};
export const Strong: Story = {
  args: { tone: 'success', toneStrong: true, children: 'Paid' },
};
export const WithProgress: Story = {
  args: { progress: 'partiallyComplete', children: 'Partially fulfilled' },
};
export const Large: Story = {
  args: { size: 'large', tone: 'success', children: 'Paid' },
};

/** Every tone together, for checking they stay distinguishable in greyscale. */
export const AllTones: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--p-space-200)' }}
    >
      {TONES.map((tone) => (
        <Badge key={tone} tone={tone}>
          {tone}
        </Badge>
      ))}
    </div>
  ),
};
