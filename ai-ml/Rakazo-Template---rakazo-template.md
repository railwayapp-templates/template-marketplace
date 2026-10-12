# Deploy Rakazo Template on Railway

Deploy Rakazo with private computers, PostgreSQL and persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rakazo-template)

## About

The template runs Rakazo, PostgreSQL and agent computers on Railway. No Docker host or separate sandbox provider is needed. Railway usage and any connected model provider are billed separately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:16.13` | Database |
| Rakazo | [GDemay/rakazo](https://github.com/GDemay/rakazo) (branch: railway-template) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | rakazo |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Rakazo | 5173 |
| `API_URL` | Rakazo | http://127.0.0.1:3100 |
| `API_HOST` | Rakazo | 127.0.0.1 |
| `DATA_DIR` | Rakazo | /data |
| `NODE_ENV` | Rakazo | production |
| `AGENT_RUNTIME` | Rakazo | pi |
| `WAKEUP_DRIVER` | Rakazo | graphile |
| `OWNER_PASSWORD` | Rakazo | (secret) |
| `SANDBOX_IDLE_MS` | Rakazo | 600000 |
| `SIGNUPS_ENABLED` | Rakazo | false |
| `API_PROXY_TARGET` | Rakazo | http://127.0.0.1:3100 |
| `SANDBOX_PROVIDER` | Rakazo | railway |
| `BETTER_AUTH_SECRET` | Rakazo | (secret) |
| `SCREEN_PROXY_SECRET` | Rakazo | (secret) |
| `SANDBOX_MAX_COMPUTERS_PER_USER` | Rakazo | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, Shell, CSS, Astro, Python, JavaScript, Kotlin, PLpgSQL, HTML, C, Dockerfile

[View on Railway →](https://railway.com/deploy/rakazo-template)
