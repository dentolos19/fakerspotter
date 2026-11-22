# Agent Instructions

Faker Spotter is a cyberwellness toolkit that teaches students to identify fake news through a three-room quiz game. It was built for the National Cyberwellness Advocacy Challenge 2021 and now runs on Cloudflare Workers.

## Commands

- `just setup`: Install dependencies.
- `just start`: Run the development server.
- `just build`: Create the Cloudflare build output.
- `just check`: Lint, format, and type check with Bun.
- `just test`: Run the Bun tests in `tests/`.
- `just deploy`: Build and deploy the Worker.

## Stack

Vinext (Next.js App Router on Vite) on Cloudflare Workers, React 19, React Bootstrap with Bootstrap 5 Sass, SWR, and Bun. There is no database or server state.

## Rules

- Quiz content lives in static JSON under `public/database/`, and page copy lives in Markdown under `public/assets/`. Edit those files to change content.
- Player progress is stored in `localStorage` through [`src/lib/settings.ts`](src/lib/settings.ts).

## Documentation

- [Product Specifications](PRODUCT.md).
- [Design System](DESIGN.md).
- [Documentation Guidelines](docs/README.md).
- [Cloudflare Development](docs/guides/cloudflare.md).
