import type { Meta, StoryObj } from '@storybook/react-vite';
import { DetailsPage as DetailsPageExample } from './details-page';

const meta = {
  title: 'Playground',
  component: DetailsPageExample,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof DetailsPageExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const DetailsPage: Story = {};
export const MobileDetailsPage: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 390, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};
