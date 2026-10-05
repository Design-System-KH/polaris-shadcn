import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActionList } from './action-list';

/** Mirrors Polaris's own ActionList stories so the two can be compared directly. */
const meta = {
  title: 'components/ActionList',
  component: ActionList,
  parameters: {
    docs: {
      description: {
        component:
          'A list of actions, usually inside a Popover. Styling is Polaris’s own ' +
          'stylesheet; roving focus and element choice are implemented here. With ' +
          'actionRole set to menuitem, arrow keys move between items and Tab leaves ' +
          'the menu rather than walking every option.',
      },
    },
  },
  argTypes: {
    actionRole: {
      control: 'select',
      options: ['menuitem', 'option', 'text'],
      description: 'menuitem takes roving focus; text renders a plain list.',
      table: { defaultValue: { summary: 'menuitem' } },
    },
  },
  args: {
    items: [{ content: 'Import file' }, { content: 'Export file' }],
  },
} satisfies Meta<typeof ActionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcons: Story = {
  args: {
    items: [
      { content: 'Import file', prefix: <span aria-hidden>&#43;</span> },
      { content: 'Export file', prefix: <span aria-hidden>&#8599;</span> },
    ],
  },
};

export const WithAnActiveItem: Story = {
  args: {
    items: [
      { content: 'Import file', active: true },
      { content: 'Export file' },
    ],
  },
};

export const WithSections: Story = {
  args: {
    items: undefined,
    sections: [
      {
        title: 'File options',
        items: [{ content: 'Import file' }, { content: 'Export file' }],
      },
      {
        title: 'Bulk actions',
        items: [{ content: 'Edit' }, { content: 'Delete', destructive: true }],
      },
    ],
  },
};

export const WithDestructiveItem: Story = {
  args: {
    items: [{ content: 'Edit' }, { content: 'Delete', destructive: true }],
  },
};

/** Disabled items stay visible and stay out of the focus cycle. */
export const WithDisabledItem: Story = {
  args: {
    items: [
      { content: 'Import file' },
      { content: 'Export file', disabled: true },
    ],
  },
};

export const WithHelpText: Story = {
  args: {
    items: [
      { content: 'Import file', helpText: 'Import a CSV of products' },
      { content: 'Export file', helpText: 'Export the current selection' },
    ],
  },
};

export const WithSuffix: Story = {
  args: {
    items: [
      { content: 'Import file', suffix: <span aria-hidden>Ctrl I</span> },
      { content: 'Export file', suffix: <span aria-hidden>Ctrl E</span> },
    ],
  },
};

/** A url renders an anchor, so middle-click and copy-link behave correctly. */
export const WithLinks: Story = {
  args: {
    items: [
      { content: 'Documentation', url: 'https://example.com' },
      {
        content: 'Open in a new tab',
        url: 'https://example.com',
        external: true,
      },
    ],
  },
};

/** A plain list rather than a menu: no roving focus, every item tabbable. */
export const AsPlainText: Story = {
  args: { actionRole: 'text' },
};
