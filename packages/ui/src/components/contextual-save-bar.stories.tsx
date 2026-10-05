import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContextualSaveBar } from './contextual-save-bar';
import { ComponentExample } from '../playground/component-examples';

const meta = {
  title: 'layout/ContextualSaveBar',
  component: ContextualSaveBar,
  parameters: {
    controls: { disable: true },
    docs: {
      description: { component: 'Unsaved-changes bar with save and discard.' },
    },
  },
} satisfies Meta<typeof ContextualSaveBar>;
export default meta;
type Story = StoryObj<typeof ComponentExample>;
export const Default: Story = {
  render: () => <ComponentExample name="ContextualSaveBar" />,
};
