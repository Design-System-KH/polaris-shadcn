import type { Meta, StoryObj } from '@storybook/react-vite';
import { LegacyCard } from './legacy-card';

const meta = {
  title: 'components/LegacyCard',
  component: LegacyCard,
  parameters: {
    docs: {
      description: {
        component:
          'The previous-generation card with sections. Kept because real admins still have screens built on it. New work should use Card, which composes Box and ShadowBevel.',
      },
    },
  },
  args: {
    title: 'Online store dashboard',
    sectioned: true,
    children: 'View a summary of your store.',
  },
} satisfies Meta<typeof LegacyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Subdued: Story = { args: { subdued: true } };
export const WithSections: Story = {
  args: {
    sectioned: false,
    children: (
      <>
        <LegacyCard.Section title="Reports">
          Summary of this month.
        </LegacyCard.Section>
        <LegacyCard.Section title="Orders" subdued>
          No orders yet.
        </LegacyCard.Section>
      </>
    ),
  },
};
/** A flush section removes padding, for a full-width table or image. */
export const WithFlushSection: Story = {
  args: {
    sectioned: false,
    children: (
      <LegacyCard.Section flush>Edge to edge content.</LegacyCard.Section>
    ),
  },
};
