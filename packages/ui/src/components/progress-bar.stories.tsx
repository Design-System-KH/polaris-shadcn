import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './progress-bar.js';

const meta = {
  title: 'components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component:
          'Determinate progress. A real progress element, so the value reaches assistive technology without any ARIA.',
      },
    },
  },
  argTypes: {
    progress: { control: { type: 'range', min: 0, max: 100 } },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    tone: { control: 'select', options: ['highlight', 'primary', 'success', 'critical'] },
  },
  args: { progress: 40 },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: 'small' } };
export const Large: Story = { args: { size: 'large' } };
export const Success: Story = { args: { tone: 'success', progress: 100 } };
export const Critical: Story = { args: { tone: 'critical', progress: 15 } };

/** Out-of-range values are clamped: a bar past its own track reads as a bug. */
export const ClampedAboveOneHundred: Story = { args: { progress: 140 } };
