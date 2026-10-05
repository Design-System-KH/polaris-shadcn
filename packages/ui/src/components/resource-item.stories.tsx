import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResourceItem } from './resource-item';
import { Avatar } from './avatar';
import { Text } from './text';

const meta = {
  title: 'components/ResourceItem',
  component: ResourceItem,
  parameters: {
    docs: {
      description: {
        component:
          'One row in a ResourceList. The whole row is the target and the checkbox is a control inside it, so selection events are stopped from also activating the row.',
      },
    },
  },
  args: {
    id: '1',
    name: 'Dana Whitfield',
    url: '#',
    media: <Avatar name="Dana Whitfield" accessibilityLabel="" size="md" />,
    children: (
      <>
        <Text as="h3" variant="bodyMd" fontWeight="semibold">
          Dana Whitfield
        </Text>
        <Text as="span" variant="bodySm" tone="subdued">
          dana@example.com
        </Text>
      </>
    ),
  },
} satisfies Meta<typeof ResourceItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selectable: Story = { args: { selectable: true } };
export const Selected: Story = { args: { selectable: true, selected: true } };
export const DisabledRow: Story = {
  args: { selectable: true, disabled: true },
};
