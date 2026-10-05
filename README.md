# polaris-shadcn

A Polaris-style React component library built on shadcn patterns, Radix, and
Tailwind CSS, in a Bun + Turborepo monorepo.

**Live Storybook:** https://design-system-kh.github.io/polaris-shadcn/

The catalog has 110 components, each with a typed API and Storybook examples.
See [STATUS.md](STATUS.md) for what is implemented and verified.

## Getting started

Requires Node 22+ and Bun 1.3.5.

```sh
bun install
bun run storybook   # http://localhost:6741
```

## Layout

```
apps/        one directory per deployable app
packages/    shared code: ui, testing, e2e, config/*
```

`core/` inside an app is infrastructure wired once (auth, env, stores).
`shared/` is app-local reuse. Anything a second app wants belongs in
`packages/`.

## Commands

| Command | Does |
|---|---|
| `bun run dev` | every app in parallel |
| `bun run build` | build everything, respecting the task graph |
| `bun run test` | unit and component tests |
| `bun run storybook` | the component library, in isolation |
| `bun run storybook:build` | static Storybook in `packages/ui/storybook-static` |
| `bun run e2e` | Playwright (run `bunx playwright install` once first) |
| `bun run check-types` | type-check every package |
| `bun run lint` | lint every package |

## Adding to it

Internal dependencies use `workspace:*`. Shared external versions live in the
root `workspaces.catalog` and are referenced as `catalog:`, or
`catalog:testing` / `catalog:storybook` for the grouped ones — so a version
bump happens in exactly one place.

Each app owns a distinct dev port. Check the existing `dev` scripts before
assigning a new one.

## Deployment

Every push to `main` builds the Storybook and publishes it to GitHub Pages
through [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml).
You can also run the workflow manually from the Actions tab.

One-time setup: in **Settings → Pages**, set **Source** to **GitHub Actions**.

The site is served from the `/polaris-shadcn/` subpath, so Storybook links
must stay relative. A link starting with `/` leaves the project site.
