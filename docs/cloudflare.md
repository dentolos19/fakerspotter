# Cloudflare development

`just setup` installs dependencies, `just start` runs the app and `just build` creates the Cloudflare build output. `just check` uses Bun's linter, formatter and type checker; `bun run types` generates the Worker bindings in `.cloudflare/types`.

`just deploy` builds and deploys the Worker. This project has no application secrets to upload. Supply `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in the process environment when using an API token.
