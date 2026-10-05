# Component library status

The library has **110 component entries**, each with a typed public API and a working Storybook example. The generated placeholders have been replaced with local React implementations. This is a Polaris-style library with its own API; it does not promise every prop and internal behavior from Shopify's package.

## Implementation

- Existing Polaris primitives, cards, feedback, media, and actions retain their component styles and public entry points.
- 67 former placeholders delegate to shared local implementations in `packages/ui/src/components/internal/`: form controls, searchable selection, layout/navigation, collections, overlays, and utilities.
- `TextField` renders an actual accessible input or textarea, with controlled values, validation, and associated help text.
- Dialogs, sheets, popovers, and tooltips use Radix for positioning, dismissal, and focus behavior.
- Tables support sorting or selection; lists support selection and bulk actions. The calendar supports dates and ranges. Upload controls accept or reject files according to the configured types.
- Utilities implement portals, event subscriptions, focus handling, nested scroll locks, sticky content, and scroll shadows.
- Card radii follow responsive breakpoints. Buttons support styled links through `asChild`.

## Storybook

Run `bun run storybook` and open the URL printed by the server (preferred port: 6741).

The catalog includes interactive examples, relevant disabled/error/empty/loading states, and keyboard navigation. `Playground/Details Page` composes the library into an editable product screen; its data is held in memory.

Stories use local mock data. Navigation destinations, destructive actions, and saving in demonstration stories report local results; they do not call a backend. DropZone reports selected files to callbacks; server upload is the consumer's responsibility. AppProvider provides theme, i18n configuration, and link-component context; the current demonstration copy is English.

## Verification

- All 110 components have a default story.
- 272 component story states have render checks.
- Interaction tests cover keyboard selection, tabs, table sorting and selection, modal focus/dismissal, file rejection, date ranges, nested scroll locks, portals, shortcuts, styled links, and detail-page save/discard.
- UI type checking, lint, tests, and the static Storybook build are available below.

```sh
bun run --filter @repo/ui check-types
bun run --filter @repo/ui lint
bun run --filter @repo/ui test
bun run storybook:build
bun run --filter @repo/ui audit:components
```

Visual pixel comparison against Shopify's reference is still unverified because no browser connection is available in the current session. Automated render checks do not establish pixel parity.

## Maintaining the catalog

The manifest is `packages/ui/scripts/manifest.mjs`. Keep public entry points, stories, and manifest entries aligned. `audit:components` checks for missing components, missing stories, and placeholder markers. The original scaffold generator remains a historical utility; completed files must be edited directly.

The CSS token mapping and split Polaris styles can be regenerated with `build:theme` and `build:styles`. Token definitions come from `@shopify/polaris-tokens`; source styles come from the pinned `@shopify/polaris@13.9.5` dependency. See that dependency's bundled license and the [Polaris source repository](https://github.com/Shopify/polaris-react-archive) for its usage terms.
