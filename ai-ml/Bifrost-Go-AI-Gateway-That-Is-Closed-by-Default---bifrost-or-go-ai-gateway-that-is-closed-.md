# Deploy Bifrost | Go AI Gateway That Is Closed by Default on Railway

Self-host the Bifrost AI gateway — admin auth on, /v1 closed by default.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bifrost-or-go-ai-gateway-that-is-closed-)

## About

Bifrost is an OpenAI-compatible AI gateway written in Go: one address in front of every provider, with virtual keys, budgets and rate limits, and overhead measured in microseconds rather than milliseconds.

This template deploys it with the three things the upstream image leaves to you: admin authentication, a virtual key requirement on the inference routes, and Postgres for configuration and logs.

The reason to choose Bifrost over the Python gateways is throughput — a Go process does not have a global interpreter lock to queue behind, and it holds its latency as request volume rises.

The reason to be careful deploying it is that its defaults assume a private network. Run the image as it ships on a public domain and three things are true at once: the dashboard and admin API accept anyone, so your provider keys and request logs are readable by whoever finds the URL; the `/v1` endpoint accepts anyone, so your provider credit is spendable by them too; and the configuration sits in a file on the container's disk, so a redeploy loses the providers you set up.

Every one of those is a setting, not a limitation. This template sets them.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Bifrost | [ak40u/bifrost-railway-starter](https://github.com/ak40u/bifrost-railway-starter) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Bifrost | 8080 |
| `APP_HOST` | Bifrost | 0.0.0.0 |
| `APP_PORT` | Bifrost | 8080 |
| `LOG_STYLE` | Bifrost | pretty |
| `PGSSLMODE` | Bifrost | disable |
| `BIFROST_ADMIN_PASSWORD` | Bifrost | (secret) |
| `BIFROST_ADMIN_USERNAME` | Bifrost | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/bifrost-or-go-ai-gateway-that-is-closed-)
