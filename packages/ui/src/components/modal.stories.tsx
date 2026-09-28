import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './modal.js';

const meta = {
  title: 'overlays/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: 'Interrupting dialog. Traps focus; returns it on close. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { open: true, title: 'Modal', children: 'Overlay content.' },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
