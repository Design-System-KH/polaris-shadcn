/// <reference types="vite/client" />
import { createElement, type ComponentType } from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@repo/testing/render';

interface Story {
  render?: ComponentType<Record<string, unknown>>;
  args?: Record<string, unknown>;
}
interface StoryModule {
  default: Story & { component?: ComponentType<Record<string, unknown>> };
  [key: string]: unknown;
}
const stories = import.meta.glob<StoryModule>('../*.stories.tsx', {
  eager: true,
});
afterEach(cleanup);
describe('Storybook component states', () => {
  for (const [file, module] of Object.entries(stories)) {
    const name = file.split('/').pop()!;
    it(`${name} has a default example`, () =>
      expect(module.Default).toBeDefined());
    for (const [exportName, value] of Object.entries(module)) {
      if (exportName === 'default' || !value || typeof value !== 'object')
        continue;
      it(`${name}: ${exportName} renders`, () => {
        const story = value as Story;
        const Component =
          story.render ?? module.default.render ?? module.default.component;
        expect(Component).toBeDefined();
        if (Component) {
          const result = render(
            createElement(Component, { ...module.default.args, ...story.args }),
          );
          expect(result.container.innerHTML).not.toContain('FIRST PASS');
        }
      });
    }
  }
});
