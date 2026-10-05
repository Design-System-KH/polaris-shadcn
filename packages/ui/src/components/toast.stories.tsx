import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './toast';

const meta = {
  title: 'components/Toast',
  component: Toast,
  parameters: {
    docs: {
      description: {
        component:
          'A brief confirmation. Never put the only path to an action in one: it disappears. The dismiss timer pauses on hover and focus, so an Undo button cannot vanish as the user reaches for it.',
      },
    },
  },
  args: { content: 'Order archived', onDismiss: () => {}, duration: 1000000 },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithAction: Story = { args: { action: { content: 'Undo' } } };
export const Error: Story = {
  args: { error: true, content: 'Could not archive order' },
};
