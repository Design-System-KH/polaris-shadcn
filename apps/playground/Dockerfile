# Multi-stage build for playground.
#
# Built from the REPO ROOT so workspace packages resolve:
#   docker build -f apps/playground/Dockerfile -t playground .
#
# Requires `output: 'standalone'` in next.config.ts, which traces exactly the
# files the app needs and produces a runtime image that is not the whole
# monorepo.

# ---- deps -------------------------------------------------------------------
# Only manifests are copied here, so editing source does not invalidate the
# install layer. Every workspace member's manifest must be present or
# --frozen-lockfile fails: the lockfile describes all of them, including the
# apps and modules this image does not run.
FROM oven/bun:1 AS deps
WORKDIR /repo
COPY package.json bun.lock ./
COPY apps/*/package.json apps/
COPY modules/*/package.json modules/
COPY packages/*/package.json packages/
COPY packages/config/*/package.json packages/config/
RUN bun install --frozen-lockfile

# ---- build ------------------------------------------------------------------
FROM oven/bun:1 AS build
WORKDIR /repo
COPY --from=deps /repo/node_modules node_modules
COPY . .
# The filter belongs to `bun run`, not to the script: `bun run build --filter x`
# passes --filter through to the script, which rejects it.
RUN bun run --filter playground build

# ---- runtime ----------------------------------------------------------------
FROM oven/bun:1 AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# The standalone output already contains the traced node_modules and a server
# entrypoint, so nothing else from the repo is needed.
COPY --from=build /repo/apps/playground/.next/standalone ./
COPY --from=build /repo/apps/playground/.next/static ./apps/playground/.next/static
COPY --from=build /repo/apps/playground/public ./apps/playground/public

USER bun
EXPOSE 3000
CMD ["bun", "apps/playground/server.js"]
