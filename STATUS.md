# Status

What is finished, and what "first pass" actually means. Read this before
relying on a component.

## Foundations — complete

`@shopify/polaris-tokens@9.4.2` is a dependency, not a copy. Values are never
transcribed, so they cannot drift from Polaris.

`packages/ui/scripts/build-theme.mjs` parses the published stylesheet and emits
`src/styles/theme.generated.css`:

| Namespace | Polaris prefix | Tokens |
|---|---|---|
| `--color` | `--p-color-*` | 225 |
| `--spacing` | `--p-space-*` | 22 |
| `--radius` | `--p-border-radius-*` | 10 |
| `--shadow` | `--p-shadow-*` | 23 |
| `--font-size` | `--p-font-size-*` | 13 |
| `--font-weight` | `--p-font-weight-*` | 4 |
| `--leading` | `--p-font-line-height-*` | 8 |
| `--tracking` | `--p-font-letter-spacing-*` | 4 |
| `--ease` | `--p-motion-ease-*` | 3 |
| `--duration` | `--p-motion-duration-*` | 12 |
| `--z` | `--p-z-index-*` | 13 |
| `--breakpoint` | `--p-breakpoints-*` | 5 |

**452 tokens parsed, 342 theme entries.** Re-run the script after bumping the
token package.

## How the appearance works

Components apply Polaris's own class names and import the matching split
stylesheet. They do not re-derive its rules in Tailwind.

That distinction is the whole difference between close and exact:

-  writes  custom properties for  to consume,
  because the class carries the responsive fallback chain that inline styles
  cannot reproduce.
-  is a ShadowBevel wrapping a Box, as Polaris composes it. The edge is
  a bevel pseudo-element, not a border, which is why a re-derived border never
  matched at that radius.
-  uses the real type-ramp and tone classes.
-  — Polaris's resets, font stack and keyframes — is loaded in
  . Omitting it was what made an earlier build sit on the wrong
  typography while each component looked individually correct.

## Components — 110 present, two depths

Every component Polaris 13 exports has a file, a typed prop surface and at
least one story. They are not equally finished.

### Full depth — 15

Hand-written. Real behaviour, considered states, safe to build on.

`Box` · `BlockStack` · `InlineStack` · `InlineGrid` · `Bleed` · `Divider` ·
`Text` · `Button` · `Card` · `Badge` · `ActionList` · `Avatar` ·
`EmptyState` · `EmptySearchResult` · `AccountConnection`

### First pass — 95

Generated from `scripts/manifest.mjs`, one emitter per archetype.

**What is real:** Polaris tokens throughout, a typed prop surface, semantic
HTML, keyboard-reachable controls, `focus-visible` rings, labels associated
with inputs, `aria-current` on navigation, `aria-hidden` on skeletons, and
list components that distinguish first-run empty from filtered-empty.

**What is not:** behaviour. A first-pass `Modal` renders and is labelled but
does not trap focus or restore it on close. `DatePicker` is a labelled shell,
not a calendar. `DataTable` does not sort. `Autocomplete` does not filter.
Radix is installed and wired for none of them yet.

**Treat a first-pass component as a correctly-styled placeholder with the right
API**, not as a working control. The docblock in each file says so, and every
generated story's description ends with "FIRST PASS".

## Why generated rather than hand-written

110 components written by hand across one long session drift — different prop
naming, different token usage, different story shape. One emitter per archetype
produces a surface that is at least consistent, and consistency is what makes
the long tail worth having before it is finished.

The generator never overwrites. Promoting a component means editing it and
setting `depth: 'full'` in the manifest; regenerating will then leave it alone.

## Promoting a component

1. Replace the generated body with a real implementation, using Radix where a
   behaviour contract exists — focus trapping, listbox navigation, popover
   positioning.
2. Cover every interface state in stories: empty, loading, error, permission,
   overflow, offline. `empty` needs three, not one.
3. Add a test asserting behaviour by role, not by test id.
4. Set `depth: 'full'` in `scripts/manifest.mjs` and move it above in this file.

Suggested order, by how often a real admin screen needs them:
`TextField` → `Select` → `Checkbox` → `Modal` → `Popover` → `Banner` →
`Tabs` → `ResourceList` → `IndexTable` → `Page`.

## Licence

Polaris and `@shopify/polaris-tokens` are MIT. Using the tokens and following
the patterns is fine. Do not use Shopify's name or branding for this library,
and do not imply affiliation.

## Verifying

```
bun run --filter @repo/ui check-types      # 0 errors across all 110
bun run --filter @repo/ui storybook:build  # 373 modules
bun run --filter @repo/ui storybook        # browse the catalogue
node packages/ui/scripts/build-theme.mjs   # re-derive tokens
node packages/ui/scripts/generate.mjs      # fill gaps; never overwrites
```
