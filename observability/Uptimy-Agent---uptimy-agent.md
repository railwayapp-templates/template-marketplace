# Deploy Uptimy Agent on Railway

Self-hosted uptime monitoring and status page for your Railway services

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uptimy-agent)

## About

Uptimy Agent is open-source, self-hosted uptime monitoring with a public status page. It checks websites, APIs, Postgres, MySQL, Redis, DNS, TLS certificates and cron jobs, and alerts you by email, Slack, Teams, Discord, Telegram, ntfy, PagerDuty or webhooks. One small Go binary with a web UI. Apache-2.0.

**See it live:** [demo status page](https://uptimy-agent-production-b9a3.up.railway.app/status), an agent watching its own Railway project.

The agent runs as a single service with a volume at `/data` for its SQLite database, so keep it at one replica. Because it runs inside your project, it can reach services over private networking (`*.railway.internal`) that external monitors can't see, and check your databases with a real login and query. Pass connection URLs as reference variables (`PG_URL` = `${{Postgres.DATABASE_URL}}`) and use `${PG_URL}` as a monitor's target, so passwords never land in the agent's database. Sign in as `admin` with the generated `ADMIN_PASSWORD` from the service's Variables tab. The public status page is served at `/status` on the generated domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Uptimy Agent | `ghcr.io/uptimy/agent:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADMIN_PASSWORD` | (secret) | Password for the `admin` user, generated per deploy and visible in the service's Variables tab. More users can be added in the UI. |
| `ADMIN_USERNAME` | (secret) | Default Admin username. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/uptimy-agent)
