import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './spinner';

const meta = {
  title: 'components/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component:
          'Indeterminate progress. Give it an accessible label or the wait is silent for anyone not watching the screen.',
      },
    },
  },
  argTypes: { size: { control: 'select', options: ['small', 'large'] } },
  args: { accessibilityLabel: 'Loading' },
} satisfies Meta<typeof Spinner>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Small: Story = { args: { size: 'small' } };
