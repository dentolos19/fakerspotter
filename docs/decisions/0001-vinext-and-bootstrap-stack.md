# 0001. Vinext and Bootstrap Stack

- Status: Accepted
- Date: 2026-11-28

## Context

The conventions prefer TanStack Start with shadcn/ui and Tailwind CSS for TypeScript web applications. Faker Spotter predates them: it is a Next.js App Router app styled with React Bootstrap and Bootstrap 5 Sass, and it now runs on Cloudflare Workers.

## Decision

Keep the Next.js App Router code on [Vinext](https://github.com/cloudflare/vinext) (Next.js on Vite) and keep React Bootstrap. Migrating to TanStack Start and shadcn/ui would rewrite every page and component for a small, finished, static quiz app.

## Consequences

- Routes stay in `src/app/` with Next.js file conventions, and the Worker entrypoint is `vinext/server/fetch-handler` in [`cloudflare.config.ts`](../../cloudflare.config.ts).
- Styling follows [`DESIGN.md`](../../DESIGN.md) rather than shadcn/ui and Tailwind CSS.
- Revisit this decision if the app gains significant new features.
