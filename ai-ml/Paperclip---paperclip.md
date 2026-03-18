# Deploy Paperclip on Railway

Deploy Paperclip in one click with persistent volume storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip)

## About

Paperclip is open-source orchestration for running companies with AI agents. You define goals, hire agents (Claude, Codex, OpenClaw, and others), set budgets and heartbeats, and Paperclip coordinates work via org charts, ticketing, and governance so your business runs with minimal hands-on management.

This template gives you a one-click deploy: a Railway project with the Paperclip app (built from a pinned upstream release), a managed Postgres service, and a volume for app data. A lightweight wrapper serves a setup page at `/setup` where you generate your first admin invite and optionally authenticate Codex or Claude for agents. No SSH or log scraping—bootstrap is done in the browser. You set the required env vars (e.g. `DATABASE_URL` from Postgres, `BETTER_AUTH_SECRET`, `PAPERCLIP_PUBLIC_URL`), enable an HTTP proxy on port 3100, set the healthcheck path to `/setup/healthz`, and mount a volume at `/paperclip`. After that, create your first admin from the invite link and use Paperclip at `/` as usual.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Paperclip | [Lukem121/paperclip-railway-template](https://github.com/Lukem121/paperclip-railway-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | Paperclip | 0.0.0.0 | Bind host for container runtime. |
| `PORT` | Paperclip | 3100 | Internal app port exposed by container. |
| `SERVE_UI` | Paperclip | true | Enables serving Paperclip UI from the app service. |
| `DATABASE_URL` | Paperclip | - | Primary Postgres connection string from Railway managed postgres service. |
| `OPENAI_API_KEY` | Paperclip | (secret) | OpenAI API key |
| `PAPERCLIP_HOME` | Paperclip | /paperclip | Persistent filesystem root for Paperclip app state/config. |
| `ANTHROPIC_API_KEY` | Paperclip | (secret) | Anthropic API key |
| `BETTER_AUTH_SECRET` | Paperclip | (secret) | Authentication/session signing secret for Better Auth |
| `BETTER_AUTH_BASE_URL` | Paperclip | - | Canonical public URL used by Better Auth for callback and redirect URLs |
| `PAPERCLIP_PUBLIC_URL` | Paperclip | - | Public base URL used by Paperclip for callbacks/links. |
| `PAPERCLIP_DEPLOYMENT_MODE` | Paperclip | authenticated | Deployment mode; authenticated requires login/auth flow. |
| `PAPERCLIP_DEPLOYMENT_EXPOSURE` | Paperclip | private | Exposure model for deployment; private is recommended default. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/paperclip)
