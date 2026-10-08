# Deploy TanStack Start + AI + Railway Sandboxes on Railway

TanStack Start app where Claude Code runs tasks in Railway sandboxes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tanstack-start-ai-railway-sandboxes)

## About

Dispatch is a work tracker built on [TanStack Start](https://tanstack.com/start) and [TanStack AI](https://tanstack.com/ai). Every task has a Run button: press it and a Railway sandbox boots, Claude Code works the task inside it, and each step lands in the task's activity feed.

This template deploys a TanStack Start app and a Postgres database. Runs use TanStack AI's sandbox primitives: `defineSandbox` describes a disposable sandbox, the `@tanstack/ai-sandbox-railway` provider creates it on Railway in a few seconds, and `withSandbox` hands it to the Claude Code harness through `chat()`. The sandbox is destroyed when the run ends.

Railway builds the app with Railpack and runs the Nitro output. Before each deploy, a pre-deploy command applies the Drizzle migrations and seeds a starter project. The app is behind an access password the template generates, and the same password works as a bearer token for the REST API.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Dispatch-Web | [railwayapp/railway-tanstack-start-sandbox-template](https://github.com/railwayapp/railway-tanstack-start-sandbox-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATABASE_URL` | Dispatch-Web | - | Database URL |
| `DISPATCH_MODEL` | Dispatch-Web | - | Optional model for Claude Code (default: sonnet) |
| `SESSION_SECRET` | Dispatch-Web | (secret) | Encrypts the session cookie (auto-generated) |
| `ANTHROPIC_API_KEY` | Dispatch-Web | (secret) | Anthropic API key. Claude Code runs on it inside each sandbox. |
| `DISPATCH_PASSWORD` | Dispatch-Web | (secret) | Access password for the app and API. Sign in with this value. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Start command:** `node .output/server/index.mjs`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/tanstack-start-ai-railway-sandboxes)
