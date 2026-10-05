import type { Preview } from '@storybook/react-vite';
import '../src/styles/globals.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    options: {
      storySort: {
        order: [
          'Playground',
          'primitives',
          'layout',
          'forms',
          'components',
          'navigation',
          'feedback',
          'overlays',
        ],
      },
    },
    controls: { expanded: true },
    a11y: { test: 'todo' },
  },
};

export default preview;
