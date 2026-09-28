import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropZone } from './drop-zone.js';

const meta = {
  title: 'forms/DropZone',
  component: DropZone,
  parameters: {
    docs: {
      description: {
        component: 'File upload by drop or browse. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { label: 'DropZone', helpText: 'Persistent guidance for this field.' },
} satisfies Meta<typeof DropZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithError: Story = { args: { error: 'Enter a value to continue.' } };
export const Disabled: Story = { args: { disabled: true } };
