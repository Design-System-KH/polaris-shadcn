import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './modal';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'overlays/Modal',
  component: Modal,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Interrupting dialog. Traps focus; returns it on close.',
      },
    },
  },
} satisfies Meta<typeof Modal>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Modal" />,
};
