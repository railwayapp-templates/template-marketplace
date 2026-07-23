# Deploy Cooee on Railway

Privacy-first GitHub changelogs with AI drafting, React embed, and MCP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cooee)

## About

Cooee turns merged GitHub pull requests into a privacy-first product
changelog. This template deploys the complete self-hosted stack: the web app,
operator dashboard, public API, scheduled worker, PostgreSQL, and the optional
read-only MCP service.

Hosting Cooee gives your team its own changelog pipeline and data store. GitHub
supplies pull-request metadata, Cooee drafts and reviews customer-facing
updates, and your public feed, React embed, and MCP clients read only entries
you have published.

The default deployment uses one public Cooee origin for the website, dashboard,
public changelogs, docs, and API. A private worker handles scheduled jobs, while
MCP runs as a separate read-only public service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cron | [cooeehq/cooee](https://github.com/cooeehq/cooee) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| MCP | [cooeehq/cooee](https://github.com/cooeehq/cooee) | Web service |
| Cooee | [cooeehq/cooee](https://github.com/cooeehq/cooee) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `NODE_ENV` | Cron | production |
| `OPENAI_API_KEY` | Cron | (secret) |
| `BILLING_ENABLED` | Cron | false |
| `BETTER_AUTH_SECRET` | Cron | (secret) |
| `GITHUB_CLIENT_SECRET` | Cron | (secret) |
| `GITHUB_WEBHOOK_SECRET` | Cron | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `HOST` | MCP | 0.0.0.0 |
| `HOST` | Cooee | 0.0.0.0 |
| `NODE_ENV` | Cooee | production |
| `OPENAI_MODEL` | Cooee | gpt-5.4-mini |
| `OPENAI_API_KEY` | Cooee | (secret) |
| `BILLING_ENABLED` | Cooee | false |
| `BETTER_AUTH_SECRET` | Cooee | (secret) |
| `GITHUB_CLIENT_SECRET` | Cooee | (secret) |
| `VITE_BILLING_ENABLED` | Cooee | false |
| `GITHUB_WEBHOOK_SECRET` | Cooee | (secret) |

## Configuration

- **Start command:** `bun run railway:cron`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bun run --cwd apps/mcp start`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `bun --filter @cooee/api start`
- **Healthcheck:** `/api/ready`

**Category:** Automation · **Languages:** TypeScript, CSS, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/cooee)
