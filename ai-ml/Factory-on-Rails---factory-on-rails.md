# Deploy Factory on Rails on Railway

Self-hosted coding agents that turn tasks into pull requests

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/factory-on-rails)

## About

Factory on Rails is a self-hosted software factory. Sign in with GitHub, pick a repository, describe a change, and a coding agent (Claude Code or Codex) does the work in its own Railway sandbox and opens a pull request. Follow it live, answer its questions, and keep the conversation going.

The template deploys four services wired over Railway's private network: the web UI (the only public service), an API and auth service, a runner that drives one sandbox per run, and Postgres. Encryption and signing keys are generated for you. Railway asks for one value, your GitHub username. On first visit, a setup page creates the GitHub App from a manifest (no credentials to copy) and, with a Railway token you paste once, creates the separate `agents` environment the sandboxes run in. Each user brings their own model credential; sandbox usage is billed to your Railway workspace.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [shixzie/factory-on-rails](https://github.com/shixzie/factory-on-rails) | Web service |
| runner | [shixzie/factory-on-rails](https://github.com/shixzie/factory-on-rails) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| harness | [shixzie/factory-on-rails](https://github.com/shixzie/factory-on-rails) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | web | 8080 | Port the web UI listens on; the public domain points here. Leave as is. |
| `HARNESS_INTERNAL_URL` | web | - | Private address of the harness service, where the UI forwards /api and /auth. Leave as is. |
| `NEXT_TELEMETRY_DISABLED` | web | 1 | Turns off Next.js telemetry. Leave as is. |
| `HARNESS_URL` | runner | - | The factory's public address, used to link pull requests back to their run. Leave as is. |
| `DATABASE_URL` | runner | - | Connection string for the Postgres service. Leave as is. |
| `SANDBOX_REGION` | runner | - | Optional. Region for agent sandboxes, e.g. us-east4-eqdc4a. Empty uses Railway's default (us-west2). |
| `SANDBOX_SNAPSHOTS` | runner | - | The harness's snapshot list, shared by reference. Leave as is. |
| `MAX_CONCURRENT_RUNS` | runner | 3 | How many runs can work at once, one sandbox each. Defaults to 3. |
| `PREVIEW_SIGNING_KEY` | runner | - | The harness's preview signing key, shared by reference. Leave as is. |
| `TOKEN_ENCRYPTION_KEY` | runner | (secret) | The harness's encryption key, shared by reference. Leave as is. |
| `POSTGRES_DB` | Postgres | railway | Database name. Leave as is. |
| `DATABASE_URL` | Postgres | - | Private connection string the other services use. Leave as is. |
| `POSTGRES_USER` | Postgres | (secret) | Database user. Leave as is. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password. Leave as is. |
| `HOST` | harness | :: | Listen address; :: lets the private network reach it. Leave as is. |
| `PORT` | harness | 8080 | Port the API listens on. Leave as is. |
| `PUBLIC_URL` | harness | - | The address people open the factory at. Change it only if you add a custom domain to web. |
| `DATABASE_URL` | harness | - | Connection string for the Postgres service. Leave as is. |
| `SANDBOX_SNAPSHOTS` | harness | - | Optional. Prepared sandbox snapshots users may pick, as name=login|login, comma-separated. Leave empty if unsure. |
| `PREVIEW_SIGNING_KEY` | harness | - | Generated key that signs preview links. Leave as is; only used if you turn on previews. |
| `TOKEN_ENCRYPTION_KEY` | harness | (secret) | Generated key that encrypts stored tokens and credentials. Leave as is; don't change it after deploying. |
| `ALLOWED_GITHUB_LOGINS` | harness | (secret) | Your GitHub username (comma-separate several). Only these accounts can sign in, and the GitHub App must belong to one. |

## Configuration

- **Start command:** `cd apps/web && node node_modules/next/dist/bin/next start --hostname 0.0.0.0`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `node apps/runner/dist/index.js`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node apps/harness/dist/index.js`

**Category:** AI/ML · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/factory-on-rails)
