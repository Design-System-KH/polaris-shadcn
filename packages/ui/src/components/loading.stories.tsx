import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loading } from './loading';

const meta = {
  title: 'components/Loading',
  component: Loading,
  parameters: {
    docs: {
      description: {
        component:
          'The page-level progress bar. Indeterminate on purpose: it eases toward the end without reaching it, because a fake percentage stalling at 90% is worse than none.',
      },
    },
  },
  args: {},
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
