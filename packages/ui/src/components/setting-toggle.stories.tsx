import type { Meta, StoryObj } from '@storybook/react-vite';
import { SettingToggle } from './setting-toggle';

const meta = {
  title: 'components/SettingToggle',
  component: SettingToggle,
  parameters: {
    docs: {
      description: {
        component:
          'A setting with an enable or disable action. The control is a button, not a switch, because the change submits rather than applying instantly — a switch implies it already saved.',
      },
    },
  },
  args: {
    enabled: false,
    action: { content: 'Enable' },
    children: 'This setting is turned off.',
  },
} satisfies Meta<typeof SettingToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Enabled: Story = {
  args: {
    enabled: true,
    action: { content: 'Disable' },
    children: 'This setting is turned on.',
  },
};
export const Loading: Story = {
  args: { action: { content: 'Enable', loading: true } },
};
