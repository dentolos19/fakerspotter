# 0002. Deployment Without Secrets File

- Status: Accepted
- Date: 2026-11-28

## Context

The conventions have `just deploy` check that the dotenv file exists and pass it to the deploy command as the secrets file, with the workflow writing that file from repository secrets. Faker Spotter reads no environment variables, so its dotenv file would be empty. The Cloudflare CLI rejects an empty or comment-only secrets file with "The contents of ".env" is not valid."

## Decision

`just deploy` builds and deploys without `test -f` or `--secrets-file`, and the deployment workflow has no secrets step. The alternative, adding a placeholder variable so the file is valid, would upload a secret the Worker never reads.

## Consequences

- [`.env.template`](../../.env.template) stays without variables, and deploying needs no `.env` file.
- When the Worker first reads an environment variable, add it to `.env.template`, restore the conventional `deploy` recipe, add the workflow's `SpicyPizza/create-envfile` step, and supersede this decision.
