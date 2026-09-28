import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './avatar.js';

const meta = {
  title: 'components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'A person or entity. Falls back to initials when there is no image, and ' +
          'also when the image fails to load — a 404 would otherwise leave a broken ' +
          'icon and a collapsed row.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    accessibilityLabel: {
      control: 'text',
      description: 'Pass an empty string when the name is already visible beside it.',
    },
  },
  args: { name: 'Dana Whitfield' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithImage: Story = { args: { source: 'https://placehold.co/80' } };
export const WithExplicitInitials: Story = { args: { initials: 'DW' } };
export const Large: Story = { args: { size: 'xl', source: 'https://placehold.co/160' } };

/** Every size, for checking the initials stay centred as the box changes. */
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--p-space-300)' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

/** A source that will not resolve, to show the fallback rather than describe it. */
export const BrokenImageFallsBackToInitials: Story = {
  args: { source: 'https://example.invalid/missing.png' },
};

/** Decorative: the name is already beside it, so the avatar is hidden. */
export const Decorative: Story = {
  args: { accessibilityLabel: '', source: 'https://placehold.co/80' },
};
