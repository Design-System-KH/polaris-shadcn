import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/postcss';

const config: StorybookConfig = {
  stories: [
    // Both layouts, because a repo this plugin did not create may not use src/.
    '../src/**/*.stories.@(ts|tsx)',
    '../components/**/*.stories.@(ts|tsx)',
    // Modules contribute stories too; without this they are dead code.
    '../../../modules/*/ui/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  viteFinal: async (config) => ({
    ...config,
    plugins: [
      ...(config.plugins ?? []),
      {
        name: 'storybook-client-directives',
        enforce: 'pre' as const,
        // Storybook renders on the client; keep Next.js boundaries in source files.
        transform(source: string, id: string) {
          if (!id.includes('/src/') || !id.endsWith('.tsx')) return null;
          const code = source.replace(/^['"]use client['"];\s*/, '');
          return code === source ? null : { code, map: null };
        },
      },
    ],
    css: { ...config.css, postcss: { plugins: [tailwindcss()] } },
  }),
  typescript: {
    // Reading real prop types is what makes the inventory machine-readable.
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
