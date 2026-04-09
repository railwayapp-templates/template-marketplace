# Deploy Finance Tracker on Railway

Track spending, budgets, and household finances. Own your data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/finance-tracker)

## About

Finance Tracker is a self-hosted personal finance application for tracking transactions, analyzing spending, and managing household budgets. Import CSV statements, visualize spending with charts, set budgets, and invite family members — all on infrastructure you control.

Finance Tracker runs as a single Docker container backed by a PostgreSQL database. The container handles database migrations automatically on startup, so there's nothing to configure manually after deploy. A generated secret secures authentication sessions, and the app's public URL is detected automatically from Railway's environment. Optional email features (weekly spending summaries, email verification, password reset) can be enabled at any time by adding a Resend API key — the app works fully without it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dfsf5263/finance-tracker:latest | `ghcr.io/dfsf5263/finance-tracker:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_URL` | dfsf5263/finance-tracker:latest | - | Application URL |
| `NODE_ENV` | dfsf5263/finance-tracker:latest | production | Environment |
| `DATABASE_URL` | dfsf5263/finance-tracker:latest | - | Database URL |
| `RESEND_API_KEY` | dfsf5263/finance-tracker:latest | (secret) | Resend API Key |
| `DISABLE_SIGNUPS` | dfsf5263/finance-tracker:latest | - | Disable Signup (Boolean) |
| `RESEND_FROM_EMAIL` | dfsf5263/finance-tracker:latest | - | From Email Address |
| `BETTER_AUTH_SECRET` | dfsf5263/finance-tracker:latest | (secret) | Better Auth Secret |
| `RESEND_REPLY_TO_EMAIL` | dfsf5263/finance-tracker:latest | - | Reply-To Email Address |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/finance-tracker)
