import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page } from './page';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'layout/Page',
  component: Page,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Page shell: title, breadcrumbs, primary action, secondary actions.',
      },
    },
  },
} satisfies Meta<typeof Page>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Page" />,
};
