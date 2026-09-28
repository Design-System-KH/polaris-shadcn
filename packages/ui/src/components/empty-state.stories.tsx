import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './empty-state.js';

const IMAGE = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

/** Mirrors Polaris's own EmptyState stories so the two can be compared directly. */
const meta = {
  title: 'patterns/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The first-run empty state: nothing exists yet. For a filter that matched ' +
          'nothing use EmptySearchResult instead — showing "create your first item" ' +
          'to someone whose search came back empty reads as though their data is gone.',
      },
    },
  },
  argTypes: {
    imageContained: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    heading: 'Manage your inventory transfers',
    image: IMAGE,
    action: { content: 'Add transfer' },
    children: 'Track and receive your incoming inventory from suppliers.',
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSecondaryAction: Story = {
  args: {
    secondaryAction: { content: 'Learn more', url: 'https://help.example.com' },
  },
};

export const WithSubduedFooterContent: Story = {
  args: {
    footerContent: 'If you do not want to add a transfer, you can import inventory from settings.',
  },
};

export const WithFullWidthLayout: Story = {
  args: { fullWidth: true },
};

/** No heading and no children — the illustration and action carry it. */
export const WithoutHeading: Story = {
  args: { heading: undefined, children: undefined },
};

/** Lets the illustration fill the container above the medium breakpoint. */
export const WithImageContained: Story = {
  args: { imageContained: true },
};

/**
 * The skeleton circle holds the space at full opacity and cross-fades out as
 * the illustration arrives, so the layout never jumps. Point the source at a
 * URL that will not resolve to see the state it starts in.
 */
export const WhileImageLoads: Story = {
  args: { image: 'https://example.invalid/never-resolves.svg' },
};
