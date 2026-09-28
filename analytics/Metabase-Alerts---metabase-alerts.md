# Deploy Metabase Alerts on Railway

pulse alerts and dashboard subscriptions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/metabase-alerts)

## About

Metabase Alerts turns a quiet analytics instance into something that actually pings your team. Instead of opening dashboards every morning, people get a Slack message or email with the one metric that matters. Self-hosting on Railway means you own the scheduler, SMTP settings, Slack token, and the Postgres database that remembers every subscription.

Hosting Metabase Alerts on Railway means running the official `metabase/metabase` image with its alert and subscription engine wired correctly. The container includes the Java runtime, the web UI on port 3000, the scheduler that fires dashboard subscriptions, and the API that accepts Slack and email configuration. What it does not include is a durable application database. On first boot, Metabase runs migrations and drops you into a setup wizard. If you skip Postgres, it falls back to embedded H2, which gets wiped on every redeploy. So connect a companion Postgres service in the same Railway project. Use internal networking, expose only the UI through a public HTTPS domain, and set the health check to `GET /api/health`. Once that returns `ok`, the scheduler is alive.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| metabase/metabase | `metabase/metabase` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | metabase/metabase | 3000 | PORT |
| `MB_DB_HOST` | metabase/metabase | - | MB_DB_HOST |
| `MB_DB_PASS` | metabase/metabase | - | MB_DB_PASS |
| `MB_DB_PORT` | metabase/metabase | - | MB_DB_PORT |
| `MB_DB_TYPE` | metabase/metabase | postgres | MB_DB_TYPE |
| `MB_DB_USER` | metabase/metabase | (secret) | MB_DB_USER |
| `MB_SITE_URL` | metabase/metabase | - | MB_SITE_URL |
| `MB_DB_DBNAME` | metabase/metabase | - | MB_DB_DBNAME |
| `MB_PASSWORD_COMPLEXITY` | metabase/metabase | (secret) | MB_PASSWORD_COMPLEXITY |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | metabase/metabase | true | ENABLE_ALPINE_PRIVATE_NETWORKING |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/metabase-alerts)
