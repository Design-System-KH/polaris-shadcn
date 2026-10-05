import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { COMPONENTS } from './manifest.mjs';
const failures = [];
for (const component of COMPONENTS) {
  const stem = component.name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
  for (const suffix of ['tsx', 'stories.tsx']) {
    const file = fileURLToPath(
      new URL(`../src/components/${stem}.${suffix}`, import.meta.url),
    );
    if (!existsSync(file)) {
      failures.push(`Missing ${file}`);
      continue;
    }
    if (
      /FIRST PASS|correctly-styled placeholder/.test(readFileSync(file, 'utf8'))
    )
      failures.push(`Placeholder remains in ${file}`);
  }
  if (component.depth !== 'full')
    failures.push(`Incomplete manifest entry: ${component.name}`);
}
if (failures.length) throw new Error(failures.join('\n'));
console.log(
  `All ${COMPONENTS.length} components have implementations and stories; no placeholders remain.`,
);
