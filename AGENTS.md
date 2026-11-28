# Agent Instructions

Faker Spotter is a cyberwellness toolkit that teaches students to identify fake news through a three-room quiz game. It was built for the National Cyberwellness Advocacy Challenge 2021 and now runs on Cloudflare Workers.

## Commands

- `just setup`: Prepare the project for development by running `just install`.
- `just install`: Install dependencies from the frozen lockfile and generate Worker types.
- `just start`: Run the development server on port 3000.
- `just build`: Create the Cloudflare build output.
- `just check`: Lint, format, and type check with Bun.
- `just test`: Run the Bun tests in `tests/`.
- `just deploy`: Install, build, and deploy the Worker.

## Stack

Vinext (Next.js App Router on Vite) on Cloudflare Workers through the `cf` CLI, with React 19, React Bootstrap and Bootstrap 5 Sass, SWR, and Bun, and no database or server state.

## Rules

- Quiz content lives in static JSON under `public/database/`, and page copy lives in Markdown under `public/assets/`. Edit those files to change content.
- Player progress is stored in `localStorage` through [`src/lib/settings.ts`](src/lib/settings.ts).
- `just deploy` passes no secrets file because the Worker reads no environment variables. See [0002. Deployment Without Secrets File](docs/decisions/0002-deployment-without-secrets-file.md).

## Documentation

- [Product Specifications](PRODUCT.md)
- [Design System](DESIGN.md)
- [Documentation Guidelines](docs/README.md)
- [Cloudflare Development](docs/guides/cloudflare.md)
