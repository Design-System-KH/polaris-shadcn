# playground

Dev port: **3741**. Run with `bun run dev` from the repo root (all apps) or
`bun run dev --filter playground` (this one).

## Where things go

| Directory | Holds | Test |
|---|---|---|
| `app/` | routes, layouts, route handlers | Next App Router conventions |
| `core/` | infrastructure wired once: env, auth, i18n, stores, proxy | would be meaningless in another app |
| `shared/` | app-local reuse: `component/`, `hook/`, `lib/` | used more than once *here*, not yet wanted elsewhere |

Anything a second app would want belongs in `packages/`, not in `shared/`.
`shared/` is the waiting room, not the destination — if a second app has grown
its own copy of something here, that thing should have been extracted.

## Shared code

Import from workspace packages by name: `@repo/ui`, `@repo/testing`. Never
reach across into another app's directory, and never use a relative path that
climbs out of this app.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
