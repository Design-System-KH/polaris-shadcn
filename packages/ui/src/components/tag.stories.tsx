import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './tag.js';

const meta = {
  title: 'components/Tag',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component:
          'A removable label, usually a filter. Clickable, linkable and removable are mutually exclusive: two targets in a box this small gets you the wrong one.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['medium', 'large'] },
    disabled: { control: 'boolean' },
  },
  args: { children: 'Wholesale' },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Removable: Story = { args: { onRemove: () => {} } };
export const Clickable: Story = { args: { onClick: () => {} } };
export const AsLink: Story = { args: { url: 'https://example.com' } };
export const Disabled: Story = { args: { onRemove: () => {}, disabled: true } };
export const Large: Story = { args: { size: 'large', onRemove: () => {} } };
