import type { Meta, StoryObj } from '@storybook/react-vite';
import { SettingToggle } from './setting-toggle.js';

const meta = {
  title: 'components/SettingToggle',
  component: SettingToggle,
  parameters: {
    docs: {
      description: {
        component: 'A setting with an enable or disable action. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { title: 'SettingToggle', children: 'Content' },
} satisfies Meta<typeof SettingToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
