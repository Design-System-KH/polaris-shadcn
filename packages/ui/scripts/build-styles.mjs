#!/usr/bin/env node
/**
 * Split Polaris's stylesheet into one file per component.
 *
 * The appearance layer is Polaris's own CSS, not a re-derivation of it. 1,158
 * classes reproduced by eye would be approximately right, and "approximately
 * Polaris" is exactly what was not asked for — the difference lives in things
 * like ActionList's focus ring being a ::after inset by -0.0625rem.
 *
 * Splitting per component means a component imports only the rules it needs,
 * and an unused component costs nothing in the bundle.
 *
 * Re-run after bumping @shopify/polaris. Output is generated; never edit it.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'src', 'styles', 'polaris');

const cssPath = require.resolve('@shopify/polaris/build/esm/styles.css');
const css = readFileSync(cssPath, 'utf8').replace(/@charset[^;]+;/g, '');

/**
 * Split into top-level blocks, tracking brace depth so that @media and
 * @supports wrappers survive intact rather than being cut in half.
 */
function topLevelBlocks(source) {
  const blocks = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        blocks.push(source.slice(start, i + 1));
        start = i + 1;
      }
    }
  }
  return blocks;
}

/** Component name from a selector, e.g. `.Polaris-ActionList__Item` -> ActionList. */
const componentOf = (block) => {
  const names = [...block.matchAll(/\.Polaris-([A-Za-z0-9]+)/g)].map(
    (m) => m[1],
  );
  return names.length ? names[0] : null;
};

const byComponent = new Map();
const shared = [];

for (const block of topLevelBlocks(css)) {
  const trimmed = block.trim();
  if (!trimmed) continue;
  const name = componentOf(trimmed);
  if (!name) {
    // :root, resets, keyframes — anything not tied to one component.
    shared.push(trimmed);
    continue;
  }
  if (!byComponent.has(name)) byComponent.set(name, []);
  byComponent.get(name).push(trimmed);
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const kebab = (name) =>
  name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const banner = (what) =>
  `/* GENERATED from @shopify/polaris by scripts/build-styles.mjs — do not edit.\n   ${what} */\n`;

writeFileSync(
  join(OUT, '_shared.css'),
  banner('Shared rules: resets, keyframes, root.') + shared.join('\n'),
);

const index = [`@import './_shared.css';`];
for (const [name, blocks] of [...byComponent].sort(([a], [b]) =>
  a.localeCompare(b),
)) {
  const file = `${kebab(name)}.css`;
  writeFileSync(
    join(OUT, file),
    banner(`${name} — ${blocks.length} rules.`) + blocks.join('\n'),
  );
  index.push(`@import './${file}';`);
}

writeFileSync(
  join(OUT, 'index.css'),
  `${banner('Every component. Import a single file instead for a smaller bundle.')}${index.join('\n')}\n`,
);

const total = [...byComponent.values()].reduce((n, b) => n + b.length, 0);
console.log(
  `split ${total} component rules across ${byComponent.size} components`,
);
console.log(`plus ${shared.length} shared rules`);
console.log(`wrote ${byComponent.size + 2} files to src/styles/polaris/`);
