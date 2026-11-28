# Cloudflare Development

The Worker is defined in [`cloudflare.config.ts`](../../cloudflare.config.ts) and serves the Vinext build with a static assets binding on `fakerspotter.dennise.me`.

## Types

`bun run types` generates the Worker binding types in `.cloudflare/types`. It runs automatically after `bun install`.

## Deployment

The [deployment workflow](../../.github/workflows/deploy.yml) runs `just deploy` on every push to `main`. To deploy from a local machine, set `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in the shell, then run `just deploy`. The Worker has no application secrets; see [0002. Deployment Without Secrets File](../decisions/0002-deployment-without-secrets-file.md).
