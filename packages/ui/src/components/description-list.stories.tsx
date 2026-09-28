import type { Meta, StoryObj } from '@storybook/react-vite';
import { DescriptionList } from './description-list.js';

const meta = {
  title: 'components/DescriptionList',
  component: DescriptionList,
  parameters: {
    docs: {
      description: {
        component:
          'Term and description pairs. A real dl, so assistive technology reads the term and its value together.',
      },
    },
  },
  argTypes: { spacing: { control: 'select', options: ['loose', 'tight'] } },
  args: {
    items: [
      { term: 'Logistics', description: 'The management of products from supplier to customer.' },
      { term: 'Fulfillment', description: 'Picking, packing and shipping an order.' },
    ],
  },
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tight: Story = { args: { spacing: 'tight' } };
