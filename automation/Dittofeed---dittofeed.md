# Deploy Dittofeed on Railway

Messaging Automation for All

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/dittofeed)

## About

Omni-channel marketing automation &amp; transactional messaging. Embeddable, self-hostable, &amp; infinitely flexible.

Send any message across any channel. Welcome emails, appointment reminders, password resets &amp; more with Dittofeed's low code tools.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Dittofeed | `dittofeed/dittofeed-lite:v0.22.0` | Web service |
| Temporal | `guipiri/temporalio-railway:1.22.4` | Worker |
| Clickhouse | `clickhouse/clickhouse-server:24.12.6.70-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | dittofeed | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NODE_ENV` | Dittofeed | production | - |
| `PASSWORD` | Dittofeed | (secret) | - |
| `AUTH_MODE` | Dittofeed | single-tenant | - |
| `BOOTSTRAP` | Dittofeed | true | - |
| `SECRET_KEY` | Dittofeed | (secret) | - |
| `DATABASE_PORT` | Dittofeed | 5432 | - |
| `DATABASE_USER` | Dittofeed | (secret) | - |
| `WORKSPACE_NAME` | Dittofeed | Default | - |
| `CLICKHOUSE_USER` | Dittofeed | (secret) | - |
| `DATABASE_PASSWORD` | Dittofeed | (secret) | - |
| `CLICKHOUSE_PASSWORD` | Dittofeed | (secret) | - |
| `DB` | Temporal | postgresql | - |
| `POSTGRES_USER` | Temporal | (secret) | - |
| `DYNAMIC_CONFIG_FILE_PATH` | Temporal | config/dynamicconfig/docker.yaml | - |
| `CLICKHOUSE_USER` | Clickhouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | Clickhouse | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node --max-old-space-size=824 ./packages/lite/dist/scripts/startLite.js --workspace-name=Default`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`

**Category:** Automation

[View on Railway →](https://railway.com/template/dittofeed)
