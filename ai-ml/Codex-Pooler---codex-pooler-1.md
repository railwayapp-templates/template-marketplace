# Deploy Codex Pooler on Railway

The full featured self-hosted Codex gateway, for teams, agents and you

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/codex-pooler-1)

## About

The full featured self-hosted Codex gateway, for teams, agents and you

Codex Pooler brings your Codex accounts together behind one endpoint for coding tools. Organize accounts into Pools, issue scoped API keys, manage quota-aware routing, and inspect usage from an operator dashboard. It supports Codex backend clients and selected OpenAI-compatible SDK routes. Codex Pooler is source available and free to self-host under the Elastic License 2.0.

This template deploys Codex Pooler and PostgreSQL together. It generates independent application secrets and the database password, connects the services over Railway's private network, creates a public HTTPS domain for Pooler, and mounts persistent storage for PostgreSQL. Database migrations and the bundled pricing import run before each application deployment. Readiness must pass before the new version becomes active.

After deployment, open the generated domain and create the first owner account. Then create a Pool, connect an authorized Codex account, and issue a Pool API key for your tools. No source build, Redis service, or manual database migration is needed. Keep the application at one replica with Serverless disabled so scheduled jobs continue running.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Codex Pooler | `ghcr.io/icoretech/codex-pooler:latest` | Web service |
| Postgres | `postgres:18-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Codex Pooler | 4000 | Application port. Keep 4000 to match the public domain and readiness check. |
| `PHX_HOST` | Codex Pooler | - | Generated public hostname. For a custom domain, replace this with that hostname without https:// or a path. |
| `OBAN_MODE` | Codex Pooler | all | Keep all: runs web requests, background jobs and scheduled tasks in this single application service. |
| `POOL_SIZE` | Codex Pooler | 10 | Database connections per application replica. Keep 10 for the default single-replica deployment. |
| `PHX_SERVER` | Codex Pooler | true | Keep true to start the HTTP server. The pre-deploy migration command disables it only for its own process. |
| `DATABASE_URL` | Codex Pooler | - | Private connection to the included Postgres service. References resolve automatically; keep the database private. |
| `SECRET_KEY_BASE` | Codex Pooler | (secret) | Generated 64-character session secret. Preserve it across redeployments and keep a secure backup. |
| `CODEX_POOLER_TOTP_KEY_VERSION` | Codex Pooler | v1 | Encryption key version label. Keep v1; changing the label alone does not rotate stored secrets. |
| `CODEX_POOLER_TOTP_ENCRYPTION_KEY` | Codex Pooler | - | Generated independent 32-character key for operator two-factor secrets. Preserve and back it up with the database. |
| `CODEX_POOLER_UPSTREAM_SECRET_KEY` | Codex Pooler | (secret) | Generated independent 32-character key for stored upstream credentials. Preserve and back it up with the database. |
| `CODEX_POOLER_UPSTREAM_SECRET_KEY_VERSION` | Codex Pooler | (secret) | Upstream encryption key version label. Keep v1 unless following an explicit key-rotation procedure. |
| `POSTGRES_DB` | Postgres | codex_pooler | Database created on first startup. Keep codex_pooler; changing this later does not rename an existing database. |
| `POSTGRES_USER` | Postgres | (secret) | Database owner created on first startup. Keep codex_pooler; the application references this automatically. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated independent database password. Preserve it across redeployments; changing a variable alone does not rotate the stored database role password. |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/codex-pooler-1)
