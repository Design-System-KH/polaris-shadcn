import type { Meta, StoryObj } from '@storybook/react-vite';
import { UnstyledButton } from './unstyled-button.js';

const meta = {
  title: 'primitives/UnstyledButton',
  component: UnstyledButton,
  parameters: {
    docs: {
      description: {
        component: 'A button with no visual styling but full button semantics. FIRST PASS — see STATUS.md.',
      },
    },
  },
  args: { children: 'UnstyledButton' },
} satisfies Meta<typeof UnstyledButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
