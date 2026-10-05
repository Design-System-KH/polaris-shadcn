import type { Meta, StoryObj } from '@storybook/react-vite';
import { LegacyFilters } from './legacy-filters';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'forms/LegacyFilters',
  component: LegacyFilters,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Previous-generation filter bar.' } },
  },
} satisfies Meta<typeof LegacyFilters>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="LegacyFilters" />,
};
