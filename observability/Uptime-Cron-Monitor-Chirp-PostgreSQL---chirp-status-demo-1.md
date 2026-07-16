# Deploy Uptime & Cron Monitor — Chirp + PostgreSQL on Railway

Zero-input uptime and cron monitor with PostgreSQL and a live status page.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chirp-status-demo-1)

## About

Launch a focused uptime and cron-heartbeat monitor with a public status page, durable incidents, and no manual service wiring.

Railway runs one Chirp web service beside PostgreSQL. The application owns checks, heartbeat evaluation, live server-rendered updates, and incident history. Railway supplies the domain, generated credentials, deployment health checks, and persistent database service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [lbliii/chirp-status](https://github.com/lbliii/chirp-status) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created when Postgres starts. |
| `DATABASE_URL` | Postgres | - | Private PostgreSQL connection URL. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL application user. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated PostgreSQL password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public PostgreSQL URL used by the Railway data panel. |
| `CHIRP_ENV` | web | production | Run Chirp with production-safe defaults. |
| `DATABASE_URL` | web | - | Private PostgreSQL connection supplied by the Postgres service. |
| `CHIRP_SECRET_KEY` | web | (secret) | Generated application signing key. |
| `STATUS_ADMIN_TOKEN` | web | (secret) | Generated owner token for monitor administration. |
| `CHIRP_SKIP_MIGRATIONS` | web | 1 | The start command runs migrations once before serving. |
| `RAILPACK_PYTHON_VERSION` | web | 3.14 | Python runtime used by Railpack. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Python, HTML

[View on Railway →](https://railway.com/deploy/chirp-status-demo-1)
