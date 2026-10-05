import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalloutCard } from './callout-card';

const meta = {
  title: 'components/CalloutCard',
  component: CalloutCard,
  parameters: {
    docs: {
      description: {
        component:
          'A card promoting one action. Exactly one primary action, because the component exists to point at a single next step — two equal actions makes it a Card.',
      },
    },
  },
  args: {
    title: 'Customize the style of your checkout',
    illustration: 'https://placehold.co/200',
    primaryAction: { content: 'Customize checkout' },
    children: 'Upload your store logo, change colors and fonts, and more.',
  },
} satisfies Meta<typeof CalloutCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithSecondaryAction: Story = {
  args: { secondaryAction: { content: 'Learn more' } },
};
export const Dismissible: Story = { args: { onDismiss: () => {} } };
