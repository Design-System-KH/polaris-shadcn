import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button.js';

const meta = {
  title: 'primitives/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'The primary interactive control. One primary button per view; everything ' +
          'else is secondary, tertiary or plain. Label it with the outcome.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'plain', 'monochromePlain'],
      table: { defaultValue: { summary: 'secondary' } },
    },
    tone: { control: 'select', options: ['default', 'critical', 'success'] },
    size: { control: 'select', options: ['micro', 'slim', 'medium', 'large'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: { children: 'Save changes' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Primary: Story = { args: { variant: 'primary' } };
export const Critical: Story = { args: { variant: 'primary', tone: 'critical', children: 'Delete' } };
export const Tertiary: Story = { args: { variant: 'tertiary' } };
export const Plain: Story = { args: { variant: 'plain' } };
export const Loading: Story = { args: { variant: 'primary', loading: true } };
export const Disabled: Story = { args: { disabled: true } };
export const FullWidth: Story = { args: { variant: 'primary', fullWidth: true } };
