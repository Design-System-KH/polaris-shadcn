import type { Meta, StoryObj } from '@storybook/react-vite';
import { LegacyTabs } from './legacy-tabs';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'navigation/LegacyTabs',
  component: LegacyTabs,
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Previous-generation tabs.' } },
  },
} satisfies Meta<typeof LegacyTabs>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="LegacyTabs" />,
};
export const Overflow: Story = {
  render: () => <ComponentExample name="LegacyTabs" state="overflow" />,
};
