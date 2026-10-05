import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './grid';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'primitives/Grid',
  component: Grid,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: 'Responsive 12-column grid with per-breakpoint spans.',
      },
    },
  },
} satisfies Meta<typeof Grid>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="Grid" />,
};
