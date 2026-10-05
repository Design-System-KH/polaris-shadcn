# Inventory dashboard — design

Date: 2026-10-05 · Status: awaiting review

## Purpose

A theme showcase: a realistic inventory admin built as a new app,
`apps/inventory`, that
shows the Polaris theme on a real-shaped screen and exposes component gaps.
Mock data only — no backend, no persistence, no auth.

Success means: both routes render with correct Polaris appearance, the product
list filters and searches, and every component the screens need is full depth
rather than a first-pass placeholder.

## Approach

Promote the five first-pass components the screens depend on, then compose the
dashboard from full-depth components only. The dashboard is the library's
first real consumer; gaps get fixed in `packages/ui`, not worked around in the
app.

## Part 1 — component promotions (`packages/ui`)

Each follows STATUS.md "Promoting a component": real Polaris class names and
the matching stylesheet from `src/styles/polaris/`, stories covering its
states, a behaviour test by role, `depth: 'full'` in `scripts/manifest.mjs`.
Markup is taken from `@shopify/polaris@13.9.5` (already in `node_modules`).

| Component | New prop surface (essentials) | States in stories |
|---|---|---|
| `Page` | `title`, `subtitle`, `backAction {content, url}`, `primaryAction`, `secondaryActions`, `fullWidth`, `narrowWidth`, `children` | title only, with actions, with back, full width |
| `IndexTable` | `headings: {title, alignment?}[]`, `itemCount`, `resourceName {singular, plural}`, `children` of `IndexTable.Row {id, position}` / `IndexTable.Cell`, `loading`, `emptyState` | rows, loading, empty, filtered-empty, numeric alignment |
| `Tabs` | `tabs: {id, content, badge?}[]`, `selected`, `onSelect(index)`, `children` | default, with counts, overflowing |
| `TextField` | `label`, `labelHidden`, `value`, `onChange`, `placeholder`, `prefix`, `clearButton`, `onClearButtonClick`, `helpText`, `error`, `disabled`, `type`, `autoComplete` | default, with prefix, error, disabled, clear button |
| `Navigation` | `location`, `Navigation.Section {items: {label, url, icon?, badge?, selected?}[]}` | selected item, with badge |

Behaviour scope (deliberately small): `Tabs` is a roving-tabindex `tablist`
with arrow-key navigation; `IndexTable` is a semantic `<table>` without
selection, sorting or bulk actions; `TextField` is controlled. Anything beyond
that stays out.

Breaking changes: these components' current props are replaced. Nothing in the
repo consumes them yet except their own stories, which get rewritten.

## Part 2 — the dashboard (`apps/inventory`, new app)

### Scaffolding

A new Next.js app mirroring `apps/playground`'s setup: same `package.json`
dependencies and scripts, `next.config.ts` (`transpilePackages: ['@repo/ui']`),
`postcss.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `eslint.config.mjs`,
and a `globals.css` that imports `@repo/ui/globals.css`. Its own `CLAUDE.md`
with the port and directory table. No Dockerfile (out of scope — the existing
one copies `apps/*/package.json` into a single path and needs reworking before
a second app can use the pattern).

`apps/playground` is left as it is.

### Ports

| App | Port |
|---|---|
| playground | 3741 |
| inventory | 3742 |

Each app's own `dev` and `start` scripts carry `--port`. The root `dev` script
goes back to `bun run --filter '*' dev` with no port: passing `--port 3741`
from the root would give every app the same port and the second would fail to
start.

### Structure (inside `apps/inventory`)

```
app/
  layout.tsx            root html/body wrapping AppShell
  page.tsx              Overview  — "/"
  products/page.tsx     Products  — "/products"
shared/
  component/app-shell.tsx    side Navigation + top bar + content area
  lib/inventory/
    data.ts             typed mock dataset (~30 products, ~15 movements)
    queries.ts          pure functions: stats, low-stock, filter, search
    queries.test.ts
```


### App shell

A two-column layout: Polaris `Navigation` on the left (Overview, Products,
with a low-stock count `Badge` on Products), a top bar showing a store name and
`Avatar`, content to the right. Built with `Box`/`InlineStack` and the Polaris
frame tokens. Below the `md` breakpoint the nav collapses above the content;
no drawer or hamburger.

### Overview (`/`)

`Page title="Overview"`, then:

1. `InlineGrid` of four stat `Card`s: total SKUs, stock value, low stock,
   out of stock.
2. Two-column `InlineGrid`:
   - **Low stock** `Card` — up to 5 products at or below reorder point: name,
     on-hand vs reorder point, `ProgressBar`, a "Reorder" `Button` (no-op).
     If none: an inline "All products are above reorder point" message.
   - **Recent movements** `Card` — latest 8: product, quantity change, a
     `Badge` for type (received / sold / adjusted), relative time.

Server component — no client state.

### Products (`/products`)

`Page title="Products"` with primary action "Add product" (no-op), then a
`Card` containing:

- `Tabs`: All · In stock · Low stock · Out of stock, each with a count.
- `TextField` search (label hidden, placeholder "Search by name or SKU",
  clear button).
- `IndexTable` columns: Product, SKU, Location, Available (numeric, with a
  small `ProgressBar` against reorder point), Status (`Badge`).
- Filtered-empty: `EmptySearchResult` inside the table's `emptyState`.

Client component (`'use client'`) holding the tab and search state. Filtering
is done by `queries.ts`, so it is tested without React.

### Data model

```ts
type StockStatus = 'in-stock' | 'low' | 'out';
interface Product {
  id: string; name: string; sku: string; location: string;
  available: number; reorderPoint: number; unitCost: number;
}
interface StockMovement {
  id: string; productId: string; type: 'received' | 'sold' | 'adjusted';
  quantity: number; at: string; // ISO date
}
```

Status is derived, never stored: `available === 0` → out,
`available <= reorderPoint` → low, else in stock.

## Testing

- `queries.test.ts`: status derivation boundaries (0, = reorder point, +1),
  stats totals, tab filter, case-insensitive search on name and SKU,
  search + tab combined, empty result.
- One test per promoted component in `packages/ui`, asserting by role
  (e.g. arrow keys move `Tabs` selection; `IndexTable` exposes column headers).
  This also gives `@repo/ui` its first test files, fixing `bun run test`.
- `apps/inventory/app/page.test.tsx` renders the Overview and finds its four
  stats by heading.
- Manual: both routes at http://localhost:3742, plus `check-types` and `test`
  from the repo root.

## Out of scope

Product detail page, suppliers, purchase orders, real persistence, sorting,
row selection, bulk actions, dark mode, i18n, a mobile nav drawer.
