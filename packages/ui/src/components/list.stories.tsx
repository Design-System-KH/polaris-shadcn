import type { Meta, StoryObj } from '@storybook/react-vite';
import { List } from './list';

const meta = {
  title: 'components/List',
  component: List,
  parameters: {
    docs: {
      description: {
        component:
          'A bulleted or numbered list. type="number" renders an ol, so the ordering reaches a screen reader rather than being purely visual.',
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: ['bullet', 'number'] },
    gap: { control: 'select', options: ['loose', 'tight'] },
  },
  args: {
    children: (
      <>
        <List.Item>Yellow shirt</List.Item>
        <List.Item>Red shirt</List.Item>
        <List.Item>Green shirt</List.Item>
      </>
    ),
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Numbered: Story = { args: { type: 'number' } };
export const Tight: Story = { args: { gap: 'tight' } };
